<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
    const chatHistorySidebar = document.getElementById('chatHistorySidebar');

    // Gère uniquement l'ouverture et la fermeture de la barre d'historique
    toggleHistoryBtn.addEventListener('click', () => {
        chatHistorySidebar.classList.toggle('hidden');
        
        if (window.innerWidth <= 700) {
            chatHistorySidebar.classList.toggle('active-mobile');
        }
    });
});
=======
// ===============================
// CHATBOT PALMFOX
// ===============================

const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// ===============================
// Ouvrir / Fermer
// ===============================

chatToggle.addEventListener("click", () => {
    chatWindow.classList.add("show");
    localStorage.setItem("chatOpen", "true");
});

closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("show");
    localStorage.setItem("chatOpen", "false");
});

// ===============================
// Garder l'état après changement de page
// ===============================

window.addEventListener("load", () => {

    if(localStorage.getItem("chatOpen") === "true"){
        chatWindow.classList.add("show");
    }

    const history = localStorage.getItem("chatHistory");

    if(history){
        chatBody.innerHTML = history;
        chatBody.scrollTop = chatBody.scrollHeight;
    }

});

// ===============================
// Envoyer message
// ===============================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});

// ===============================

function sendMessage(){

    const text = userInput.value.trim();

    if(text === "") return;

    addMessage(text,"user-message");

    userInput.value="";

    setTimeout(()=>{

        addMessage(getBotResponse(text),"bot-message");

    },700);

}

// ===============================

function addMessage(message,type){

    const div=document.createElement("div");

    div.className=type;

    div.innerHTML=message;

    chatBody.appendChild(div);

    chatBody.scrollTop=chatBody.scrollHeight;

    localStorage.setItem("chatHistory",chatBody.innerHTML);

}

// ===============================
// Réponses automatiques
// ===============================

function getBotResponse(message){

    message = message.toLowerCase();

    if(message.includes("bonjour") || message.includes("salut")){

        return "👋 Bonjour ! Comment puis-je vous aider ?";

    }

    if(message.includes("client")){

        return "Vous pouvez gérer les clients depuis le menu <b>Clients</b>.";

    }

    if(message.includes("produit")){

        return "La page <b>Produits</b> permet d'ajouter, modifier ou supprimer un produit.";

    }

    if(message.includes("commande")){

        return "La page <b>Commandes</b> permet de gérer les commandes des clients.";

    }

    if(message.includes("livraison")){

        return "Les livraisons sont disponibles dans le menu <b>Livraisons</b>.";

    }

    if(message.includes("dashboard")){

        return "Le Dashboard affiche les statistiques générales de votre entreprise.";

    }

    if(message.includes("merci")){

        return "😊 Avec plaisir !";

    }

    return "🤖 Désolé, je n'ai pas compris votre question.";
}

// ===============================
// Vider historique (facultatif)
// ===============================

function clearChat(){

    localStorage.removeItem("chatHistory");

    chatBody.innerHTML=`
    <div class="bot-message">
        👋 Bonjour !<br><br>
        Je suis <b>Foxy IA</b>.<br>
        Comment puis-je vous aider ?
    </div>
    `;

}
>>>>>>> 49a799569b5e7beb8462e2f16f8a63c2a634f7d7
