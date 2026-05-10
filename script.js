const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});


const playlistTrack = document.getElementById('playlistTrack');
const playlistPrev = document.getElementById('playlistPrev');
const playlistNext = document.getElementById('playlistNext');

function scrollPlaylist(direction) {
  if (!playlistTrack) return;
  const amount = playlistTrack.clientWidth + 14;
  playlistTrack.scrollBy({
    left: direction * amount,
    behavior: 'smooth'
  });
}

playlistPrev?.addEventListener('click', () => scrollPlaylist(-1));
playlistNext?.addEventListener('click', () => scrollPlaylist(1));

const filmShots = document.querySelectorAll('.film-shot');

if (filmShots.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Film photo preview');
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close preview">
      <i class="ri-close-line"></i>
    </button>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }

  filmShots.forEach((shot) => {
    shot.addEventListener('click', (event) => {
      event.preventDefault();
      const image = shot.querySelector('img');
      if (!image || !lightboxImage) return;
      lightboxImage.src = shot.getAttribute('href') || image.src;
      lightboxImage.alt = image.alt || 'Film photo preview';
      lightbox.classList.add('open');
    });
  });

  closeButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}
