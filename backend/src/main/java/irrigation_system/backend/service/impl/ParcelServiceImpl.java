package irrigation_system.backend.service.impl;

import irrigation_system.backend.dto.ParcelRequest;
import irrigation_system.backend.model.Parcel;
import irrigation_system.backend.model.ParcelPriority;
import irrigation_system.backend.model.User;
import irrigation_system.backend.repository.ParcelRepository;
import irrigation_system.backend.repository.UserRepository;
import irrigation_system.backend.service.ParcelService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public ParcelServiceImpl(ParcelRepository parcelRepository, UserRepository userRepository) {
        this.parcelRepository = parcelRepository;
        this.userRepository = userRepository;
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
    public void deleteParcel(Long id) {
        if (!parcelRepository.existsById(id)) {
            throw new IllegalArgumentException("Parcel not found with id: " + id);
        }

        parcelRepository.deleteById(id);
    }

    @Override
    public Parcel getById(Long id) {
        return parcelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + id));
    }

    @Override
    public void importParcelsCsv(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
        );

        String line;
        boolean firstLine = true;

        while ((line = reader.readLine()) != null) {
            if (firstLine) {
                firstLine = false;
                continue;
            }

            String[] data = line.split(",");

            if (data.length < 7) {
                continue;
            }

            Parcel parcel = new Parcel();

            parcel.setName(data[0].trim());
            parcel.setLocation(data[1].trim());
            parcel.setSize(Double.parseDouble(data[2].trim()));
            parcel.setSoilType(data[3].trim());
            parcel.setIrrigationSystem(data[4].trim());
            parcel.setCropType(data[5].trim());
            parcel.setLastIrrigation(LocalDate.parse(data[6].trim()));
            parcel.setUser(user);

            if (data.length >= 8) {
                parcel.setNotes(data[7].trim());
            }

            if (data.length >= 9 && !data[8].trim().isEmpty()) {
                parcel.setPriority(ParcelPriority.valueOf(data[8].trim().toUpperCase()));
            } else {
                parcel.setPriority(ParcelPriority.MEDIUM);
            }

            parcelRepository.save(parcel);
        }
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