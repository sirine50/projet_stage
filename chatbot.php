<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
    <!-- ===== CHATBOT PALMFOX ===== -->

<div id="chatbot-container">

    <!-- Bouton flottant -->
    <button id="chat-toggle">
        <i class="fa-solid fa-robot"></i>
    </button>

    <!-- Fenêtre Chat -->
    <div id="chat-window">

        <!-- Header -->
        <div class="chat-header">
            <div class="chat-header-info">
                <div class="chat-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>

                <div>
                    <h3>Foxy IA</h3>
                    <span>Assistant Intelligent</span>
                </div>
            </div>

            <button id="close-chat">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Messages -->
        <div class="chat-body" id="chat-body">

            <div class="bot-message">
                👋 Bonjour !
                <br><br>
                Je suis <b>Foxy IA</b>.
                <br>
                Je peux vous aider concernant :
                <ul>
                    <li>Clients</li>
                    <li>Produits</li>
                    <li>Commandes</li>
                    <li>Livraisons</li>
                </ul>

                Posez-moi votre question 😊
            </div>

        </div>

        <!-- Zone d'écriture -->
        <div class="chat-footer">

            <input
                type="text"
                id="user-input"
                placeholder="Écrire un message..."
            >

            <button id="send-btn">
                <i class="fa-solid fa-paper-plane"></i>
            </button>

        </div>

    </div>

</div>

<link rel="stylesheet" href="chatbot.css">
<script src="chatbot.js"></script>
</body>
</html>