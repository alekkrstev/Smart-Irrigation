package irrigation_system.backend.service.impl;

import irrigation_system.backend.dto.ParcelRequest;
import irrigation_system.backend.model.Parcel;
import irrigation_system.backend.model.ParcelPriority;
import irrigation_system.backend.model.User;
import irrigation_system.backend.repository.IrrigationHistoryRepository;
import irrigation_system.backend.repository.IrrigationScheduleRepository;
import irrigation_system.backend.repository.ParcelRepository;
import irrigation_system.backend.repository.RecommendationRepository;
import irrigation_system.backend.repository.UserRepository;
import irrigation_system.backend.service.ParcelService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
public class ParcelServiceImpl implements ParcelService {

    private final ParcelRepository parcelRepository;
    private final UserRepository userRepository;
    private final IrrigationHistoryRepository irrigationHistoryRepository;
    private final IrrigationScheduleRepository irrigationScheduleRepository;
    private final RecommendationRepository recommendationRepository;

    public ParcelServiceImpl(
            ParcelRepository parcelRepository,
            UserRepository userRepository,
            IrrigationHistoryRepository irrigationHistoryRepository,
            IrrigationScheduleRepository irrigationScheduleRepository,
            RecommendationRepository recommendationRepository
    ) {
        this.parcelRepository = parcelRepository;
        this.userRepository = userRepository;
        this.irrigationHistoryRepository = irrigationHistoryRepository;
        this.irrigationScheduleRepository = irrigationScheduleRepository;
        this.recommendationRepository = recommendationRepository;
    }

    @Override
    public Parcel createParcel(Long userId, ParcelRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        Parcel parcel = new Parcel();

        parcel.setName(request.name());
        parcel.setLocation(request.location());
        parcel.setSize(request.size());
        parcel.setSoilType(request.soilType());
        parcel.setIrrigationSystem(request.irrigationSystem());
        parcel.setCropType(request.cropType());
        parcel.setLastIrrigation(request.lastIrrigation());
        parcel.setNotes(request.notes());
        parcel.setPriority(request.priority() != null ? request.priority() : ParcelPriority.MEDIUM);
        parcel.setUser(user);

        return parcelRepository.save(parcel);
    }

    @Override
    public List<Parcel> getUserParcels(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        return parcelRepository.findAllByUser(user)
                .stream()
                .sorted((a, b) -> Integer.compare(
                        priorityRank(b.getPriority()),
                        priorityRank(a.getPriority())
                ))
                .toList();
    }

    @Override
    public Parcel updateParcel(Long id, ParcelRequest request) {
        Parcel existingParcel = getById(id);

        existingParcel.setName(request.name());
        existingParcel.setLocation(request.location());
        existingParcel.setSize(request.size());
        existingParcel.setSoilType(request.soilType());
        existingParcel.setIrrigationSystem(request.irrigationSystem());
        existingParcel.setCropType(request.cropType());
        existingParcel.setLastIrrigation(request.lastIrrigation());
        existingParcel.setNotes(request.notes());
        existingParcel.setPriority(request.priority() != null ? request.priority() : ParcelPriority.MEDIUM);

        return parcelRepository.save(existingParcel);
    }
    
    @Override
    @Transactional
    public void deleteParcel(Long id) {
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + id));

        recommendationRepository.deleteAll(recommendationRepository.findAllByParcel(parcel));
        irrigationScheduleRepository.findByParcel(parcel)
                .ifPresent(irrigationScheduleRepository::delete);
        irrigationHistoryRepository.deleteAll(irrigationHistoryRepository.findAllByParcel(parcel));

        parcelRepository.delete(parcel);
    }

    @Override
    public Parcel getById(Long id) {
        return parcelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + id));
    }

    @Override
    public int importParcelsCsv(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("CSV file is empty.");
        }

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
        );

        String line;
        int lineNumber = 0;
        int importedCount = 0;

        while ((line = reader.readLine()) != null) {
            lineNumber++;

            String normalizedLine = line.replace("\uFEFF", "").trim();

            if (normalizedLine.isEmpty()) {
                continue;
            }

            if (lineNumber == 1 && hasHeader(normalizedLine)) {
                continue;
            }

            String[] data = splitCsvLine(normalizedLine);

            if (data.length < 6) {
                throw new IllegalArgumentException(
                        "Line " + lineNumber + " must contain at least 6 columns: name, location, size, soilType, irrigationSystem, cropType."
                );
            }

            Parcel parcel = new Parcel();

            parcel.setName(data[0].trim());
            parcel.setLocation(data[1].trim());
            parcel.setSize(Double.parseDouble(data[2].trim()));
            parcel.setSoilType(data[3].trim());
            parcel.setIrrigationSystem(data[4].trim());
            parcel.setCropType(data[5].trim());
            parcel.setLastIrrigation(data.length >= 7 && !data[6].trim().isEmpty()
                    ? LocalDate.parse(data[6].trim())
                    : null);
            parcel.setUser(user);

            if (data.length >= 8 && !data[7].trim().isEmpty()) {
                parcel.setNotes(data[7].trim());
            }

            if (data.length >= 9 && !data[8].trim().isEmpty()) {
                parcel.setPriority(ParcelPriority.valueOf(data[8].trim().toUpperCase()));
            } else {
                parcel.setPriority(ParcelPriority.MEDIUM);
            }

            parcelRepository.save(parcel);
            importedCount++;
        }

        if (importedCount == 0) {
            throw new IllegalArgumentException("CSV did not contain any parcel rows.");
        }

        return importedCount;
    }

    private boolean hasHeader(String line) {
        String firstColumn = splitCsvLine(line)[0].trim().toLowerCase();

        return firstColumn.equals("name")
                || firstColumn.equals("назив")
                || firstColumn.equals("parcel")
                || firstColumn.equals("парцела");
    }

    private String[] splitCsvLine(String line) {
        String delimiter = line.contains(";") && !line.contains(",") ? ";" : ",";

        return line.split(delimiter, -1);
    }

    private int priorityRank(ParcelPriority priority) {
        if (priority == null) return 2;

        return switch (priority) {
            case HIGH -> 3;
            case MEDIUM -> 2;
            case LOW -> 1;
        };
    }
}
