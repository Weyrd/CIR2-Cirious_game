var level = [];

function responsiveLevel() {//resize automaticly the matrice to the windows size
  if ($(window).width() / $(window).height() * 95 / 80 < level[0].length / level.length) {
    cellSize = 95 / level[0].length
    unit = 'vw'
  }
  else {
    cellSize = 80 / level.length
    unit = 'vh'
  }
  // Creating the grid template
  $("#wrapper").css("grid-template", "repeat(" + level.length + ", " + cellSize + unit + ") / repeat(" + level[0].length + ", " + cellSize + unit + ")")
}



function display_level() {
  $("#wrapper").empty() //destroy the page

  for (x = 0; x < level.length; x++) {
    for (y = 0; y < level[0].length; y++) {

          block = level[x][y]["block"]
          $("#wrapper").append("<div id='" + x + "-" + y + "' class='block-" + block + "'></div>")

    }
  }
  $("#wrapper").css("grid-template", "repeat(" + level.length + ", 60px) / repeat(" + level[0].length + ", 60px)")

  responsiveLevel();
}


function create_matrix(x, y) {
    level = Array(x).fill().map(_ => Array(y).fill({"block" : 1}))
    for (var i = 0; i < x; i++) {
        level[i][0] = {"block" : 0}
        level[i][y - 1] = {"block" : 0}
    }
    for (var i = 0; i < y; i++) {
        level[0][i] = {"block" : 0}
        level[x - 1][i] = {"block" : 0}
    }
    display_level()

}



$(document).ready(function () {
  create_matrix(30,30)

  $(window).resize(function () {
    responsiveLevel();
  })

})
