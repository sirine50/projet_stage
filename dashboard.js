// Structure de données conforme au visuel
const donneesDashboard = {
    kpi: {
        clientsActifs: 47,
        commandes: 89,
        livraisons: 34,
        valeurStock: "2.4M DA"
    },
    commandesRecentes: [
        {
            reference: "CMD-2026-089",
            client: "Alpha Industries",
            produit: "Routeur Pro v2",
            quantite: 15,
            statut: "En cours",
            date: "28 juin 2026"
        },
        {
            reference: "CMD-2024-088",
            client: "Innovatech SAS",
            produit: "Module WiFi v3",
            quantite: 120,
            statut: "Livrée / Facturée",
            date: "27 juin 2026"
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    chargerDonneesDashboard();
});

function chargerDonneesDashboard() {
    // Remplissage des blocs KPI fondamentaux
    document.getElementById('valClients').textContent = donneesDashboard.kpi.clientsActifs;
    document.getElementById('valCommandes').textContent = donneesDashboard.kpi.commandes;
    document.getElementById('valLivraisons').textContent = donneesDashboard.kpi.livraisons;
    document.getElementById('valStock').textContent = donneesDashboard.kpi.valeurStock;

    // Remplissage des lignes du tableau de flux actif
    const tbody = document.getElementById('commandesTableBody');
    tbody.innerHTML = '';

    donneesDashboard.commandesRecentes.forEach(cmd => {
        const tr = document.createElement('tr');
        
        // Attribution de la classe correspondante au badge
        let classeBadge = "badge-status ";
        if (cmd.statut === "En cours") {
            classeBadge += "status-encours";
        } else if (cmd.statut === "Livrée / Facturée") {
            classeBadge += "status-livree";
        }

        tr.innerHTML = `
            <td style="color: var(--sidebar-active); font-weight: 600;">${cmd.reference}</td>
            <td style="color: var(--text-dark); font-weight: 600;">${cmd.client}</td>
            <td style="color: var(--text-light);">${cmd.produit}</td>
            <td style="color: var(--text-dark); font-weight: 500;">${cmd.quantite}</td>
            <td><span class="${classeBadge}">${cmd.statut}</span></td>
            <td style="color: var(--text-light);">${cmd.date}</td>
        `;
        tbody.appendChild(tr);
    });
}