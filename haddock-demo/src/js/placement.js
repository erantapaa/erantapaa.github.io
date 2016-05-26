// module placement

// ycoord_to_line
// best_placement

function ycoord_to_line(info, y) {
  // return the line number for a y coordinate
  var first = 1, count = info.nlines - 1
  while (count > 0) {
    var step = Math.floor(count / 2)
    var it = first + step
    if (info.line_top[it] + info.line_height[it] <=  y) {
      first = it+1
      count = count - (step+1)
    } else {
      count = step
    }
  }
  return first
}

function find_placement(info, x, y, bheight, bwidth) {
  var lineno = ycoord_to_line(info, y)
  var start = clip_lineno(info, lineno-10)
  var end = clip_lineno(info, lineno+10)

  var trace = false
  var bestPos, bestScore
  bestScore = 1000000000
  for (var i = start; i <= end; i++) {
    var y0 = line_mid_ycoord(info, i) - bheight/2
    var y1 = y0 + bheight
    var minleft = left_margin3(info, y0, y1)
    var left = Math.max(minleft, x - bwidth / 2)
    var cx = left+bwidth/2
    var cy = (y0+y1)/2
    var score = dist(x, y, cx, cy)
    if (trace) {
      var mstr = "margin("+fmt(y0,1)+","+fmt(y1,1)+") ="
      console.log("i:", i, mstr, fmt(minleft,1), "score:", fmt(score,1))
    }
    if (score < bestScore) {
      bestScore = score
      bestPos = { "top": y0, "left": left }
    }
  }
  return bestPos
}

function dist(x,y,u,v) {
  var dx = x-u
  var dy = Math.abs(y-v)
  return dx*dx+dy*dy*dy  // note dy^3
}

function clip_lineno(info, lineno) {
  return Math.min( Math.max(1, lineno), info.nlines )
}

function line_mid_ycoord(info, lineno) {
  return info.line_top[lineno] + info.line_height[lineno]/2
}

function best_placement(info, x, y, bheight, bwidth, delta) {
  // find the best placement for a tool-tip box
  //
  // let (cx,cy) be the center of the toolbox
  // minimize distance from (x,y) to (cx,cy)

  var lineno = ycoord_to_line(info, y)

  var mid_line = Math.min( Math.max(1, lineno+delta), info.nlines )

  var top = info.line_top[mid_line] + info.line_height[mid_line] / 2 - bheight / 2

  // determine the best position for this value of top_line

  var minleft = left_margin2(info, top, top+bheight)

  var left = Math.max(minleft, x - bwidth / 2)

  return { "top": top, "left": left }
}

function left_margin3(info, y0, y1) {
  // like left_margin3 but ignore comment lines
  var i = ycoord_to_line(info, y0)
  var m = info.is_comment[i] ? 0 : info.line_px_width[i]
  i++
  while (i <= info.nlines && info.line_top[i] <= y1) {
    m = Math.max( m, info.is_comment[i] ? 0 : info.line_px_width[i])
    i++
  }
  return m
}

function left_margin2(info, y0, y1) {
  var i = ycoord_to_line(info, y0)
  var m = info.line_px_width[i]
  i++
  while (i <= info.nlines && info.line_top[i] <= y1) {
    m = Math.max( m, info.line_px_width[i])
    i++
  }
  return m
}

function left_margin(info, lineno, endy) {
  // determine the minimum left margin for a box beginning on
  // on line lineno and ending ay y-coordinate endy

  var m = info.line_px_width[lineno]
  var i = lineno
  while (i <= info.nlines && info.line_top[i] <= endy) {
    m = Math.max( m, info.line_px_width[i] )
    i++
  }
  return m
}

function test_ycoord(info, y) {
  // test locate_line
  var lineno = ycoord_to_line(info, y)
  console.log("for y:", y, "lineno:", lineno)
  var start = Math.max(1, lineno-1)
  var end = Math.min(lineno+1, info.nlines)
  for (var i = start; i <= end; i++) {
    console.log("line:", i, "top:", info.line_top[i],
                  "top+height:", info.line_top[i] + info.line_height[i]
    )
  }
}

