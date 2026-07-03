<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Mon Compte</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="admin.css">
</head>

<body>

    <!-- ===== SIDEBAR ===== -->
    <aside class="sidebar">
        <div class="sidebar-logo">
            <i class="fa-solid fa-cubes"></i>
            <span>PalmFox</span>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.html" class="nav-item">
                <i class="fa-solid fa-chart-pie"></i> Dashboard
            </a>
            <a href="clients.html" class="nav-item">
                <i class="fa-solid fa-users"></i> Clients
            </a>
            <a href="produits.html" class="nav-item">
                <i class="fa-solid fa-box-open"></i> Produits
            </a>
            <a href="commande.html" class="nav-item">
                <i class="fa-solid fa-cart-shopping"></i> Commandes
            </a>
            <a href="livraisons.php" class="nav-item">
                <i class="fa-solid fa-truck"></i> Livraisons
            </a>
            <a href="chatbot.html" class="nav-item">
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

        <!-- ===== PROFILE BANNER ===== -->
        <section class="profile-banner">
            <div class="profile-avatar-ring">
                <div class="profile-avatar">AM</div>
            </div>
            <div class="profile-identity">
                <h1>Admin</h1>
                <span class="profile-role"><i class="fa-solid fa-shield-halved"></i> Administrateur</span>
            </div>
        </section>

        <div class="settings-grid">

            <!-- ===== INFORMATIONS DU COMPTE ===== -->
            <section class="settings-card">
                <div class="settings-card-header">
                    <div>
                        <h2>Informations du compte</h2>
                        <p class="settings-card-subtitle">Vos coordonnées de contact et d'identification.</p>
                    </div>
                    <div class="settings-icon"><i class="fa-solid fa-id-card"></i></div>
                </div>

                <form id="infoForm" class="settings-form">
                    <div class="form-group">
                        <label>Nom complet</label>
                        <input type="text" id="fullName" value="Admin Manager">
                    </div>

                    <div class="form-group">
                        <label>Adresse email</label>
                        <div class="input-with-icon">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="email" id="emailInput" value="admin@palmfox.com" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Numéro de téléphone</label>
                        <div class="input-with-icon">
                            <i class="fa-solid fa-phone"></i>
                            <input type="tel" id="phoneInput" value="+212 6 00 00 00 00" required>
                        </div>
                    </div>

                    <p class="form-success" id="infoSuccess"></p>

                    <div class="settings-actions">
                        <button type="submit" class="btn-primary">
                            <i class="fa-solid fa-check"></i> Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </section>

            <!-- ===== SÉCURITÉ / MOT DE PASSE ===== -->
            <section class="settings-card">
                <div class="settings-card-header">
                    <div>
                        <h2>Sécurité</h2>
                        <p class="settings-card-subtitle">Modifiez votre mot de passe régulièrement pour protéger votre
                            compte.</p>
                    </div>
                    <div class="settings-icon"><i class="fa-solid fa-lock"></i></div>
                </div>

                <form id="passwordForm" class="settings-form">
                    <div class="form-group">
                        <label>Mot de passe actuel</label>
                        <div class="input-with-icon password-field">
                            <i class="fa-solid fa-key"></i>
                            <input type="password" id="currentPassword" required>
                            <button type="button" class="toggle-eye" data-target="currentPassword"><i
                                    class="fa-solid fa-eye"></i></button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Nouveau mot de passe</label>
                        <div class="input-with-icon password-field">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" id="newPassword" minlength="8" required>
                            <button type="button" class="toggle-eye" data-target="newPassword"><i
                                    class="fa-solid fa-eye"></i></button>
                        </div>
                        <span class="field-hint">8 caractères minimum</span>
                    </div>

                    <div class="form-group">
                        <label>Confirmer le nouveau mot de passe</label>
                        <div class="input-with-icon password-field">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" id="confirmPassword" minlength="8" required>
                            <button type="button" class="toggle-eye" data-target="confirmPassword"><i
                                    class="fa-solid fa-eye"></i></button>
                        </div>
                    </div>

                    <p class="form-error" id="passwordError"></p>
                    <p class="form-success" id="passwordSuccess"></p>

                    <div class="settings-actions">
                        <button type="button" class="link-forgot" id="btnForgotPassword">Mot de passe oublié ?</button>
                        <button type="submit" class="btn-primary">
                            <i class="fa-solid fa-check"></i> Mettre à jour le mot de passe
                        </button>
                    </div>
                </form>
            </section>

        </div>

    </main>

    <!-- ===== MODAL : MOT DE PASSE OUBLIÉ ===== -->
    <div class="modal-overlay" id="forgotModal">
        <div class="modal-box">
            <div class="modal-header">
                <h3>Mot de passe oublié</h3>
                <button class="modal-close" id="closeForgotModal"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="modal-body" id="forgotStepEmail">
                <p class="modal-text">Entrez l'adresse email associée à votre compte. Un lien de réinitialisation vous
                    sera envoyé.</p>
                <div class="form-group">
                    <label>Adresse email</label>
                    <div class="input-with-icon">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="forgotEmail" placeholder="admin@palmfox.com">
                    </div>
                </div>
                <div class="settings-actions modal-actions-end">
                    <button type="button" class="btn-secondary" id="cancelForgot">Annuler</button>
                    <button type="button" class="btn-primary" id="sendForgotLink">
                        <i class="fa-solid fa-paper-plane"></i> Envoyer le lien
                    </button>
                </div>
            </div>

            <div class="modal-body" id="forgotStepSent" style="display:none;">
                <div class="forgot-success-icon"><i class="fa-solid fa-envelope-circle-check"></i></div>
                <p class="modal-text center">
                    Un email de réinitialisation a été envoyé à<br>
                    <strong id="forgotEmailSent"></strong>
                </p>
                <div class="settings-actions modal-actions-center">
                    <button type="button" class="btn-primary" id="closeForgotSent">Compris</button>
                </div>
            </div>
        </div>
    </div>

    <script src="admin.js"></script>
</body>

</html>