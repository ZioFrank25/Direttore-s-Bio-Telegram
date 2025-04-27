// Seleziona il paragrafo da aggiornare
const subtext = document.querySelector('.subtext');

// Frasi che ruotano dinamicamente
const phrases = [
  "Performing scheduled upgrades...",
  "Optimizing server performance...",
  "Applying critical patches...",
  "Upgrading user experience...",
  "System maintenance in progress..."
];

// Applica un piccolo glitch al testo cambiando frase
function glitchSubtext(newText) {
  subtext.style.opacity = 0.3;
  subtext.style.transform = 'skewX(10deg)';
  
  setTimeout(() => {
    subtext.textContent = newText;
    subtext.style.opacity = 1;
    subtext.style.transform = 'skewX(0deg)';
  }, 300);
}

// Cambia frase ogni 4 secondi
function changePhrase() {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  glitchSubtext(randomPhrase);
}

// Prima frase mostrata subito
changePhrase();
setInterval(changePhrase, 4000);