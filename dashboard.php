
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Tableau de bord</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="dashboard.css">
</head>

<body>

    <!-- ===== SIDEBAR (identique à commande.html / clients.html / produits.html) ===== -->
    <aside class="sidebar">
        <div class="sidebar-logo">
            <i class="fa-solid fa-cubes"></i>
            <span>PalmFox</span>
        </div>
        <nav class="sidebar-nav">
<<<<<<< HEAD
            <a href="dashboard.php" class="nav-item active">
=======
            <a href="#" class="nav-item active">
>>>>>>> 45e99e6c82ceddbec93d0519d169f8f0b793095c
                <i class="fa-solid fa-chart-pie"></i> Dashboard
            </a>
            <a href="clients.php" class="nav-item">
                <i class="fa-solid fa-users"></i> Clients
            </a>
            <a href="produits.php" class="nav-item">
                <i class="fa-solid fa-box-open"></i> Produits
            </a>
            <a href="commande.php" class="nav-item">
                <i class="fa-solid fa-cart-shopping"></i> Commandes
            </a>
            <a href="livraisons.php" class="nav-item">
                <i class="fa-solid fa-truck"></i> Livraisons
            </a>
            <a href="chatbot.php" class="nav-item">
                <i class="fa-solid fa-robot"></i> Chatbot IA
            </a>
            <a href="logout.php" class="nav-item nav-logout">
                <i class="fa-solid fa-right-from-bracket"></i> Déconnexion
            </a>
        </nav>
    </aside>

    <!-- ===== MAIN CONTENT ===== -->
    <main class="main-content">

        <div class="topbar">
            <div class="user-profile">
                <div class="user-avatar">AM</div>
                <h5>Admin</h5>
            </div>
        </div>

        <header class="page-header">
            <div>
                <h1>Tableau de bord</h1>
                <p class="page-subtitle" id="dashboardDate"></p>
            </div>
        </header>

        <!-- ===== KPI CARDS ===== -->
        <section class="cards-dashboard-grid">

    <!-- ===== Clients ===== -->
    <div class="card-kpi">
        <div class="card-kpi-info">
            <span class="card-kpi-title">Clients Actifs</span>
            <h2 class="card-kpi-value"></h2>
            <span class="card-kpi-sub"></span>
        </div>
        <div class="card-kpi-side">
            <div class="card-kpi-icon icon-clients">
                <i class="fa-solid fa-users"></i>
            </div>
            <span class="trend-badge"></span>
        </div>
    </div>

    <!-- ===== Commandes ===== -->
    <div class="card-kpi">
        <div class="card-kpi-info">
            <span class="card-kpi-title">Commandes</span>
            <h2 class="card-kpi-value"></h2>
            <span class="card-kpi-sub"></span>
        </div>
        <div class="card-kpi-side">
            <div class="card-kpi-icon icon-commandes">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <span class="trend-badge"></span>
        </div>
    </div>

    <!-- ===== Livraisons ===== -->
    <div class="card-kpi">
        <div class="card-kpi-info">
            <span class="card-kpi-title">Livraisons</span>
            <h2 class="card-kpi-value"></h2>
            <span class="card-kpi-sub"></span>
        </div>
        <div class="card-kpi-side">
            <div class="card-kpi-icon icon-livraisons">
                <i class="fa-solid fa-truck"></i>
            </div>
            <span class="trend-badge"></span>
        </div>
    </div>

    <!-- ===== Stock ===== -->
    <div class="card-kpi">
        <div class="card-kpi-info">
            <span class="card-kpi-title">Valeur Stock</span>
            <h2 class="card-kpi-value font-mono"></h2>
            <span class="card-kpi-sub"></span>
        </div>
        <div class="card-kpi-side">
            <div class="card-kpi-icon icon-stock">
                <i class="fa-solid fa-box"></i>
            </div>
            <span class="trend-badge"></span>
        </div>
    </div>

</section>

        <!-- ===== COMMANDES RÉCENTES ===== -->
        <section class="table-card">
            <div class="table-card-header">
                <h2>Commandes récentes</h2>
                <a href="commande.html" class="btn-view-all">Voir tout</a>
            </div>

            <div class="table-scroll">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Référence</th>
                            <th>Client</th>
                            <th>Produit</th>
                            <th>Qté</th>
                            <th>Statut</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody id="commandesTableBody">
    <tr>
        <td>
            Aucune donnée disponible.
        </td>
    </tr>
</tbody>
                </table>
            </div>
        </section>

    </main>

    <script src="dashboard.js"></script>
</body>

</html>
