document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");

    // Controlla se il consenso è già stato dato
    const cookieConsent = localStorage.getItem("cookieConsent");

    if (cookieConsent === "accepted") {
        enableGoogleAnalytics(); // Abilita Google Analytics
        banner.style.display = "none"; // Nasconde il banner
    } else if (cookieConsent === "rejected") {
        banner.style.display = "none"; // Nasconde il banner
    } else {
        banner.style.display = "block"; // Mostra il banner se non c'è consenso
    }

    // Funzione per accettare i cookie
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "accepted");
        enableGoogleAnalytics(); // Abilita Google Analytics
        banner.style.display = "none";
    });

    // Funzione per rifiutare i cookie
    rejectButton.addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "rejected");
        banner.style.display = "none";
    });

    // Funzione per abilitare Google Analytics
    function enableGoogleAnalytics() {
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-NGDS2Z0GFB";
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-NGDS2Z0GFB");
    }
});



document.getElementById("modify-consent").addEventListener("click", function () {
    localStorage.removeItem("cookieConsent");
    location.reload(); // Ricarica la pagina per mostrare nuovamente il banner
});

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const modifyConsentButton = document.getElementById("modify-consent");

    // Mostra nuovamente il banner per modificare le preferenze
    modifyConsentButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita che il link scorra verso l'alto
        localStorage.removeItem("cookieConsent"); // Rimuove il consenso salvato
        banner.style.display = "block"; // Mostra di nuovo il banner
    });
});

