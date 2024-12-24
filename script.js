document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', event => {
            const targetUrl = link.href;
            event.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });

    document.body.classList.add('fade-in');

    const snowflakesCount = 100;

    for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.textContent = "❄️"; // Usa il simbolo del fiocco di neve
        document.body.appendChild(snowflake);

        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
    }
});