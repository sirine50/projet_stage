document.addEventListener("DOMContentLoaded", function () {

    /* ============================
       Éléments du DOM
    ============================ */

    const modal = document.getElementById("clientModal");
    const modalTitle = document.getElementById("modalTitle");
    const btnAdd = document.getElementById("btnAddClient");
    const closeBtn = document.getElementById("closeModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const form = document.getElementById("clientForm");
    const filterModal = document.getElementById("filterModal");
const closeFilter = document.getElementById("closeFilter");
const cancelFilter = document.getElementById("cancelFilter");
const applyFilterBtn = document.getElementById("applyFilterBtn");

    const clientIdInput = document.getElementById("clientId");
    const nomInput = document.getElementById("nom");
    const telephoneInput = document.getElementById("telephone");
    const emailInput = document.getElementById("email");
    const commentaireInput = document.getElementById("commentaire");
    const modePaiementInput = document.getElementById("modePaiement");
    const conditionPaiementInput = document.getElementById("conditionPaiement");

    const contactsContainer = document.getElementById("contactsContainer");
    const btnAddContact = document.getElementById("btnAddContact");

    const tableBody = document.getElementById("clientsTableBody");
    const emptyState = document.getElementById("emptyState");
    const searchInput = document.getElementById("searchInput");
    const btnFilter = document.getElementById("btnFilter");

    const cardClients = document.getElementById("clients");
    const cardActifs = document.getElementById("actifs");
    const cardInactifs = document.getElementById("inactifs");
    const cardContacts = document.getElementById("contacts");

    const STORAGE_KEY = "erp_clients";

    /* ============================
       Données
    ============================ */

    function loadClients() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.error("Erreur de lecture des clients :", err);
            return [];
        }
    }

    function saveClients(clients) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    }

    let clients = loadClients();

    /* ============================
       Gestion de la popup (modal)
    ============================ */

    function openModal() {
        modal.classList.add("active");
    }

    function closeModal() {
        modal.classList.remove("active");
        form.reset();
        clientIdInput.value = "";
        contactsContainer.innerHTML = "";
        modalTitle.textContent = "Ajouter un Client";
    }

    if (btnAdd) {
        btnAdd.addEventListener("click", function () {
            closeModal();
            addContactRow();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", closeModal);
    }

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    /* ============================
       Gestion des contacts (dynamique)
    ============================ */

    function addContactRow(contact) {

        contact = contact || { nom: "", telephone: "", email: "" };

        const row = document.createElement("div");
        row.className = "contact-item";

        row.innerHTML = `
            <div class="form-group">
                <label>Nom du contact</label>
                <input type="text" class="contact-nom" value="${escapeHtml(contact.nom)}">
            </div>
            <div class="form-group">
                <label>Téléphone du contact</label>
                <input type="text" class="contact-telephone" value="${escapeHtml(contact.telephone)}">
            </div>
            <div class="form-group">
                <label>Email du contact</label>
                <input type="email" class="contact-email" value="${escapeHtml(contact.email)}">
            </div>
            <button type="button" class="btn-remove-contact" title="Supprimer ce contact">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        row.querySelector(".btn-remove-contact").addEventListener("click", function () {
            row.remove();
        });

        contactsContainer.appendChild(row);
    }

    if (btnAddContact) {
        btnAddContact.addEventListener("click", function () {
            addContactRow();
        });
    }

    function getContactsFromForm() {

        const rows = contactsContainer.querySelectorAll(".contact-item");
        const contacts = [];

        rows.forEach(function (row) {

            const nom = row.querySelector(".contact-nom").value.trim();
            const telephone = row.querySelector(".contact-telephone").value.trim();
            const email = row.querySelector(".contact-email").value.trim();

            // On ignore les blocs de contact totalement vides
            if (nom || telephone || email) {
                contacts.push({ nom: nom, telephone: telephone, email: email });
            }

        });

        return contacts;
    }

    /* ============================
       Ajout / Modification (submit)
    ============================ */

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const id = clientIdInput.value;

            const clientData = {
                id: id || Date.now().toString(),
                nom: nomInput.value.trim(),
                telephone: telephoneInput.value.trim(),
                email: emailInput.value.trim(),
                commentaire: commentaireInput.value.trim(),
                modePaiement: modePaiementInput.value,
                conditionPaiement: conditionPaiementInput.value,
                contacts: getContactsFromForm()
            };

            if (id) {
                // Modification d'un client existant
                const index = clients.findIndex(c => c.id === id);
                if (index !== -1) {
                    clients[index] = clientData;
                }
                alert("Client modifié avec succès !");
            } else {
                // Ajout d'un nouveau client
                clients.push(clientData);
                alert("Client enregistré avec succès !");
            }

            saveClients(clients);
            renderClients();
            closeModal();

        });

    }

    /* ============================
       Édition / Suppression
    ============================ */

    function editClient(id) {

        const client = clients.find(c => c.id === id);
        if (!client) return;

        clientIdInput.value = client.id;
        nomInput.value = client.nom;
        telephoneInput.value = client.telephone;
        emailInput.value = client.email;
        commentaireInput.value = client.commentaire;
        modePaiementInput.value = client.modePaiement;
        conditionPaiementInput.value = client.conditionPaiement;

        contactsContainer.innerHTML = "";

        if (client.contacts && client.contacts.length > 0) {
            client.contacts.forEach(addContactRow);
        } else {
            addContactRow();
        }

        modalTitle.textContent = "Modifier un Client";
        openModal();
    }

    function deleteClient(id) {

        const client = clients.find(c => c.id === id);
        if (!client) return;

        const confirmed = confirm(`Supprimer le client "${client.nom}" ? Cette action est irréversible.`);
        if (!confirmed) return;

        clients = clients.filter(c => c.id !== id);
        saveClients(clients);
        renderClients();
    }

    /* ============================
       Affichage / Rendu du tableau
    ============================ */

    function escapeHtml(value) {
        if (value === undefined || value === null) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function renderClients(list) {

        const data = list || clients;

        tableBody.innerHTML = "";

        if (data.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }

        data.forEach(function (client, index) {

            const tr = document.createElement("tr");

            const contactsHtml = (client.contacts && client.contacts.length > 0)
                ? client.contacts.map(c => `<span class="contact-tag">${escapeHtml(c.nom || c.email || c.telephone || "Contact")}</span>`).join("")
                : "<span style=\"color:#94a3b8\">Aucun</span>";

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${escapeHtml(client.nom)}</td>
                <td>${escapeHtml(client.telephone)}</td>
                <td>${escapeHtml(client.email)}</td>
                <td>${escapeHtml(client.commentaire)}</td>
                <td>${escapeHtml(client.modePaiement)}</td>
                <td>${escapeHtml(client.conditionPaiement)}</td>
                <td>${contactsHtml}</td>
                <td>
                    <button class="edit" title="Modifier">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete" title="Supprimer">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;

            tr.querySelector(".edit").addEventListener("click", function () {
                editClient(client.id);
            });

            tr.querySelector(".delete").addEventListener("click", function () {
                deleteClient(client.id);
            });

            tableBody.appendChild(tr);
        });

        updateCards(data);
    }

    function updateCards() {

        const totalClients = clients.length;
        const totalContacts = clients.reduce((sum, c) => sum + (c.contacts ? c.contacts.length : 0), 0);

        cardClients.textContent = totalClients;
        cardActifs.textContent = totalClients; // Tous les clients enregistrés sont considérés actifs
        cardInactifs.textContent = 0;
        cardContacts.textContent = totalContacts;
    }

    /* ============================
       Recherche / Filtre
    ============================ */

    function applyFilter() {

    const term = searchInput.value.trim().toLowerCase();
    const paiement = document.getElementById("filterPaiement").value;
    const condition = document.getElementById("filterCondition").value;

    const filtered = clients.filter(function(c){

        const recherche =
            c.nom.toLowerCase().includes(term) ||
            c.telephone.toLowerCase().includes(term) ||
            c.email.toLowerCase().includes(term);

        const paiementOK =
            paiement === "" || c.modePaiement === paiement;

        const conditionOK =
            condition === "" || c.conditionPaiement === condition;

        return recherche && paiementOK && conditionOK;
    });

    renderClients(filtered);

    closeFilterModal();
} if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", applyFilter);
}

    if (searchInput) {
        searchInput.addEventListener("input", applyFilter);
    }

 

function openFilterModal() {
    filterModal.classList.add("active");
}

function closeFilterModal() {
    filterModal.classList.remove("active");
}

if (btnFilter) {
    btnFilter.addEventListener("click", openFilterModal);
}

if (closeFilter) {
    closeFilter.addEventListener("click", closeFilterModal);
}

if (cancelFilter) {
    cancelFilter.addEventListener("click", closeFilterModal);
}

window.addEventListener("click", function(e){
    if(e.target === filterModal){
        closeFilterModal();
    }
});

    /* ============================
       Initialisation
    ============================ */

    renderClients();

});