const state = {
    currentUser: null,
    parcels: [],
    selectedParcelId: null,
    selectedHistory: [],
    parcelDialogMode: "create"
};

const authView = document.querySelector("#authView");
const appView = document.querySelector("#appView");
const dashboardView = document.querySelector("#dashboardView");
const allParcelsView = document.querySelector("#allParcelsView");
const parcelDetailView = document.querySelector("#parcelDetailView");
const authMessage = document.querySelector("#authMessage");
const parcelMessage = document.querySelector("#parcelMessage");
const irrigationMessage = document.querySelector("#irrigationMessage");
const parcelDialog = document.querySelector("#parcelDialog");
const irrigationDialog = document.querySelector("#irrigationDialog");

function formData(form) {
    return Object.fromEntries(new FormData(form).entries());
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function api(path, options = {}) {
    const response = await fetch(path, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("Content-Type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

    if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed");
    }

    return data;
}

function parcelPayload(form) {
    const data = formData(form);

    return {
        name: data.name,
        location: data.location,
        size: Number(data.size),
        cropType: data.cropType,
        lastIrrigation: data.lastIrrigation || null,
        notes: data.notes
    };
}

function selectedParcel() {
    return state.parcels.find(parcel => parcel.id === state.selectedParcelId);
}

function formatDateLabel(date = new Date()) {
    return new Intl.DateTimeFormat("en", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(date);
}

function daysSince(dateValue) {
    if (!dateValue) {
        return Number.POSITIVE_INFINITY;
    }

    const today = new Date();
    const date = new Date(`${dateValue}T00:00:00`);
    return Math.floor((today - date) / 86400000);
}

function cropIcon(cropType) {
    const crop = String(cropType || "").toLowerCase();

    if (crop.includes("tomato")) return "🍅";
    if (crop.includes("pepper")) return "🌶";
    if (crop.includes("apple")) return "🍎";
    if (crop.includes("wheat")) return "🌾";
    return "🌿";
}

function sortedParcels() {
    return [...state.parcels].sort((a, b) => Number(b.id) - Number(a.id));
}

function latestParcels() {
    return sortedParcels().slice(0, 3);
}

function parcelsNeedingWater() {
    return state.parcels.filter(parcel => daysSince(parcel.lastIrrigation) >= 3);
}

function showApp(user) {
    state.currentUser = user;
    authView.hidden = true;
    appView.hidden = false;
    document.querySelector("#profileName").textContent = user.name;
    document.querySelector("#greeting").textContent = `Hello, ${user.name.split(" ")[0]}`;
    document.querySelector("#todayLabel").textContent = formatDateLabel();
}

function setActiveView(view) {
    const showAll = view === "all";
    const showDetail = view === "detail";

    dashboardView.hidden = showAll || showDetail;
    allParcelsView.hidden = !showAll;
    parcelDetailView.hidden = !showDetail;
    document.querySelector("#homeNavBtn").classList.toggle("active", view === "dashboard");
    document.querySelector("#parcelsNavBtn").classList.toggle("active", showAll || showDetail);
}

function renderParcelRow(parcel, index) {
    const accentClasses = ["yellow", "red", "blue"];
    const accent = accentClasses[index % accentClasses.length];

    return `
        <article class="latest-parcel parcel-link" data-parcel-id="${parcel.id}" role="button" tabindex="0">
            <span class="parcel-accent ${accent}"></span>
            <div>
                <strong>${escapeHtml(parcel.name)}</strong>
                <p>${cropIcon(parcel.cropType)} ${escapeHtml(parcel.cropType)} · 📍 ${escapeHtml(parcel.location)}</p>
            </div>
            <span class="parcel-size">◺ ${Number(parcel.size).toFixed(1)} ha</span>
        </article>
    `;
}

function renderParcelCard(parcel) {
    const wateredDaysAgo = daysSince(parcel.lastIrrigation);
    const status = wateredDaysAgo >= 3 ? "Needs irrigation" : "Stable";

    return `
        <article class="parcel-card parcel-link" data-parcel-id="${parcel.id}" role="button" tabindex="0">
            <div class="parcel-card-head">
                <span class="crop-badge">${cropIcon(parcel.cropType)}</span>
                <span class="status-badge">${status}</span>
            </div>
            <h2>${escapeHtml(parcel.name)}</h2>
            <p>${escapeHtml(parcel.location)}</p>
            <dl>
                <div>
                    <dt>Crop</dt>
                    <dd>${escapeHtml(parcel.cropType)}</dd>
                </div>
                <div>
                    <dt>Size</dt>
                    <dd>${Number(parcel.size).toFixed(1)} ha</dd>
                </div>
                <div>
                    <dt>Last irrigation</dt>
                    <dd>${escapeHtml(parcel.lastIrrigation || "Not set")}</dd>
                </div>
            </dl>
            <small>${escapeHtml(parcel.notes || "No notes yet.")}</small>
        </article>
    `;
}

function renderEmptyParcels() {
    return `
        <div class="empty-state">
            <strong>No parcels yet</strong>
            <p>Add your first parcel to start tracking irrigation.</p>
        </div>
    `;
}

function renderDashboard() {
    const latest = latestParcels();
    const needsWater = parcelsNeedingWater();
    const totalSize = state.parcels.reduce((sum, parcel) => sum + Number(parcel.size || 0), 0);

    document.querySelector("#activeParcelsCount").textContent = state.parcels.length;
    document.querySelector("#needsWaterCount").textContent = needsWater.length;
    document.querySelector("#recommendationsCount").textContent = needsWater.length || state.parcels.length ? 1 : 0;
    document.querySelector("#totalSizeLabel").textContent = `Total ${totalSize.toFixed(1)} ha`;
    document.querySelector("#priorityParcelLabel").textContent = needsWater[0]?.name || latest[0]?.name || "No priority parcel";

    document.querySelector("#latestParcelsList").innerHTML = latest.length
        ? latest.map(renderParcelRow).join("")
        : renderEmptyParcels();
    bindParcelLinks(document.querySelector("#latestParcelsList"));

    renderRecommendation(needsWater[0] || latest[0]);
}

function renderAllParcels() {
    document.querySelector("#allParcelsList").innerHTML = state.parcels.length
        ? sortedParcels().map(renderParcelCard).join("")
        : renderEmptyParcels();
    bindParcelLinks(document.querySelector("#allParcelsList"));
}

function bindParcelLinks(container) {
    container.querySelectorAll("[data-parcel-id]").forEach(card => {
        const open = () => openParcelDetail(Number(card.dataset.parcelId));

        card.addEventListener("click", open);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open();
            }
        });
    });
}

