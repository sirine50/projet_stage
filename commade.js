// =========================================================
// Gestion des Commandes — commande.js
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-container form");
    const tableBody = document.querySelector(".table-container tbody");
    const searchInput = document.querySelector(".search");
    const resetBtn = document.querySelector(".btn-reset");
    const addBtn = document.querySelector(".btn-add");

    const statusLabels = {
        attente: "En attente",
        confirme: "Confirmée",
        annule: "Annulée"
    };

    let commandeCounter = tableBody.querySelectorAll("tr").length;
    let editingRow = null; // ligne en cours de modification (null = mode ajout)

    // ---------------------------------------------------
    // Génère un nouvel ID de commande (CMD004, CMD005...)
    // ---------------------------------------------------
    function generateId() {
        commandeCounter++;
        return "CMD" + String(commandeCounter).padStart(3, "0");
    }

    // ---------------------------------------------------
    // Formate une date "yyyy-mm-dd" -> "dd/mm/yyyy"
    // ---------------------------------------------------
    function formatDate(isoDate) {
        if (!isoDate) return "-";
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    }

    // ---------------------------------------------------
    // Met à jour les cartes de statistiques
    // ---------------------------------------------------
    function updateStats() {
        const rows = tableBody.querySelectorAll("tr");
        const counts = { confirme: 0, attente: 0, annule: 0, livree: 0 };

        rows.forEach(row => {
            const statusSpan = row.querySelector(".status");
            if (!statusSpan) return;
            if (statusSpan.classList.contains("confirme")) counts.confirme++;
            if (statusSpan.classList.contains("attente")) counts.attente++;
            if (statusSpan.classList.contains("annule")) counts.annule++;
        });

        const cards = document.querySelectorAll(".stats .card h2");
        // Ordre des cartes dans le HTML : Confirmées, En attente, Annulées, Livrées
        if (cards[0]) cards[0].textContent = counts.confirme;
        if (cards[1]) cards[1].textContent = counts.attente;
        if (cards[2]) cards[2].textContent = counts.annule;
        // Le total "Livrées" reste géré manuellement (pas de statut "livrée" dans le formulaire)
    }

    // ---------------------------------------------------
    // Attache les écouteurs edit/delete à une ligne
    // ---------------------------------------------------
    function attachRowEvents(row) {
        const editBtn = row.querySelector(".edit");
        const deleteBtn = row.querySelector(".delete");

        editBtn.addEventListener("click", () => startEdit(row));
        deleteBtn.addEventListener("click", () => deleteRow(row));
    }

    // ---------------------------------------------------
    // Supprime une ligne
    // ---------------------------------------------------
    function deleteRow(row) {
        const id = row.children[0].textContent;
        const confirmed = confirm(`Supprimer la commande ${id} ?`);
        if (!confirmed) return;

        row.remove();
        updateStats();

        if (editingRow === row) {
            cancelEdit();
        }
    }

    // ---------------------------------------------------
    // Passe le formulaire en mode édition
    // ---------------------------------------------------
    function startEdit(row) {
        editingRow = row;

        const cells = row.children;
        form.client.value = cells[1].textContent;
        form.produit.value = cells[2].textContent;
        form.quantite.value = cells[3].textContent;
        form.delai.value = cells[4].textContent;

        const statusSpan = cells[6].querySelector(".status");
        const statusKey = ["confirme", "attente", "annule"]
            .find(key => statusSpan.classList.contains(key));
        form.statut.value = statusKey || "attente";

        // Date affichée en dd/mm/yyyy -> input date attend yyyy-mm-dd
        const dateText = cells[5].textContent.trim();
        if (dateText && dateText !== "-") {
            const [day, month, year] = dateText.split("/");
            form.date_livraison.value = `${year}-${month}-${day}`;
        } else {
            form.date_livraison.value = "";
        }

        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Modifier';
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // ---------------------------------------------------
    // Annule le mode édition
    // ---------------------------------------------------
    function cancelEdit() {
        editingRow = null;
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Ajouter';
        form.reset();
    }

    // ---------------------------------------------------
    // Crée une nouvelle ligne <tr> à partir des données du formulaire
    // ---------------------------------------------------
    function buildRow(id, data) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${id}</td>
            <td>${data.client}</td>
            <td>${data.produit}</td>
            <td>${data.quantite}</td>
            <td>${data.delai || "-"}</td>
            <td>${formatDate(data.date_livraison)}</td>
            <td><span class="status ${data.statut}">${statusLabels[data.statut]}</span></td>
            <td>
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

        attachRowEvents(row);
        return row;
    }

    // ---------------------------------------------------
    // Soumission du formulaire (ajout ou modification)
    // ---------------------------------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!form.client.value || !form.produit.value || !form.quantite.value) {
            alert("Merci de remplir les champs obligatoires (client, produit, quantité).");
            return;
        }

        const data = {
            client: form.client.value,
            produit: form.produit.value,
            quantite: form.quantite.value,
            delai: form.delai.value,
            date_livraison: form.date_livraison.value,
            statut: form.statut.value
        };

        if (editingRow) {
            const id = editingRow.children[0].textContent;
            const newRow = buildRow(id, data);
            editingRow.replaceWith(newRow);
            cancelEdit();
        } else {
            const id = generateId();
            const newRow = buildRow(id, data);
            tableBody.appendChild(newRow);
            form.reset();
        }

        updateStats();
    });

    // ---------------------------------------------------
    // Bouton "Annuler" du formulaire
    // ---------------------------------------------------
    resetBtn.addEventListener("click", () => {
        cancelEdit();
    });

    // ---------------------------------------------------
    // Recherche en direct dans le tableau
    // ---------------------------------------------------
    searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();

        tableBody.querySelectorAll("tr").forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? "" : "none";
        });
    });

    // ---------------------------------------------------
    // Initialisation : brancher les lignes déjà présentes
    // ---------------------------------------------------
    tableBody.querySelectorAll("tr").forEach(attachRowEvents);
    updateStats();

});