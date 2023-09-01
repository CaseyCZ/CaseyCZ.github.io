// script.js
function toggleNightMode() {
    // Zde umístěte logiku vašeho event handleru
    let isNightMode = !isNightMode;
    document.body.classList.toggle('night-mode');
  }
  // script.js
document.addEventListener('DOMContentLoaded', function () {
    const nightModeButton = document.getElementById('nightModeButton');
    nightModeButton.addEventListener('click', toggleNightMode);
  });
  