// module test_placement

#include box.js

function show_best_placement(info, x, y, bheight, bwidth, delta) {

  var topleft = best_placement(info, x, y, bheight, bwidth, delta)

  var top = topleft.top
  var left = topleft.left
  remove_boxes()
  create_box(left, top, bwidth, bheight)
  create_box(x-5, y-5, 10, 10, "blue")
}