async function renderRecommendation(parcel) {
    const panel = document.querySelector("#recommendationPanel");

    if (!parcel) {
        panel.innerHTML = `
            <strong>No recommendation yet</strong>
            <p>Add a parcel to receive irrigation guidance.</p>
        `;
        return;
    }

    let recommendation = "Review soil moisture and plan irrigation if the parcel has been dry for several days.";

    try {
        const data = await api(`/api/recommendations/parcel/${parcel.id}/daily`);
        recommendation = data.recommendation || recommendation;
    } catch (error) {
        recommendation = parcel.notes || recommendation;
    }

    panel.innerHTML = `
        <strong>🚨 ${escapeHtml(parcel.name)} - irrigation check</strong>
        <p>${escapeHtml(recommendation)}</p>
        <div>
            <span>${Number(parcel.size).toFixed(1)} ha</span>
            <button class="accept-button" type="button">Accept</button>
        </div>
    `;
}

async function loadParcels() {
    const parcels = await api(`/api/parcels/user/${state.currentUser.id}`);
    state.parcels = parcels;
    renderDashboard();
    renderAllParcels();
}

async function loadSelectedHistory() {
    if (!state.selectedParcelId) {
        state.selectedHistory = [];
        return;
    }

    state.selectedHistory = await api(`/api/irrigation-history/parcel/${state.selectedParcelId}`);
}

