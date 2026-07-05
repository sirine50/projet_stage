

document.addEventListener("DOMContentLoaded", () => {

    // DATE
    const today = new Date();
    document.getElementById("dashboardDate").textContent =
        today.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    //KPI : CLIENTS
    document.getElementById("valClients").textContent = "47";
    document.getElementById("subClients").textContent = "Total enregistrés";
    document.getElementById("trendClients").className = "trend-badge trend-up";
    document.getElementById("trendClients").innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> 8%';

    //KPI : COMMANDES
    document.getElementById("valCommandes").textContent = "33";
    document.getElementById("subCommandes").textContent = "Ce mois-ci";
    document.getElementById("trendCommandes").className = "trend-badge trend-up";
    document.getElementById("trendCommandes").innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> 12%';

    //KPI : LIVRAISONS
    document.getElementById("valLivraisons").textContent = "21";
    document.getElementById("subLivraisons").textContent = "En cours / livrées";
    document.getElementById("trendLivraisons").className = "trend-badge trend-down";
    document.getElementById("trendLivraisons").innerHTML = '<i class="fa-solid fa-arrow-trend-down"></i> 3%';

    //KPI : VALEUR STOCK
    document.getElementById("valStock").textContent = "2.4M DA";
    document.getElementById("subStock").textContent = "Valorisation actuelle";
    document.getElementById("trendStock").className = "trend-badge trend-up";
    document.getElementById("trendStock").innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> 5%';

    //COMMANDES RÉCENTES
    const commandesRecentes = [
        { ref: "CMD-2026-089", client: "Alpha Industries", produit: "Routeur Pro v2", qte: 15, statut: "encours", statutLabel: "En cours", date: "28 juin 2026" },
        { ref: "CMD-2026-088", client: "Ahmed", produit: "Ordinateur", qte: 5, statut: "livree", statutLabel: "Livrée", date: "27 juin 2026" },
        { ref: "CMD-2026-087", client: "Sara", produit: "Imprimante", qte: 2, statut: "encours", statutLabel: "En cours", date: "25 juin 2026" },
        { ref: "CMD-2026-086", client: "Youssef", produit: "Écran", qte: 3, statut: "annulee", statutLabel: "Annulée", date: "22 juin 2026" }
    ];

    const tbody = document.getElementById("commandesTableBody");
    tbody.innerHTML = commandesRecentes.map(cmd => `
        <tr>
            <td class="ref-cell">${cmd.ref}</td>
            <td>${cmd.client}</td>
            <td>${cmd.produit}</td>
            <td>${cmd.qte}</td>
            <td><span class="badge-status status-${cmd.statut}">${cmd.statutLabel}</span></td>
            <td>${cmd.date}</td>
        </tr>
    `).join("");
});
