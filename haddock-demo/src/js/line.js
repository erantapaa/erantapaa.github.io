// module line

#include dom.js
#include util.js
  // needed for contains

// locate_line(elt) : (lineno, mincol, maxcol, elt)
//
// at_line_start(elt) : string
// at_line_start_int(elt) : int
//
// grow_span *  -- uses the globals
// show_line_spans *
//
// find_line(lineno) : elt
// count_newlines(str) : int
// count_newlines_elt(elt) : int
// is_comment_span(elt) : bool
// extract_line ***
//
// simple_highlight(line, lpos, rpos)
// simple_unhighlight() 
//
// east_for_line(lineno)
// east_point_for_line(lineno)
//
// elts_for_line(lineeno) : [ elt ]
//
// is_comment_span(elt)
//
// locate which line a node is on

function locate_line(elt) {
  var found
  var initlen = text_content_length(elt)
  var textlen = 0
  var count = 10000
  var wentup = false

  while (count > 0 && elt) {
    count = count - 1
    // console.log("at", elt)
    if (elt.nodeType == 3) {
      textlen += text_content_length(elt)
    } else if (found = at_line_start(elt)) {
      break;
    } else if (!wentup) {
      textlen += text_content_length(elt)
    }
    wentup = false
    var next = elt.previousSibling
    if (!next) {
      next = elt.parentNode
      wentup = true
      if (!next || next == elt) {
        break
      }
    }
    elt = next
  }
  if (found) {
    var minCol = textlen - initlen + 1
    var maxCol = textlen + 1
    return [found, minCol, maxCol, elt]
  } else {
    return
  }
}

function at_line_start(elt) {
  if (elt.tagName == "A") {
    var name = elt.getAttribute("name")
    if (name) {
      var m = name.match(/^line-(\d+)/)
      if (m) {
        return m[1]
      }
    }
  }
  return 0
}

function at_line_start_int(elt) {
  var r = at_line_start(elt)
  if (r) {
    return parseInt(r, 10)
  } else {
    return 0
  }
}

// return the <a name="line-..."> element
function find_line(lineno) {
  var q = "a[name=line-" + lineno + ']'
  var elt = document.querySelector(q)
  return elt
}

// return the start and end nodes on a line for text positions [lpos,rpos]
function extract_line(lineno, lpos, rpos) {
  var elt = find_line(lineno)
  var pos = 0
  var start, end;
  var count = 2000
  while (count-- > 0 && elt) {
    var len = text_content_length(elt)
    // console.log("before, pos:", pos, "len:", len)
    if (pos+len < lpos) {
      elt = elt.nextSibling
      pos += len
      continue
    }
    // start collecting
    start = elt
    while (elt) {
      end = elt
      var len = text_content_length(elt)
      if (pos+len < rpos) {
        pos += len
        elt = elt.nextSibling
        continue
      }
      break
    }
    break;
  }
  return [start, end]
}

function simple_highlight(lineno, lpos, rpos) {
  var start_end = extract_line(lineno, lpos, rpos)
  var start = start_end[0]
  var end = start_end[1]
  var e = start
  while (e) {
    e.className += " highlighted"
    if (e == end) break
    e = e.nextSibling
  }
}

function simple_unhighlight() {
  var nodes = document.getElementsByClassName("highlighted")
  var len = nodes.length
  var arr = []
  for (var i = 0; i < len; i++) {
    arr.push(nodes[i])
  }
  for (var i = 0; i < len; i++) {
    arr[i].className = arr[i].className.replace(/ *highlighted */,'')
  }
}

// return the "east" point of a specific element
function east_for_line(lineno) {
  var elt = find_line(lineno)
  if (elt) {
    var bb = elt_offset(elt)
    console.log("offset for line", lineno, ":", bb)
  } else {
    console.log("line not found:", lineno)
  }
}

function elts_for_line(lineno) {
  var start = find_line(lineno)

  var c = new Cursor()
  c.goto_line(lineno)

  var count = 1000
  var elts = []
  while (c.elt && (count > 0) && (c.lineno == lineno)) {
    count = count - 1
    elts.push(c.elt)
    c.advance()
  }
  return elts
}

function east_point_for_line(lineno) {
  var right = 0
  var middle = 0
  elts = elts_for_line(lineno)
  var bb = elt_offset( elts[elts.length-1] )
  right = bb.left + bb.width
  middle = bb.top + bb.height/2
  return [ Math.floor(right), Math.floor(middle) ]
}

function is_comment_span(elt) {
  return contains(elt.className , "hs-comment")
}

function count_newlines(txt) {
  return (txt.match(/\n/g)||[]).length 
}

function count_newlines_elt(elt) {
  if (elt) {
    var txt = text_content(elt)
    return (txt.match(/\n/g)||[]).length 
  }
  return 0
}