async function openParcelDetail(parcelId) {
    state.selectedParcelId = parcelId;
    await loadSelectedHistory();
    renderParcelDetail();
    setActiveView("detail");
}

function renderParcelDetail() {
    const parcel = selectedParcel();

    if (!parcel) {
        setActiveView("all");
        return;
    }

    document.querySelector("#detailName").textContent = parcel.name;
    document.querySelector("#detailMeta").textContent =
        `${cropIcon(parcel.cropType)} ${parcel.cropType} · 📍 ${parcel.location} · ◺ ${Number(parcel.size).toFixed(1)} ha`;

    document.querySelector("#parcelInfoGrid").innerHTML = `
        <article>
            <span>Location</span>
            <strong>${escapeHtml(parcel.location)}</strong>
        </article>
        <article>
            <span>Area</span>
            <strong>${Number(parcel.size).toFixed(1)} ha</strong>
        </article>
        <article>
            <span>Crop</span>
            <strong>${cropIcon(parcel.cropType)} ${escapeHtml(parcel.cropType)}</strong>
        </article>
        <article>
            <span>Last irrigation</span>
            <strong>${escapeHtml(parcel.lastIrrigation || "Not set")}</strong>
        </article>
        <article class="wide-info">
            <span>Notes</span>
            <strong>${escapeHtml(parcel.notes || "No notes yet.")}</strong>
        </article>
    `;

    renderHistoryChart();
    renderHistoryTable();
}

function renderHistoryChart() {
    const chart = document.querySelector("#irrigationChart");
    const recent = [...state.selectedHistory].slice(-7);
    const maxWater = Math.max(...recent.map(item => Number(item.waterAmount || 0)), 1);

    if (!recent.length) {
        chart.innerHTML = renderEmptyParcels();
        return;
    }

    chart.innerHTML = recent.map(item => {
        const height = Math.max(18, Math.round((Number(item.waterAmount) / maxWater) * 86));
        const date = new Date(`${item.irrigationDate}T00:00:00`);
        const label = Number.isNaN(date.getTime())
            ? item.irrigationDate
            : new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);

        return `
            <div class="chart-column">
                <span>${Number(item.waterAmount).toFixed(0)} l</span>
                <div style="height: ${height}px"></div>
                <small>${escapeHtml(label)}</small>
            </div>
        `;
    }).join("");
}

function renderHistoryTable() {
    const table = document.querySelector("#historyTable");

    if (!state.selectedHistory.length) {
        table.innerHTML = renderEmptyParcels();
        return;
    }

    table.innerHTML = `
        <div class="history-row header">
            <span>Date</span>
            <span>Time</span>
            <span>Amount</span>
            <span>Status</span>
        </div>
        ${[...state.selectedHistory].reverse().map(item => `
            <div class="history-row">
                <span>${escapeHtml(item.irrigationDate)}</span>
                <span>${escapeHtml(String(item.irrigationTime || "").slice(0, 5) || "-")}</span>
                <span>${Number(item.waterAmount).toFixed(1)} l</span>
                <span>✓</span>
            </div>
        `).join("")}
    `;
}

function openParcelDialog(parcel = null) {
    const form = document.querySelector("#parcelForm");

    state.parcelDialogMode = parcel ? "edit" : "create";
    parcelMessage.textContent = "";
    form.reset();
    form.elements.id.value = parcel?.id || "";
    form.elements.name.value = parcel?.name || "";
    form.elements.location.value = parcel?.location || "";
    form.elements.size.value = parcel?.size ?? "";
    form.elements.cropType.value = parcel?.cropType || "";
    form.elements.lastIrrigation.value = parcel?.lastIrrigation || "";
    form.elements.notes.value = parcel?.notes || "";
    document.querySelector("#parcelDialogTitle").textContent = parcel ? "Edit parcel" : "New parcel";
    document.querySelector("#parcelDialogSubtitle").textContent = parcel
        ? "Update parcel details."
        : "Add a parcel to your SmartAgro account.";
    document.querySelector("#saveParcelBtn").textContent = parcel ? "Save changes" : "Create parcel";
    parcelDialog.showModal();
}

