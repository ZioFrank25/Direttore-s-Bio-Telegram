// Animazioni
window.addEventListener("load", () => {
  if (typeof gsap !== 'undefined') {
    gsap.from(".neon-text", { opacity: 0, y: 50, duration: 1, ease: "power4.out" });
    gsap.from(".subtitle", { opacity: 0, y: 30, duration: 1, ease: "power4.out", delay: 0.2 });
    gsap.from(".loader", { opacity: 0, scale: 0.5, duration: 0.8, ease: "power4.out", delay: 0.4 });
    gsap.from(".share-button", { opacity: 0, y: 30, duration: 0.8, ease: "power4.out", delay: 0.6 });
  }
});

// Countdown
const countdownElement = document.getElementById('countdown');
let timeLeft = 10000000000;
const countdownInterval = setInterval(() => {
  timeLeft--;
  countdownElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    countdownElement.textContent = "0";
  }
}, 1000);

// Toggle Tema
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// Accessibilità
document.querySelector(".theme-toggle").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    document.body.classList.toggle("light-theme");
  }
});

document.querySelector(".share-button").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    window.location.href = document.querySelector(".share-button").href;
  }
});