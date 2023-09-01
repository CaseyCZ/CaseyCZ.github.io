// script.js
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const nightModeButton = document.getElementById('nightModeButton');
    nightModeButton.addEventListener('click', toggleNightMode);
  });