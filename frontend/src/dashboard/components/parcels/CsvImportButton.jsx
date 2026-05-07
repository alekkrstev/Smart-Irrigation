import { useRef, useState } from "react";

function CsvImportButton({ userId, onImportSuccess }) {
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!userId) {
      alert("Please log in before importing parcels.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setImporting(true);

    try {
      const response = await fetch(`/api/parcels/import/${userId}`, {
        method: "POST",
        body: formData,
      });

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message || "CSV import failed");
      }

      alert(message || "CSV successfully imported.");

      if (onImportSuccess) {
        await onImportSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("CSV import failed: " + error.message);
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        className="btn-primary"
        disabled={importing}
        onClick={() => fileInputRef.current?.click()}
      >
        {importing ? "Се внесува..." : "📤 Внеси CSV"}
      </button>
    </>
  );
}

export default CsvImportButton;
