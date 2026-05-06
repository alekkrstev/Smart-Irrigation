// ─── Base ────────────────────────────────────────────────────────────────────
const BASE = "http://localhost:8080/api";

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  /** POST /api/auth/register → UserResponse */
  register: (name, email, password) =>
    request("POST", "/auth/register", { name, email, password }),

  /** POST /api/auth/login → UserResponse */
  login: (email, password) =>
    request("POST", "/auth/login", { email, password }),
};

// ─── Parcels ─────────────────────────────────────────────────────────────────
export const parcelApi = {
  /** POST /api/parcels/user/{userId} → ParcelResponse */
  create: (userId, data) => request("POST", `/parcels/user/${userId}`, data),

  /** GET /api/parcels/user/{userId} → ParcelResponse[] */
  getByUser: (userId) => request("GET", `/parcels/user/${userId}`),

  /** GET /api/parcels/{id} → ParcelResponse */
  getById: (id) => request("GET", `/parcels/${id}`),

  /** PUT /api/parcels/{id} → ParcelResponse */
  update: (id, data) => request("PUT", `/parcels/${id}`, data),

  /** DELETE /api/parcels/{id} */
  delete: (id) => request("DELETE", `/parcels/${id}`),
};

// ─── Recommendations ─────────────────────────────────────────────────────────
export const recommendationApi = {
  /** GET /api/recommendations/parcel/{parcelId}/daily → DailyRecommendationResponse */
  getDaily: (parcelId) =>
    request("GET", `/recommendations/parcel/${parcelId}/daily`),

  /** POST /api/recommendations/calculate → WaterAmountResponse */
  calculate: (parcelId, temperature, humidity, rainExpected) =>
    request("POST", "/recommendations/calculate", {
      parcelId,
      temperature,
      humidity,
      rainExpected,
    }),
};

// ─── Irrigation History ───────────────────────────────────────────────────────
export const historyApi = {
  /** POST /api/irrigation-history/parcel/{parcelId} → IrrigationHistoryResponse */
  add: (parcelId, waterAmount) =>
    request("POST", `/irrigation-history/parcel/${parcelId}`, { waterAmount }),

  /** GET /api/irrigation-history/parcel/{parcelId} → IrrigationHistoryResponse[] */
  getByParcel: (parcelId) =>
    request("GET", `/irrigation-history/parcel/${parcelId}`),
};

// ─── Irrigation Schedules ─────────────────────────────────────────────────────
export const scheduleApi = {
  getByParcel: (parcelId) => request("GET", `/schedules/parcel/${parcelId}`),

  create: (parcelId, data) =>
    request("POST", `/schedules/parcel/${parcelId}`, data),

  update: (id, data) => request("PUT", `/schedules/${id}`, data),

  execute: (id) => request("POST", `/schedules/${id}/execute`),

  delete: (id) => request("DELETE", `/schedules/${id}`),
};
