// Funkce pro přepínání nočního režimu
function toggleNightMode() {
  document.body.classList.toggle('night-mode');
}

document.addEventListener('DOMContentLoaded', function () {
  const nightModeButton = document.getElementById('nightModeButton');
  nightModeButton.addEventListener('click', toggleNightMode);
});
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}