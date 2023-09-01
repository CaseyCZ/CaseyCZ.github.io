// script.js
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const nightModeButton = document.getElementById('nightModeButton');
    nightModeButton.addEventListener('click', toggleNightMode);
  });
  // Získejte odkaz na hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');

// Získejte odkaz na navigační menu
const navLinks = document.querySelector('.nav-links');

// Přidejte posluchače události pro kliknutí na hamburger menu
hamburgerMenu.addEventListener('click', () => {
  // Přepněte třídu 'show-menu' pro navigační menu
  navLinks.classList.toggle('show-menu');
});

// Přidejte posluchače události pro zavření menu po kliknutí na odkaz (volitelné)
const navLinksArray = navLinks.querySelectorAll('.nav-link');
navLinksArray.forEach((link) => {
  link.addEventListener('click', () => {
    // Odeberte třídu 'show-menu' z navigačního menu po kliknutí na odkaz
    navLinks.classList.remove('show-menu');
  });
});