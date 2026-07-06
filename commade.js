/* ===========================================================
   commande.js — gestion des commandes (front-end, données mock)
   À remplacer plus tard par des appels fetch() vers commande.php
   quand le backend PHP/MySQL sera branché.
   =========================================================== */

// ---------- DONNÉES MOCK (à remplacer par la BDD) ----------
let clients = [
    { id: 1, nom: "Ahmed" },
    { id: 2, nom: "Sara" },
    { id: 3, nom: "Youssef" }
];

let produits = [
    { id: 1, nom: "Ordinateur", stock: 12 },
    { id: 2, nom: "Imprimante", stock: 5 },
    { id: 3, nom: "Écran", stock: 0 }
];

let commandes = [
    { id: "CMD001", clientId: 1, produitId: 1, quantite: 5, delai: "7 jours", dateLivraison: "2026-07-10", statut: "Confirmée" },
    { id: "CMD002", clientId: 2, produitId: 2, quantite: 2, delai: "3 jours", dateLivraison: "2026-07-08", statut: "En attente" }
];

let nextCmdNumber = commandes.length + 1;
let editingId = null; // id de la commande en cours de modification, null = ajout

// ---------- HELPERS ----------
const $ = (sel) => document.querySelector(sel);

function getClientName(clientId) {
    const c = clients.find(c => c.id === clientId);
    return c ? c.nom : "—";
}

function getProduit(produitId) {
    return produits.find(p => p.id === produitId);
}

function badgeClass(statut) {
    switch (statut) {
        case "Confirmée": return "badge-confirmee";
        case "En attente": return "badge-attente";
        case "Annulée": return "badge-annulee";
        case "Livrée": return "badge-livree";
        default: return "";
    }
}

// ---------- RENDU DES SELECTS DU FORMULAIRE ----------
function fillSelects() {
    const clientSelect = $("#clientSelect");
    const produitSelect = $("#produitSelect");

    clientSelect.innerHTML = '<option value="">-- Choisir un client --</option>' +
        clients.map(c => `<option value="${c.id}">${c.nom}</option>`).join("");

    produitSelect.innerHTML = '<option value="">-- Choisir un produit --</option>' +
        produits.map(p => `<option value="${p.id}">${p.nom} (stock: ${p.stock})</option>`).join("");
}

function updateStockInfo() {
    const produitId = parseInt($("#produitSelect").value, 10);
    const info = $("#stockInfo");
    const produit = getProduit(produitId);

    if (!produit) { info.textContent = ""; return; }

    info.textContent = produit.stock > 0
        ? `Stock disponible : ${produit.stock} unité(s)`
        : `Rupture de stock — commande impossible tant qu'il n'est pas réapprovisionné`;
    info.style.color = produit.stock > 0 ? "#8a94a6" : "#c62828";
}

