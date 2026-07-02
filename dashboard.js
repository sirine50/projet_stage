document.addEventListener('DOMContentLoaded', () => {
    // Exemple d'insertion dynamique des KPI
    document.getElementById('dashboardDate').textContent = "Mardi 1 juillet 2026";
    
    document.getElementById('valClients').textContent = "47";
    document.getElementById('subClients').textContent = "Total enregistrés";
    document.getElementById('trendClients').className = "trend-badge trend-up";
    document.getElementById('trendClients').innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> 8%';

    document.getElementById('valStock').textContent = "2.4M DA";
    
    // Exemple d'insertion d'une ligne de tableau
    const tbody = document.getElementById('commandesTableBody');
    tbody.innerHTML = `
        <tr>
            <td style="color: var(--sidebar-active); font-weight: 600;">CMD-2026-089</td>
            <td style="color: var(--text-dark); font-weight: 600;">Alpha Industries</td>
            <td style="color: var(--text-light);">Routeur Pro v2</td>
            <td style="color: var(--text-dark); font-weight: 500;">15</td>
            <td><span class="badge-status status-encours">En cours</span></td>
            <td style="color: var(--text-light);">28 juin 2026</td>
        </tr>
    `;
});