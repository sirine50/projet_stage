<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Gestion des Produits</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="produits.css">
</head>

<body>
    <aside class="sidebar">
        <div class="sidebar-logo">
            <i class="fa-solid fa-cubes"></i>
            <span>PalmFox</span>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.php" class="nav-item">
                <i class="fa-solid fa-chart-pie"></i> Dashboard
            </a>
            <a href="clients.php" class="nav-item">
                <i class="fa-solid fa-users"></i> Clients
            </a>
            <a href="produits.php" class="nav-item active">
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

    <main class="main-content">

        <div class="topbar">
            <a href="admin.html" class="user-profile">
                <div class="user-avatar">AM</div>
                <h5>Admin</h5>
            </a>
        </div>
        </div>

        <header class="page-header">
            <div>
                <h1>Catalogue des Produits</h1>
                <p class="page-subtitle">Gérez vos produits et suivez votre stock.</p>
            </div>
            <button class="btn-primary" onclick="openModal('add')">
                <i class="fa-solid fa-plus"></i> Ajouter un produit
            </button>
        </header>

        <!--TABLE + RECHERCHE/FILTRE-->
        <section class="table-card">
            <div class="table-card-header">
                <h2>Liste des Produits</h2>
                <div class="table-actions">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Rechercher par nom de produit...">
                    </div>
                    <button class="btn-secondary" onclick="toggleFilterOptions()">
                        <i class="fa-solid fa-sliders"></i> Filtrer
                    </button>
                </div>
            </div>

            <div class="filter-options-panel" id="filterPanel">
                <div class="filter-group">
                    <label for="filterStock">État du Stock :</label>
                    <select id="filterStock" class="filter-control">
                        <option value="all">Tous les produits</option>
                        <option value="instock">En stock (Suffisant)</option>
                        <option value="lowstock">Stock faible</option>
                        <option value="out">Rupture de stock</option>
                    </select>
                </div>
                <div class="filter-actions-inline">
                    <button class="btn-primary-small">Appliquer</button>
                </div>
            </div>

            <div class="table-scroll">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Référence</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><strong>MOD-WIFI-03</strong></td>
                            <td>Module WiFi v3</td>
                            <td>Module de communication sans fil.</td>
                            <td><span class="badge badge-warning">5 unités</span></td>
                            <td class="action-btns">
                                <button class="btn-icon btn-edit"
                                    onclick="openModal('edit', 'MOD-WIFI-03', 'Module WiFi v3', 'Module de communication sans fil.', 5)"><i
                                        class="fa-solid fa-pen"></i></button>
                                <button class="btn-icon btn-delete" onclick="openDeleteModal('Module WiFi v3')"><i
                                        class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <!--MODAL: AJOUTER / MODIFIER PRODUIT-->
    <div class="modal-overlay" id="productModal">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="modalTitle">Ajouter un Nouveau Produit</h3>
                <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form class="modal-body" onsubmit="event.preventDefault(); closeModal();">
                <div class="form-group">
                    <label>Code Produit</label>
                    <input type="text" id="formCode" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Référence</label>
                    <input type="text" id="formReference" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="formDescription" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Quantité en Stock</label>
                    <input type="number" id="formQty" class="form-control" min="0" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" id="formSubmitBtn" class="btn-primary">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>

    <!--MODAL: CONFIRMER SUPPRESSION-->
    <div class="modal-overlay" id="deleteModal">
        <div class="modal-box modal-box-sm delete-box">
            <div class="delete-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
            <h3>Confirmer la suppression</h3>
            <p class="delete-text">
                Voulez-vous vraiment supprimer le produit : <br><strong id="deleteProductName">[Nom]</strong> ?
            </p>
            <div class="delete-actions">
                <button type="button" class="btn-secondary" onclick="closeDeleteModal()">Annuler</button>
                <button type="button" class="btn-danger-modal" onclick="closeDeleteModal()">Oui, supprimer</button>
            </div>
        </div>
    </div>

    <script src="produits.js"></script>
</body>

</html>