/* ===========================================================
   admin.js — page Mon Compte (front-end, données mock)
   À remplacer plus tard par des appels fetch() vers admin.php
   quand le backend PHP/MySQL sera branché.
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (sel) => document.querySelector(sel);

    // ---------- MOT DE PASSE ACTUEL SIMULÉ (à remplacer par la BDD) ----------
    const MOCK_CURRENT_PASSWORD = "admin1234";

    /* ============================
       INFORMATIONS DU COMPTE
    ============================ */
    const infoForm = $("#infoForm");
    const infoSuccess = $("#infoSuccess");

    infoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Ici : envoyer fullName / emailInput / phoneInput au backend (PHP)
        infoSuccess.textContent = "Informations mises à jour avec succès.";
        setTimeout(() => { infoSuccess.textContent = ""; }, 4000);
    });

    /* ============================
       CHANGEMENT DE MOT DE PASSE
    ============================ */
    const passwordForm = $("#passwordForm");
    const passwordError = $("#passwordError");
    const passwordSuccess = $("#passwordSuccess");

    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        passwordError.textContent = "";
        passwordSuccess.textContent = "";

        const current = $("#currentPassword").value;
        const next = $("#newPassword").value;
        const confirm = $("#confirmPassword").value;

        if (current !== MOCK_CURRENT_PASSWORD) {
            passwordError.textContent = "Le mot de passe actuel est incorrect.";
            return;
        }
        if (next.length < 8) {
            passwordError.textContent = "Le nouveau mot de passe doit contenir au moins 8 caractères.";
            return;
        }
        if (next !== confirm) {
            passwordError.textContent = "Les deux mots de passe ne correspondent pas.";
            return;
        }

        // Ici : envoyer le nouveau mot de passe au backend (PHP) en le hachant côté serveur
        passwordSuccess.textContent = "Mot de passe mis à jour avec succès.";
        passwordForm.reset();
        setTimeout(() => { passwordSuccess.textContent = ""; }, 4000);
    });

    /* ============================
       AFFICHER / MASQUER LES MOTS DE PASSE
    ============================ */
    document.querySelectorAll(".toggle-eye").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector("i");
            const isHidden = target.type === "password";
            target.type = isHidden ? "text" : "password";
            icon.classList.toggle("fa-eye");
            icon.classList.toggle("fa-eye-slash");
        });
    });

    /* ============================
       MOT DE PASSE OUBLIÉ
    ============================ */
    const forgotModal = $("#forgotModal");
    const btnForgotPassword = $("#btnForgotPassword");
    const closeForgotModal = $("#closeForgotModal");
    const cancelForgot = $("#cancelForgot");
    const sendForgotLink = $("#sendForgotLink");
    const closeForgotSent = $("#closeForgotSent");
    const forgotStepEmail = $("#forgotStepEmail");
    const forgotStepSent = $("#forgotStepSent");
    const forgotEmail = $("#forgotEmail");
    const forgotEmailSent = $("#forgotEmailSent");

    function openForgotModal() {
        forgotStepEmail.style.display = "block";
        forgotStepSent.style.display = "none";
        forgotEmail.value = $("#emailInput").value || "";
        forgotModal.classList.add("open");
    }

    function closeForgot() {
        forgotModal.classList.remove("open");
    }

    btnForgotPassword.addEventListener("click", openForgotModal);
    closeForgotModal.addEventListener("click", closeForgot);
    cancelForgot.addEventListener("click", closeForgot);
    closeForgotSent.addEventListener("click", closeForgot);

    forgotModal.addEventListener("click", (e) => {
        if (e.target.id === "forgotModal") closeForgot();
    });

    sendForgotLink.addEventListener("click", () => {
        const email = forgotEmail.value.trim();
        if (!email || !email.includes("@")) {
            forgotEmail.focus();
            return;
        }
        // Ici : appeler le backend pour envoyer réellement l'email de réinitialisation
        forgotEmailSent.textContent = email;
        forgotStepEmail.style.display = "none";
        forgotStepSent.style.display = "block";
    });

});
