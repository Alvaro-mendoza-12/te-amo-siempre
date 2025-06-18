// Corazones flotantes
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (2 + Math.random() * 3) + 's';
  heart.style.opacity = 0.7 + Math.random() * 0.3;
  document.getElementById('hearts-container').appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 600);

// Estilos para corazones flotantes
const style = document.createElement('style');
style.innerHTML = `
.floating-heart {
  position: absolute;
  bottom: -40px;
  font-size: 2.2rem;
  color: #e75480;
  animation: floatUp 4s linear forwards;
  pointer-events: none;
  left: 50vw;
  will-change: transform, opacity;
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-100vh) scale(1.3); opacity: 0; }
}
`;
document.head.appendChild(style);

// Dibuja corazones con texto
function heartSymbol() {
  return Math.random() > 0.5 ? '💖' : '❤️';
}

// Modifica el contenido de los corazones
const observer = new MutationObserver(() => {
  document.querySelectorAll('.floating-heart').forEach(h => {
    if (!h.innerHTML) h.innerHTML = heartSymbol();
  });
});
observer.observe(document.getElementById('hearts-container'), { childList: true });

// Botón "Volver a intentarlo juntos"
document.getElementById('try-again-btn').onclick = function() {
  const msg = document.getElementById('special-message');
  msg.textContent = 'Gracias por darme otra oportunidad. Prometo cuidar de ti y de nuestro amor 💑✨';
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 5000);
};

// Modal para mostrar imagen o video especial
const mediaModal = document.getElementById('media-modal');
const modalMedia = document.getElementById('modal-media');
const closeModal = document.querySelector('.close-modal');

const mediaOptions = [
  { type: 'img', src: 'img/img 2.jpg' },
  { type: 'img', src: 'img/img 3.jpg' },
  { type: 'img', src: 'img/img 4.jpg' },
  { type: 'video', src: 'img/Video de WhatsApp 2025-06-18 a las 13.24.59_d5eacd5f.mp4' },
  { type: 'video', src: 'img/Video de WhatsApp 2025-06-18 a las 13.25.04_dd6e5095.mp4' }
];

function showModalMedia(media) {
  modalMedia.innerHTML = '';
  if (media.type === 'img') {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = 'Recuerdo especial';
    modalMedia.appendChild(img);
  } else if (media.type === 'video') {
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.autoplay = true;
    video.style.maxHeight = '60vh';
    modalMedia.appendChild(video);
  }
  mediaModal.classList.remove('hidden');
}

closeModal.onclick = () => {
  mediaModal.classList.add('hidden');
  modalMedia.innerHTML = '';
};

window.onclick = function(event) {
  if (event.target === mediaModal) {
    mediaModal.classList.add('hidden');
    modalMedia.innerHTML = '';
  }
};

// Botón "Te amo ❤️" ahora muestra imagen o video aleatorio
const loveBtn = document.getElementById('love-btn');
loveBtn.onclick = function() {
  const msg = document.getElementById('special-message');
  msg.innerHTML = '¡Te amo con todo mi corazón! <span style="font-size:2rem;">💖</span>';
  msg.classList.remove('hidden');
  // Animación especial de corazones
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 100);
  }
  setTimeout(() => msg.classList.add('hidden'), 2000);
  // Mostrar modal con imagen o video aleatorio
  setTimeout(() => {
    const randomMedia = mediaOptions[Math.floor(Math.random() * mediaOptions.length)];
    showModalMedia(randomMedia);
  }, 1200);
};

// Galería: al hacer clic en una imagen o video, mostrar en modal
[...document.querySelectorAll('.gallery-img')].forEach((img, i) => {
  img.onclick = () => showModalMedia(mediaOptions[i]);
});
[...document.querySelectorAll('.gallery-video')].forEach((vid, i) => {
  vid.onclick = () => showModalMedia(mediaOptions[3 + i]);
});

