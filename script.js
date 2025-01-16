document.addEventListener("DOMContentLoaded", () => {
    const popups = document.querySelectorAll(".popup");
    const buttons = document.querySelectorAll(".category-btn");
    const closeButtons = document.querySelectorAll(".popup-close");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const popup = popups[index];
            popup.classList.add("active");
        });
    });

    closeButtons.forEach((closeButton, index) => {
        closeButton.addEventListener("click", () => {
            const popup = popups[index];
            popup.classList.remove("active");
            popup.classList.add("closing");

            // Rimuove la classe 'closing' dopo l'animazione
            setTimeout(() => {
                popup.classList.remove("closing");
            }, 600); // Tempo uguale alla durata dell'animazione
        });
    });
});