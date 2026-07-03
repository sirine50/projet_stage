
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Gestion des Clients</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="clients.css">
</head>

<body>

    <!-- ===== SIDEBAR (identique à commande.html) ===== -->
    <aside class="sidebar">
        <div class="sidebar-logo">
            <i class="fa-solid fa-cubes"></i>
            <span>PalmFox</span>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.php" class="nav-item">
                <i class="fa-solid fa-chart-pie"></i> Dashboard
            </a>
            <a href="clients.php" class="nav-item active">
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
    <a href="admin.php" class="user-profile">
        <div class="user-avatar">AM</div>
        <h5>Admin</h5>
    </a>
</div>

        <header class="page-header">
            <div>
                <h1>Gestion des Clients</h1>
                <p class="page-subtitle">Consultez et gérez vos clients.</p>
            </div>
            <button class="btn-primary" id="btnAddClient">
                <i class="fa-solid fa-plus"></i> Nouveau Client
            </button>
        </header>

        <!-- ===== STAT CARDS ===== -->
        <section class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon icon-total"><i class="fa-solid fa-users"></i></div>
                <div class="stat-info">
                    <span class="stat-label">CLIENTS</span>
                    <span class="stat-value" id="clients">0</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon icon-actifs"><i class="fa-solid fa-user-check"></i></div>
                <div class="stat-info">
                    <span class="stat-label">ACTIFS</span>
                    <span class="stat-value" id="actifs">0</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon icon-inactifs"><i class="fa-solid fa-user-xmark"></i></div>
                <div class="stat-info">
                    <span class="stat-label">INACTIFS</span>
                    <span class="stat-value" id="inactifs">0</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon icon-contacts"><i class="fa-solid fa-address-book"></i></div>
                <div class="stat-info">
                    <span class="stat-label">CONTACTS</span>
                    <span class="stat-value" id="contacts">0</span>
                </div>
            </div>
        </section>

        <!-- ===== TABLE ===== -->
        <section class="table-card">
            <div class="table-card-header">
                <h2>Liste des Clients</h2>
                <div class="table-actions">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="searchInput" placeholder="Rechercher un client...">
                    </div>
                    <button id="btnFilter" type="button" class="btn-secondary">
                        <i class="fa-solid fa-filter"></i> Filtrer
                    </button>
                </div>
            </div>

            <div class="table-scroll">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Téléphone</th>
                            <th>Email</th>
                            <th>Commentaire</th>
                            <th>Mode de paiement</th>
                            <th>Condition de paiement</th>
                            <th>Contacts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="clientsTableBody">
                        <!-- Les lignes sont générées dynamiquement par clients.js -->
                    </tbody>
                </table>
            </div>

            <p class="empty-state" id="emptyState">Aucun client pour le moment. Cliquez sur « Nouveau Client » pour en ajouter un.</p>
        </section>

    </main>

    <!-- ===== MODAL: AJOUTER / MODIFIER CLIENT ===== -->
    <div class="modal-overlay" id="clientModal">
        <div class="modal-box modal-box-lg">

            <div class="modal-header">
                <h2 id="modalTitle">Ajouter un Client</h2>
                <button type="button" class="modal-close" id="closeModal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <form id="clientForm" class="modal-body two-col">

                <input type="hidden" id="clientId">

                <div class="form-group">
                    <label>Nom du client</label>
                    <input type="text" id="nom" required>
                </div>

                <div class="form-group">
                    <label>Téléphone</label>
                    <input type="text" id="telephone" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email">
                </div>

                <div class="form-group full-width">
                    <label>Commentaire</label>
                    <textarea id="commentaire"></textarea>
                </div>

                <div class="form-group">
                    <label>Mode de paiement</label>
                    <select id="modePaiement">
                        <option value="">Choisir</option>
                        <option>Cash</option>
                        <option>Virement</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Condition de paiement</label>
                    <select id="conditionPaiement">
                        <option value="">Choisir</option>
                        <option>À la livraison</option>
                        <option>30 jours</option>
                        <option>60 jours</option>
                    </select>
                </div>

                <div class="contacts-section">
                    <div class="contacts-heading">
                        <h3>Contacts</h3>
                        <button type="button" class="btn-add-contact" id="btnAddContact">
                            <i class="fa-solid fa-plus"></i> Ajouter un contact
                        </button>
                    </div>
                    <div id="contactsContainer">
                        <!-- Les blocs de contact sont générés dynamiquement -->
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="cancelBtn">Annuler</button>
                    <button type="submit" class="btn-primary">Enregistrer</button>
                </div>

            </form>
        </div>
    </div>

    <!-- ===== MODAL: FILTRER ===== -->
    <div class="modal-overlay" id="filterModal">
        <div class="modal-box">

            <div class="modal-header">
                <h2>Filtrer les clients</h2>
                <button class="modal-close" id="closeFilter">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>Mode de paiement</label>
                    <select id="filterPaiement">
                        <option value="">Tous</option>
                        <option value="Cash">Cash</option>
                        <option value="Virement">Virement</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Condition de paiement</label>
                    <select id="filterCondition">
                        <option value="">Toutes</option>
                        <option>À la livraison</option>
                        <option>30 jours</option>
                        <option>60 jours</option>
                    </select>
                </div>

                <div class="modal-footer">
                    <button class="btn-secondary" id="cancelFilter">Annuler</button>
                    <button class="btn-primary" id="applyFilterBtn">Appliquer</button>
                </div>
            </div>

        </div>
    </div>

    <script src="clients.js"></script>
</body>

</html>