// Música de fondo: autoplay en móviles
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  // Para algunos navegadores móviles, el usuario debe interactuar primero
  const playMusic = () => {
    audio.play().catch(()=>{});
    window.removeEventListener('touchstart', playMusic);
    window.removeEventListener('click', playMusic);
  };
  window.addEventListener('touchstart', playMusic);
  window.addEventListener('click', playMusic);
});

// Mostrar carta automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  // Mostrar carta al inicio sin fondo oscuro
  modalMedia.innerHTML = `
    <div class=\"letter-card\">\n      <div class=\"letter-title\">Para ti, mi amor 💌</div>\n      <div>\n        Gracias por estar en mi vida, por cada sonrisa, cada abrazo y cada momento compartido.<br><br>\n        Eres mi inspiración para ser mejor cada día. Quiero construir contigo recuerdos hermosos, aprender de los errores y crecer juntos.<br><br>\n        Te amo más de lo que las palabras pueden expresar, y siempre lucharé por nuestro amor.\n      </div>\n      <div class=\"letter-footer\">Con todo mi corazón,<br>Tu persona especial 💖</div>\n    </div>\n  `;
  mediaModal.classList.remove('hidden');
  mediaModal.classList.add('no-bg');
  closeModal.classList.add('hide-x');

  // Permitir cerrar la carta haciendo clic en cualquier parte
  mediaModal.onclick = () => {
    mediaModal.classList.add('hidden');
    modalMedia.innerHTML = '';
    closeModal.classList.remove('hide-x');
    mediaModal.classList.remove('no-bg');
    mediaModal.onclick = null;
  };

  // Cartita romántica desde el botón
  const letterBtn = document.querySelector('.gallery-letter-btn');
  if (letterBtn) {
    letterBtn.onclick = () => {
      modalMedia.innerHTML = `
        <div class=\"letter-card\">\n          <div class=\"letter-title\">Para ti, mi amor 💌</div>\n          <div>\n            Gracias por estar en mi vida, por cada sonrisa, cada abrazo y cada momento compartido.<br><br>\n            Eres mi inspiración para ser mejor cada día. Quiero construir contigo recuerdos hermosos, aprender de los errores y crecer juntos.<br><br>\n            Te amo más de lo que las palabras pueden expresar, y siempre lucharé por nuestro amor.\n          </div>\n          <div class=\"letter-footer\">Con todo mi corazón,<br>Tu persona especial 💖</div>\n        </div>\n      `;
      mediaModal.classList.remove('hidden');
      closeModal.classList.remove('hide-x');
    };
  }

  // Botón de pregunta especial
  const askBtn = document.getElementById('ask-again-btn');
  if (askBtn) {
    askBtn.onclick = () => {
      modalMedia.innerHTML = `
        <div id='ask-modal-content'>
          <div id='ask-question'>¿Lo intentamos de nuevo? <br> Dame una oportunidad más 🥺</div>
          <div class='ask-btns'>
            <button id='ask-yes'>Sí 💖</button>
            <button id='ask-no'>No 😢</button>
          </div>
        </div>
      `;
      mediaModal.classList.remove('hidden');
      closeModal.classList.remove('hide-x');
      // Botón Sí
      document.getElementById('ask-yes').onclick = () => {
        modalMedia.innerHTML = `<div class='letter-card'><div class='letter-title'>¡Gracias por darme otra oportunidad! 💖</div><div>Prometo hacerte feliz y cuidar de nuestro amor cada día.</div></div>`;
      };
      // Botón No (se mueve)
      const noBtn = document.getElementById('ask-no');
      noBtn.onclick = (e) => {
        noBtn.classList.add('moving');
        // Mover a una posición aleatoria dentro del contenedor
        const parent = noBtn.parentElement;
        const maxX = parent.offsetWidth - noBtn.offsetWidth;
        const maxY = parent.offsetHeight - noBtn.offsetHeight;
        const randX = Math.random() * maxX - maxX/2;
        const randY = Math.random() * maxY - maxY/2;
        noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
        setTimeout(() => noBtn.classList.remove('moving'), 300);
        e.preventDefault();
        e.stopPropagation();
      };
    };
  }
}); 