// ---------- RENDU DU TABLEAU ----------
function renderTable(filter = "") {
    const tbody = $("#commandesTableBody");
    const term = filter.trim().toLowerCase();

    const rows = commandes.filter(cmd => {
        if (!term) return true;
        const produit = getProduit(cmd.produitId);
        return cmd.id.toLowerCase().includes(term)
            || getClientName(cmd.clientId).toLowerCase().includes(term)
            || (produit && produit.nom.toLowerCase().includes(term));
    });

    if (rows.length === 0) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="8">Aucune commande trouvée.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(cmd => {
        const produit = getProduit(cmd.produitId);
        return `
            <tr data-id="${cmd.id}">
                <td>${cmd.id}</td>
                <td>${getClientName(cmd.clientId)}</td>
                <td>${produit ? produit.nom : "—"}</td>
                <td>${cmd.quantite}</td>
                <td>${cmd.delai}</td>
                <td>${formatDate(cmd.dateLivraison)}</td>
                <td><span class="badge ${badgeClass(cmd.statut)}">${cmd.statut}</span></td>
                <td>
                    <button class="action-btn edit" data-action="edit" data-id="${cmd.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete" data-action="delete" data-id="${cmd.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
    }).join("");
}

function formatDate(isoDate) {
    if (!isoDate) return "—";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
}

// ---------- STATS ----------
function renderStats() {
    $("#statConfirmees").textContent = commandes.filter(c => c.statut === "Confirmée").length;
    $("#statAttente").textContent = commandes.filter(c => c.statut === "En attente").length;
    $("#statAnnulees").textContent = commandes.filter(c => c.statut === "Annulée").length;
    $("#statLivrees").textContent = commandes.filter(c => c.statut === "Livrée").length;
}

// ---------- MODAL ----------
function openModal(mode, cmd = null) {
    const modal = $("#commandeModal");
    const form = $("#commandeForm");
    form.reset();
    $("#formError").textContent = "";

    if (mode === "edit" && cmd) {
        editingId = cmd.id;
        $("#modalTitle").textContent = `Modifier la commande ${cmd.id}`;
        $("#clientSelect").value = cmd.clientId;
        $("#produitSelect").value = cmd.produitId;
        $("#quantiteInput").value = cmd.quantite;
        $("#delaiInput").value = cmd.delai;
        $("#dateLivraisonInput").value = cmd.dateLivraison;
        $("#statutSelect").value = cmd.statut;
    } else {
        editingId = null;
        $("#modalTitle").textContent = "Ajouter une Nouvelle Commande";
    }

    updateStockInfo();
    modal.classList.add("open");
}

function closeModal() {
    $("#commandeModal").classList.remove("open");
    editingId = null;
}

// ---------- GESTION AUTOMATIQUE DU STOCK ----------
// Remet en stock la quantité d'une commande annulée / supprimée
function restockIfNeeded(cmd) {
    if (cmd.statut !== "Annulée") {
        const produit = getProduit(cmd.produitId);
        if (produit) produit.stock += cmd.quantite;
    }
}

// ---------- SOUMISSION DU FORMULAIRE ----------
function handleSubmit(e) {
    e.preventDefault();

    const clientId = parseInt($("#clientSelect").value, 10);
    const produitId = parseInt($("#produitSelect").value, 10);
    const quantite = parseInt($("#quantiteInput").value, 10);
    const delai = $("#delaiInput").value.trim();
    const dateLivraison = $("#dateLivraisonInput").value;
    const statut = $("#statutSelect").value;
    const errorEl = $("#formError");

    const produit = getProduit(produitId);
    if (!produit) { errorEl.textContent = "Veuillez choisir un produit."; return; }

    // Si on modifie une commande existante, on remet d'abord son ancienne
    // quantité en stock (sauf si elle était déjà annulée) avant de revérifier.
    const existing = editingId ? commandes.find(c => c.id === editingId) : null;
    let stockDisponible = produit.stock;
    if (existing && existing.produitId === produitId && existing.statut !== "Annulée") {
        stockDisponible += existing.quantite;
    }

    // ---- Règle métier : stock à 0 ou quantité demandée > stock disponible ----
    if (statut !== "Annulée" && (produit.stock === 0 || quantite > stockDisponible)) {
        errorEl.textContent = `Stock insuffisant : ${stockDisponible} unité(s) disponible(s) pour "${produit.nom}".`;
        return;
    }

    if (editingId) {
        // ---- MODIFICATION ----
        const cmd = commandes.find(c => c.id === editingId);

        // remettre l'ancienne quantité en stock avant d'appliquer la nouvelle
        if (cmd.statut !== "Annulée") {
            const oldProduit = getProduit(cmd.produitId);
            if (oldProduit) oldProduit.stock += cmd.quantite;
        }

        cmd.clientId = clientId;
        cmd.produitId = produitId;
        cmd.quantite = quantite;
        cmd.delai = delai;
        cmd.dateLivraison = dateLivraison;
        cmd.statut = statut;

        if (statut !== "Annulée") produit.stock -= quantite;
    } else {
        // ---- AJOUT ----
        const newCmd = {
            id: "CMD" + String(nextCmdNumber++).padStart(3, "0"),
            clientId, produitId, quantite, delai, dateLivraison, statut
        };
        commandes.push(newCmd);
        if (statut !== "Annulée") produit.stock -= quantite;
    }

    fillSelects(); // rafraîchit les stocks affichés dans les selects
    renderTable($("#searchInput").value);
    renderStats();
    closeModal();
}

let pendingDeleteId = null; // id de la commande en attente de confirmation de suppression

// ---------- MODAL DE SUPPRESSION ----------
function openDeleteModal(cmd) {
    pendingDeleteId = cmd.id;
    $("#deleteCommandeName").textContent = `${cmd.id} — ${getClientName(cmd.clientId)}`;
    $("#deleteModal").classList.add("open");
}

function closeDeleteModal() {
    $("#deleteModal").classList.remove("open");
    pendingDeleteId = null;
}

function confirmDelete() {
    if (!pendingDeleteId) return;
    const cmd = commandes.find(c => c.id === pendingDeleteId);
    if (cmd) {
        restockIfNeeded(cmd);
        commandes = commandes.filter(c => c.id !== pendingDeleteId);
        fillSelects();
        renderTable($("#searchInput").value);
        renderStats();
    }
    closeDeleteModal();
}

// ---------- SUPPRESSION / ÉDITION VIA LE TABLEAU ----------
function handleTableClick(e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const id = btn.dataset.id;
    const cmd = commandes.find(c => c.id === id);
    if (!cmd) return;

    if (btn.dataset.action === "edit") {
        openModal("edit", cmd);
    } else if (btn.dataset.action === "delete") {
        openDeleteModal(cmd);
    }
}

// ---------- INITIALISATION ----------
document.addEventListener("DOMContentLoaded", () => {
    fillSelects();
    renderTable();
    renderStats();

    $("#btnOpenAddCommande").addEventListener("click", () => openModal("add"));
    $("#btnCloseModal").addEventListener("click", closeModal);
    $("#btnCancelModal").addEventListener("click", closeModal);
    $("#commandeModal").addEventListener("click", (e) => {
        if (e.target.id === "commandeModal") closeModal();
    });

    $("#produitSelect").addEventListener("change", updateStockInfo);
    $("#commandeForm").addEventListener("submit", handleSubmit);
    $("#commandesTableBody").addEventListener("click", handleTableClick);

    $("#btnCancelDelete").addEventListener("click", closeDeleteModal);
    $("#btnConfirmDelete").addEventListener("click", confirmDelete);
    $("#deleteModal").addEventListener("click", (e) => {
        if (e.target.id === "deleteModal") closeDeleteModal();
    });

    $("#searchInput").addEventListener("input", (e) => renderTable(e.target.value));
});