<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ERP Pro - Gestion des Produits</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="produits.css">
    <link rel="stylesheet" href="main_components.css">
</head>
<body>

    <div class="sidebar">
        <div class="sidebar-brand">
            <i class="fa-solid fa-cubes"></i> <span>PalmFox</span>
        </div>
        <ul class="sidebar-menu">
            <li><a href="#"><i class="fa-solid fa-chart-pie"></i><span>Dashboard</span></a></li>
            <li><a href="clients.html"><i class="fa-solid fa-users"></i><span>Clients</span></a></li>
            <li class="active"><a href="#"><i class="fa-solid fa-box-open"></i><span>Produits</span></a></li>
            <li><a href="commande.html"><i class="fa-solid fa-cart-shopping"></i><span>Commandes</span></a></li>
            <li><a href="Livraisons.php"><i class="fa-solid fa-truck"></i><span>Livraisons</span></a></li>
            <li><a href="chatbot.html"><i class="fa-solid fa-robot"></i><span>Chatbot IA</span></a></li>
            <li><a href="logout.php"><i class="fa-solid fa-right-from-bracket"></i><span>Déconnexion</span></a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="header">
            <div class="user-profile">
                <div class="user-avatar">AM</div>
                <h5>Admin</h5>
            </div>
        </div>

        <div class="container">
            <div class="page-title-block">
                <h2>Catalogue des Produits</h2>
                <button class="btn-primary" onclick="openModal('add')">
                    <i class="fa-solid fa-plus"></i> Ajouter un produit
                </button>
            </div>

            <div class="search-container">
                <div class="search-and-filter-row">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass" style="color: var(--text-light);"></i>
                        <input type="text" placeholder="Rechercher par nom de produit...">
                    </div>
                    
                    <button class="btn-filter" onclick="toggleFilterOptions()">
                        <i class="fa-solid fa-sliders"></i> <span>Filtrer</span>
                    </button>
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
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Référence</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>MOD-WIFI-03</strong></td>
                            <td>Module WiFi v3</td>
                            <td>Module de communication sans fil.</td>
                            <td><span class="badge badge-warning">5 unités</span></td>
                            <td class="action-btns">
                                <button class="btn-icon btn-edit" onclick="openModal('edit', 'MOD-WIFI-03', 'Module WiFi v3', 'Module de communication sans fil.', 5)"><i class="fa-solid fa-pen"></i></button>
                                <button class="btn-icon btn-delete" onclick="openDeleteModal('Module WiFi v3')"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal-overlay" id="productModal">
        <div class="modal">
            <div class="modal-header">
                <h3 id="modalTitle">Ajouter un Nouveau Produit</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form onsubmit="event.preventDefault(); closeModal();">
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

    <div class="modal-overlay" id="deleteModal">
        <div class="modal" style="max-width: 400px; text-align: center;">
            <div style="color: var(--danger); font-size: 50px; margin-bottom: 15px;">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <h3>Confirmer la suppression</h3>
            <p style="color: var(--text-light); margin-top: 10px; margin-bottom: 25px;">
                Voulez-vous vraiment supprimer le produit : <br><strong id="deleteProductName" style="color: var(--text-dark);">[Nom]</strong> ?
            </p>
            <div style="display: flex; justify-content: center; gap: 15px;">
                <button type="button" class="btn-secondary" onclick="closeDeleteModal()">Annuler</button>
                <button type="button" class="btn-danger-modal" onclick="closeDeleteModal()">Oui, supprimer</button>
            </div>
        </div>
    </div>

    <script src="produits.js"></script>
</body>
</html>