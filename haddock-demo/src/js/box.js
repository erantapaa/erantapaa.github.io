// module box

// create_box
// remove_boxes
// mark_line_end
// mark_all_lines

function create_box(left, top, width, height, color) {
  var frag = document.createDocumentFragment()
  var div = document.createElement("div")
  div.className = "marker"
  if (!color) {
    color = "pink"
  }
  var style = [ "left:" + left + 'px', "top:" + top + 'px', 
                "width:" + width + 'px', "height:" + height + 'px',
                "background-color:" + color, 'position:absolute',
                "opacity:0.6"
              ].join(";")
   
  div.style.cssText = style
  frag.appendChild(div)
  document.body.appendChild(frag)
}

function remove_boxes() {
  var elts = document.getElementsByClassName("marker");
  while (elts[0]) {
    elts[0].parentNode.removeChild(elts[0])
  }
}

function mark_all_lines(info) {
  var nlines = info.line_top.length
  for (var i = 1; i < nlines; i++) {
    mark_line_end(info, i)
  }
}

function mark_line_end(info, lineno) {
  var top = info.line_top[lineno]
  var left = info.line_px_width[lineno]
  var width = 10
  var height = info.line_height[lineno]
  create_box(left, top, width, height)
}