function closeParcelDialog() {
    parcelDialog.close();
}

function openIrrigationDialog() {
    const parcel = selectedParcel();

    if (!parcel) {
        return;
    }

    irrigationMessage.textContent = "";
    document.querySelector("#irrigationForm").reset();
    document.querySelector("#irrigationDialogSubtitle").textContent = `Add a watering record for ${parcel.name}.`;
    irrigationDialog.showModal();
}

function closeIrrigationDialog() {
    irrigationDialog.close();
}

document.querySelector("#loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    authMessage.textContent = "";

    try {
        const user = await api("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(formData(event.currentTarget))
        });
        showApp(user);
        await loadParcels();
    } catch (error) {
        authMessage.textContent = error.message;
    }
});

document.querySelector("#parcelForm").addEventListener("submit", async event => {
    event.preventDefault();
    parcelMessage.textContent = "";

    try {
        const parcelId = event.currentTarget.elements.id.value;
        const isEdit = state.parcelDialogMode === "edit" && parcelId;

        const parcel = await api(isEdit ? `/api/parcels/${parcelId}` : `/api/parcels/user/${state.currentUser.id}`, {
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify(parcelPayload(event.currentTarget))
        });
        closeParcelDialog();
        await loadParcels();
        if (isEdit) {
            state.selectedParcelId = parcel.id;
            renderParcelDetail();
        }
    } catch (error) {
        parcelMessage.textContent = error.message;
    }
});

document.querySelector("#irrigationForm").addEventListener("submit", async event => {
    event.preventDefault();
    irrigationMessage.textContent = "";

    try {
        const data = formData(event.currentTarget);
        await api(`/api/irrigation-history/parcel/${state.selectedParcelId}`, {
            method: "POST",
            body: JSON.stringify({
                waterAmount: Number(data.waterAmount)
            })
        });
        closeIrrigationDialog();
        await loadParcels();
        await loadSelectedHistory();
        renderParcelDetail();
    } catch (error) {
        irrigationMessage.textContent = error.message;
    }
});

document.querySelector("#deleteParcelBtn").addEventListener("click", async () => {
    const parcel = selectedParcel();

    if (!parcel || !window.confirm(`Delete ${parcel.name}?`)) {
        return;
    }

    await api(`/api/parcels/${parcel.id}`, {
        method: "DELETE"
    });
    state.selectedParcelId = null;
    await loadParcels();
    setActiveView("all");
});

document.querySelector("#addParcelBtn").addEventListener("click", () => openParcelDialog());
document.querySelector("#addParcelFromAllBtn").addEventListener("click", () => openParcelDialog());
document.querySelector("#closeParcelDialogBtn").addEventListener("click", closeParcelDialog);
document.querySelector("#cancelParcelBtn").addEventListener("click", closeParcelDialog);
document.querySelector("#irrigateParcelBtn").addEventListener("click", openIrrigationDialog);
document.querySelector("#editParcelBtn").addEventListener("click", () => openParcelDialog(selectedParcel()));
document.querySelector("#closeIrrigationDialogBtn").addEventListener("click", closeIrrigationDialog);
document.querySelector("#cancelIrrigationBtn").addEventListener("click", closeIrrigationDialog);
document.querySelector("#showAllParcelsBtn").addEventListener("click", () => setActiveView("all"));
document.querySelector("#parcelsNavBtn").addEventListener("click", () => setActiveView("all"));
document.querySelector("#homeNavBtn").addEventListener("click", () => setActiveView("dashboard"));
document.querySelector("#dashboardNavBtn").addEventListener("click", () => setActiveView("dashboard"));
document.querySelector("#backToDashboardBtn").addEventListener("click", () => setActiveView("dashboard"));
document.querySelector("#backToParcelsBtn").addEventListener("click", () => setActiveView("all"));
