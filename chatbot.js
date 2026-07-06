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