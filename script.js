document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a'); // Seleziona tutti i link

    links.forEach(link => {
        link.addEventListener('click', event => {
            // Intercetta il click sui link
            const targetUrl = link.href;

            // Evita comportamenti di default
            event.preventDefault();

            // Applica l'effetto fade-out
            document.body.classList.add('fade-out');

            // Aspetta la fine dell'animazione e poi cambia pagina
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // 500ms = durata dell'animazione
        });
    });

    // Quando la pagina carica, applica fade-in
    document.body.classList.add('fade-in');
});