// Funkce pro přepínání nočního režimu
function toggleNightMode() {
  document.body.classList.toggle('night-mode');
}

document.addEventListener('DOMContentLoaded', function () {
  const nightModeButton = document.getElementById('nightModeButton');
  nightModeButton.addEventListener('click', toggleNightMode);
});

// Funkce pro zobrazení/skrytí hamburger menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show-menu');
}

// Získání odkazu na hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');

// Získání odkazu na navigační menu
const navLinks = document.querySelector('.nav-links');

// Přidání posluchače události pro kliknutí na hamburger menu
hamburgerMenu.addEventListener('click', () => {
  toggleMenu();
});

// Přidání posluchače události pro zavření menu po kliknutí na odkaz
const navLinksArray = navLinks.querySelectorAll('.nav-link');
navLinksArray.forEach((link) => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});
