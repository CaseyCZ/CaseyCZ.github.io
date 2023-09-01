// Funkce pro přepínání nočního režimu
function toggleNightMode() {
  document.body.classList.toggle('night-mode');
}

document.addEventListener('DOMContentLoaded', function () {
  const nightModeButton = document.getElementById('nightModeButton');
  nightModeButton.addEventListener('click', toggleNightMode);
});
// Funkce pro otevření/zavření menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show-menu');
}

// Přidání posluchače události pro zobrazení/skrytí menu po kliknutí na ikonu hamburger menu
const hamburgerIcon = document.querySelector('.hamburger-icon');
hamburgerIcon.addEventListener('click', toggleMenu);
