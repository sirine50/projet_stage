// =========================================================
// Gestion des Commandes — commande.js
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-container form");
    const tableBody = document.querySelector(".table-container tbody");
    const searchInput = document.querySelector(".search");
    const resetBtn = document.querySelector(".btn-reset");
    const addBtn = document.querySelector(".btn-add");

    const overlay = document.getElementById("formOverlay");
    const openFormBtn = document.getElementById("openFormBtn");
    const closeFormBtn = document.getElementById("closeFormBtn");

    // ---------------------------------------------------
    // Ouvrir / fermer le modal du formulaire
    // ---------------------------------------------------
    function openModal() {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        cancelEdit();
    }

    openFormBtn.addEventListener("click", openModal);
    closeFormBtn.addEventListener("click", closeModal);

    // Fermer en cliquant sur le fond sombre (pas sur le formulaire lui-même)
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    // Fermer avec la touche Échap
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            closeModal();
        }
    });

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
        setCardValue(cards[0], counts.confirme);
        setCardValue(cards[1], counts.attente);
        setCardValue(cards[2], counts.annule);
        // Le total "Livrées" reste géré manuellement (pas de statut "livrée" dans le formulaire)
    }

    // ---------------------------------------------------
    // Met à jour un chiffre de carte avec une petite animation
    // ---------------------------------------------------
    function setCardValue(cardEl, value) {
        if (!cardEl) return;
        if (cardEl.textContent == value) return; // pas de changement, pas d'animation

        cardEl.textContent = value;
        cardEl.classList.remove("pulse");
        void cardEl.offsetWidth; // force le redémarrage de l'animation
        cardEl.classList.add("pulse");
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
        openModal();
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
        row.style.animation = "none";
        void row.offsetWidth;
        row.style.animation = "";

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
        closeModal();
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