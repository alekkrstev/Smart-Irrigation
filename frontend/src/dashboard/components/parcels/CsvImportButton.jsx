import { useRef } from "react";

function CsvImportButton({ userId, onImportSuccess }) {
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/parcels/import/${userId}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "CSV import failed");
      }

      alert("CSV успешно внесен.");

      if (onImportSuccess) {
        await onImportSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Неуспешно внесување CSV: " + error.message);
    } finally {
      e.target.value = "";
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        className="btn-primary"
        onClick={() => fileInputRef.current.click()}
      >
        📤 Внеси CSV
      </button>
    </>
  );
}

export default CsvImportButton;
