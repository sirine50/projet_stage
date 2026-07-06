<!DOCTYPE html>

<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalmFox - Chatbot IA</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="sidebar_header.css">
    <link rel="stylesheet" href="chatbot.css">
</head>

<body>


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

                    <a href="chatbot.php " class="nav-item active">
                        
                            <i class="fa-solid fa-robot"></i>Chatbot IA
                        </a>
                        <a href="logout.php" class="nav-item nav-logout">
                            <i class="fa-solid fa-right-from-bracket"></i> Déconnexion
                        </a>
            </nav>
        </aside>


        <main class="main-content chat-layout">

            <section class="chat-history-sidebar" id="chatHistorySidebar">
                <div class="history-header">
                    <form action="add_chat.php" method="POST">
                        <button type="submit" class="btn-new-chat">
                            <i class="fa-solid fa-plus"></i> Nouveau chat
                        </button>
                    </form>
                </div>

                <div class="history-list">

                    <div class="history-item active">
                        <a href="chatbot.php?id_session=42" class="history-link">
                            <i class="fa-regular fa-message"></i>
                            <span>Analyse du stock de sécurité</span>
                        </a>

                        <form action="delete_chat.php" method="POST"
                            onsubmit="return confirm('Voulez-vous vraiment supprimer cette conversation ?');">
                            <input type="hidden" name="id_session" value="42">
                            <button type="submit" class="btn-delete-chat" title="Supprimer la discussion">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </form>
                    </div>

                    <div class="history-item">
                        <a href="chatbot.php?id_session=43" class="history-link">
                            <i class="fa-regular fa-message"></i>
                            <span>Formule calcul commandes</span>
                        </a>

                        <form action="delete_chat.php" method="POST"
                            onsubmit="return confirm('Voulez-vous vraiment supprimer cette conversation ?');">
                            <input type="hidden" name="id_session" value="43">
                            <button type="submit" class="btn-delete-chat" title="Supprimer la discussion">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            <section class="chat-main-area">

                <div class="chat-topbar">
                    <button class="btn-toggle-history" id="toggleHistoryBtn" title="Afficher/Masquer l'historique">
                        <i class="fa-solid fa-bars-staggered"></i>
                    </button>

                    <div class="user-profile">
                        <div class="user-avatar">AM</div>
                        <h5>Admin</h5>
                    </div>
                </div>

                <div class="chat-messages-container" id="chatMessagesBox">
                    <div class="chat-bubble-wrapper bot-message">
                        <div class="chat-avatar-icon"><i class="fa-solid fa-robot"></i></div>
                        <div class="chat-bubble">
                            Bonjour Admin ! Je suis l'assistant IA de PalmFox. Comment puis-je vous aider aujourd'hui ?
                        </div>
                    </div>
                </div>

                <div class="chat-input-area">
                    <div class="chat-input-wrapper">
                        <input type="text" id="chatInput" placeholder="Posez une question à l'IA PalmFox...">
                        <button class="btn-send-chat" id="sendChatBtn">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

            </section>
        </main>

        <script src="chatbot.js"></script>

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

                    <input type="text" id="user-input" placeholder="Écrire un message...">

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