<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Gestion des Livraisons</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="livraisons.css">
</head>

<body>
    <aside class="sidebar">
        <div class="sidebar-logo">
            <i class="fa-solid fa-cubes"></i>
            <span>PalmFox</span>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.php" class="nav-item">
                <i class="fa-solid fa-chart-pie"></i> <span>Dashboard</span>
            </a>
            <a href="clients.php" class="nav-item">
                <i class="fa-solid fa-users"></i> <span>Clients</span>
            </a>
            <a href="produits.php" class="nav-item">
                <i class="fa-solid fa-box-open"></i> <span>Produits</span>
            </a>
            <a href="commande.php" class="nav-item">
                <i class="fa-solid fa-cart-shopping"></i> <span>Commandes</span>
            </a>
            <a href="livraisons.php" class="nav-item active">
                <i class="fa-solid fa-truck"></i> <span>Livraisons</span>
            </a>
            <a href="chatbot.php" class="nav-item">
                <i class="fa-solid fa-robot"></i> <span>Chatbot IA</span>
            </a>
            <a href="logout.php" class="nav-item nav-logout">
                <i class="fa-solid fa-right-from-bracket"></i> <span>Déconnexion</span>
            </a>
        </nav>
    </aside>
    


    <main class="main-content">

        <div class="topbar">
            <a href="admin.php" class="user-profile">
                <div class="user-avatar">AM</div>
                <h5>Admin</h5>
            </a>
        </div>
        <header class="page-header">
            <div>
                <h1>Livraisons</h1>
                <p class="page-subtitle">Consultez et gérez vos livraisons.</p>
            </div>
            <button class="btn-primary" onclick="openModal('add')">
                <i class="fa-solid fa-plus"></i> Nouvelle Livraison
            </button>
        </header>

        <section class="table-card">
            <div class="table-card-header">
                <h2>Liste des Livraisons</h2>
                <div class="table-actions">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Rechercher une livraison...">
                    </div>
                    <button class="btn-secondary" onclick="toggleFilterOptions()">
                        <i class="fa-solid fa-sliders"></i> Filtrer
                    </button>
                </div>
            </div>

            <div class="filter-options-panel" id="filterPanel">
                <div class="filter-group">
                    <label for="filterStatus">Statut :</label>
                    <select id="filterStatus" class="filter-control">
                        <option value="all">Toutes les livraisons</option>
                        <option value="pending">En cours</option>
                        <option value="done">Livrée / Facturée</option>
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
                            <th>Code Livraison</th>
                            <th>ID Commande</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>LIV-2026-045</strong></td>
                            <td>42</td>
                            <td><span class="badge badge-warning">En cours</span></td>
                            <td class="action-btns">
                                <button class="btn-icon btn-edit"
                                    onclick="openModal('edit', 'LIV-2026-045', '42', 'En cours')">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="btn-icon btn-delete" onclick="openDeleteModal('LIV-2026-045')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <div class="modal-overlay" id="deliveryModal">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="modalTitle">Nouvelle Livraison</h3>
                <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form class="modal-body" onsubmit="event.preventDefault(); closeModal();">
                <input type="hidden" id="deliveryId" name="id">

                <div class="form-group">
                    <label>ID Commande</label>
                    <input type="text" id="formIdCommande" name="id_commande" class="form-control" placeholder="Ex: 42"
                        required>
                </div>

                <div class="form-group">
                    <label>Statut</label>
                    <select id="formStatus" name="status" class="form-control" required>
                        <option value="En cours">En cours</option>
                        <option value="Livrée / Facturée">Livrée / Facturée</option>
                    </select>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" id="formSubmitBtn" class="btn-primary">Valider</button>
                </div>
            </form>
        </div>
    </div>

    <div class="modal-overlay" id="deleteModal">
        <div class="modal-box modal-box-sm delete-box">
            <div class="delete-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
            <h3>Confirmer la suppression</h3>
            <p class="delete-text">
                Voulez-vous vraiment supprimer la livraison : <br><strong id="deleteDeliveryName">[Code]</strong> ?
            </p>
            <div class="delete-actions">
                <button type="button" class="btn-secondary" onclick="closeDeleteModal()">Annuler</button>
                <button type="button" class="btn-danger-modal" onclick="closeDeleteModal()">Oui, supprimer</button>
            </div>
        </div>
    </div>

    <script>
        function toggleFilterOptions() {
            document.getElementById('filterPanel').classList.toggle('active');
        }

        // Gère l'ouverture dynamique en mode AJOUT ou MODIFICATION
        function openModal(mode, id = '', idCommande = '', status = 'En cours') {
            const modal = document.getElementById('deliveryModal');
            const title = document.getElementById('modalTitle');
            const submitBtn = document.getElementById('formSubmitBtn');

            if (mode === 'edit') {
                title.innerText = "Modifier la Livraison";
                submitBtn.innerText = "Enregistrer les modifications";

                document.getElementById('deliveryId').value = id;
                document.getElementById('formIdCommande').value = idCommande; // Remplit l'input texte
                document.getElementById('formStatus').value = status;
            } else {
                title.innerText = "Nouvelle Livraison";
                submitBtn.innerText = "Valider";

                document.getElementById('deliveryId').value = '';
                document.getElementById('formIdCommande').value = ''; // Vide l'input texte
                document.getElementById('formStatus').selectedIndex = 0;
            }
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('deliveryModal').classList.remove('active');
        }

        function openDeleteModal(deliveryCode) {
            document.getElementById('deleteDeliveryName').innerText = deliveryCode;
            document.getElementById('deleteModal').classList.add('active');
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('active');
        }
    </script>
</body>

</html>