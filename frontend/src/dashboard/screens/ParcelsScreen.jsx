import { useEffect, useState } from "react";
import { parcelApi } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import ParcelCard from "../components/parcels/ParcelCard";
import AddParcelModal from "../components/parcels/AddParcelModal";
import IrrigateParcelModal from "../components/parcels/IrrigateParcelModal";
import CsvImportButton from "../components/parcels/CsvImportButton";
import EmptyParcelsState from "../components/parcels/EmptyParcelsState";
import { parcelMeta } from "../components/shared/parcelMeta";

function ParcelsScreen({ setScreen, setSelected }) {
  const { user } = useAuth();

  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(() => Boolean(user?.id));
  const [showAdd, setShowAdd] = useState(false);
  const [editingParcel, setEditingParcel] = useState(null);
  const [irrigatingParcel, setIrrigatingParcel] = useState(null);

  const load = async () => {
    if (!user?.id) {
      setParcels([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await parcelApi.getByUser(user.id);
      setParcels(data.map(parcelMeta));
    } catch (err) {
      console.error(err);
      alert("Неуспешно вчитување на парцели.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    async function loadInitialParcels() {
      setLoading(true);

      try {
        const data = await parcelApi.getByUser(user.id);

        if (cancelled) return;

        setParcels(data.map(parcelMeta));
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          alert("Неуспешно вчитување на парцели.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialParcels();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleCreate = async (formData) => {
    await parcelApi.create(user.id, formData);
    await load();
  };

  const handleUpdate = async (formData) => {
    if (!editingParcel?.id) return;

    await parcelApi.update(editingParcel.id, formData);
    setEditingParcel(null);
    await load();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Сигурни ли сте дека сакате да ја избришете оваа парцела?",
    );

    if (!confirmed) return;

    try {
      await parcelApi.delete(id);
      await load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Не може да се избрише парцелата: " + err.message);
    }
  };

  return (
    <div style={{ padding: "28px 28px", width: "100%" }}>
      {showAdd && (
        <AddParcelModal
          onClose={() => setShowAdd(false)}
          onSave={handleCreate}
        />
      )}

      {editingParcel && (
        <AddParcelModal
          parcel={editingParcel}
          onClose={() => setEditingParcel(null)}
          onSave={handleUpdate}
        />
      )}

      {irrigatingParcel && (
        <IrrigateParcelModal
          parcel={irrigatingParcel}
          onClose={() => setIrrigatingParcel(null)}
          onDone={load}
        />
      )}

      <div
        className="fade-in"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text)" }}>
            Мои парцели
          </h1>

          <div
            style={{
              fontSize: 13,
              color: "var(--green-600)",
              fontWeight: 600,
              marginTop: 3,
            }}
          >
            {parcels.length} Активни парцели
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {user?.id && (
            <CsvImportButton userId={user.id} onImportSuccess={load} />
          )}

          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            + Додај парцела
          </button>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--text-muted)",
          }}
        >
          Се вчитува…
        </div>
      ) : parcels.length === 0 ? (
        <EmptyParcelsState onAdd={() => setShowAdd(true)} />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}
        >
          {parcels.map((p, i) => (
            <div key={p.id} className={`fade-in fade-in-${Math.min(i + 1, 6)}`}>
              <ParcelCard
                p={p}
                onClick={() => {
                  setSelected(p.id);
                  setScreen("details");
                }}
                onIrrigate={() => setIrrigatingParcel(p)}
                onEdit={() => setEditingParcel(p)}
                onDelete={() => handleDelete(p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParcelsScreen;
