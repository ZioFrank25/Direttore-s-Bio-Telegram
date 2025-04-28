// Seleziona tutti i pulsanti che aprono i popup
const openPopupButtons = document.querySelectorAll('.open-popup');

// Seleziona tutti i popup
const popups = document.querySelectorAll('.popup');

// Apertura dei popup
openPopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const popup = document.getElementById(`popup-${targetId}`);
    if (popup) {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});

// Chiusura dei popup
popups.forEach(popup => {
  const closeBtn = popup.querySelector('.close-popup');

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Effetto magnetico sui pulsanti
openPopupButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});