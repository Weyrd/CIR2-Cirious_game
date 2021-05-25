$(document).ready(function() {
  var intro = new Audio('assets/audio/nier.mp3');
  setTimeout(function() {
    intro.play();
  }, 2500);

  setTimeout(function() {
    window.location.href = ".."
  }, 32000) //time
})