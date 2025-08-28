document.addEventListener('DOMContentLoaded', () => {
    const door1Btn = document.getElementById('door1');
    const door2Btn = document.getElementById('door2');
    const door3Btn = document.getElementById('door3');
    const generalBtn = document.getElementById('general');
    const status = document.getElementById('status');
    const clickSound = document.getElementById('click-sound');
    const activeSound = document.getElementById('active-sound');

    const activateButton = (button, wrapper, message) => {
        clickSound.play();
        activeSound.play();
        wrapper.classList.add('active');
        button.classList.add('active');
        status.textContent = message;
        status.style.opacity = 1;
        setTimeout(() => {
            wrapper.classList.remove('active');
            button.classList.remove('active');
            status.style.opacity = 0;
            setTimeout(() => {
                status.textContent = 'Premi un pulsante';
                status.style.opacity = 1;
            }, 300);
        }, 1500);
    };

    door1Btn.addEventListener('click', () => activateButton(door1Btn, door1Btn.parentElement, 'Porta 1 attivata'));
    door2Btn.addEventListener('click', () => activateButton(door2Btn, door2Btn.parentElement, 'Porta 2 attivata'));
    door3Btn.addEventListener('click', () => activateButton(door3Btn, door3Btn.parentElement, 'Porta 3 attivata'));
    generalBtn.addEventListener('click', () => {
        clickSound.play();
        activeSound.play();
        [door1Btn, door2Btn, door3Btn, generalBtn].forEach((btn, index) => {
            btn.parentElement.classList.add('active');
            btn.classList.add('active');
        });
        status.textContent = 'Tutte le porte attivate';
        status.style.opacity = 1;
        setTimeout(() => {
            [door1Btn, door2Btn, door3Btn, generalBtn].forEach(btn => {
                btn.parentElement.classList.remove('active');
                btn.classList.remove('active');
            });
            status.style.opacity = 0;
            setTimeout(() => {
                status.textContent = 'Premi un pulsante';
                status.style.opacity = 1;
            }, 300);
        }, 1500);
    });
});