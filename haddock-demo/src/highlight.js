// module span
//
// module cursor

// module line

// module dom

// elt_text_content
// text_content
// text_content_length
// index_of_child
// first_text_sibling
// elt_offset
// first_body_pre

function text_content(elt) {
  return elt_text_content(elt)
}

function elt_text_content(elt) {
  if (elt) {
    var txt = elt.textContent
    if (txt != null) {
      return txt
    }
  }
  return ""
}

function text_content_length(elt) {
  if (elt) {
    var t = elt.textContent
    if (t) {
      return t.length
    }
  }
  return 0
}

function index_of_child(elt) {
  var i = 0
  while (elt) {
    elt = elt.previousSibling
    i = i + 1
  }
  return i
}

function first_text_sibling(elt) {
  while (elt) {
    if (elt.nodeType == 3) {
      return elt;
    }
    elt = elt.nextSibling
  }
  return
}

function elt_offset(elt) {
  var obj = elt.getBoundingClientRect();
  return {
    left: obj.left + document.body.scrollLeft,
    top: obj.top + document.body.scrollTop,
    width: obj.width,
    height: obj.height
  };
}

function first_body_pre() {
  // return the first <pre> child node of the body
  var body = document.body

  var node = body.firstChild
  while (node && (node.tagName != "PRE")) {
    node = node.nextSibling
  }
  return node
}

// module util

function contains(larger, smaller) {
  return larger.indexOf(smaller) >= 0
}

function chomp(str) {
  if (str.slice(-1) == "\n") {
    return str.substring(0, str.length-1)
  } else {
    return str
  }
}

function ends_with_newline(text) {
  return (text.slice(-1) == "\n")
}

// a simplistic version of computing x^n
function pow(x,n) {
  if (n <= 0) { return 1 }
  if (n <= 1) { return x }
  return (x*x*pow(x,n-2))
}

// simplistic numeric formating
function fmt(x, d) {
  var tens = pow(10,d)
  var s = '' + Math.floor(x*tens)
  return s.substr(0, s.length-d) + '.' + s.substr(s.length-d)
}

// show_object
function show_object(obj) {
  var s = ""
  for (var x in obj) {
    s += (", " + x + ": " + obj[x])
  }
  return s.substring(2)
}

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


// A cursor to keep track of line and column positions
function Cursor() {
  this.lineno = undefined  // current line number
  this.column = undefined  // current column
  this.elt = undefined

  this.goto_line = function(n) {
    this.elt = find_line(n)
    this.lineno = n
    this.column = 0
    if (this.elt) { return true } else { return false }
  }

  // return the current left position
  this.lpos = function () {
    return this.column
  }

  // return the current right position
  this.rpos = function () {
    var len = this.elt.textContent.length
    return this.column + len
  }

  // advance - returns false if at end
  this.advance = function () {
    var len = this.elt.textContent.length
    this.elt = this.elt.nextSibling
    if (this.elt) {
      var ln = at_line_start(this.elt)
      if (ln) {
        this.lineno = ln
        this.column = 0
      } else {
        this.column += len
      }
      return true
    } else {
      return false
    }
  }
}


// highlight_span(span) ???
// visit_span(span, f) 
// inside(span, span) : bool
// strictly_inside(span, span) : bool
// same_span(span, span) : bool
// before(span, span) : bool
// after(span, span) : bool
// innermost_span([span]) : span
// grow_span(span, [span[) : span

function highlight_span(span) {
  visit_span(span, function (e,ln,lpos,rpos) {
    if (!(e.className && (e.className.indexOf("highlighted") >= 0))) {
      e.className = e.className + " highlighted"
    }
  });
}

function visit_span(span, f) {
  var start_line = span[0]
  var start_col = span[1]
  var end_line = span[2]
  var end_col = span[3]
  var c = new Cursor()
  c.goto_line(start_line)

  // advance to start position
  var count = 1000
  while (c.elt && (count > 0)) {
    count = count - 1
    if (before(c.lineno, c.rpos()+1, start_line, start_col)) {
      c.advance()
    } else {
      // console.log("breaking at rpos:", c.rpos()+1, "start_col:", start_col)
      break
    }
  }

  while (c.elt) {
    var lpos = c.lpos(), rpos = c.rpos(), ln = c.lineno
    // console.log("lpos:", lpos, "end_col:", end_col)
    if (after(ln, lpos+1, end_line, end_col)) break
    f(c.elt, c.lineno, lpos, rpos)
    c.advance()
  }
}

function inside(s, t) {
  return before(t[0],t[1],s[0],s[1]) && after(t[2],t[3],s[2],s[3])
}

function strictly_inside(s, t) {
  return inside(s, t) && !same_span(s,t)
}

function same_span(s,t) {
  return (s[0] == t[0]) && (s[1] == t[1]) && (s[2] == t[2]) && (s[3] == t[3])
}

function before(r,c, s,t) {
  return  (r < s) || ((r == s) && (c <= t))
}

function after(r,c, s,t) {
  return  (r > s) || ((r == s) && (c >= t))
}

function innermost_span(spans) {
  if (spans.length > 0) {
    var best = spans[0], besti = 0

    for (var i = 1; i < spans.length; i++) {
      if (inside(spans[i], best)) {
        best = spans[i]
        besti = i
      }
    }
    for (var i = 0; i < spans.length; i++) {
      if (i == besti) {
        console.log("best ->", spans[i])
      } else {
        console.log("       ", spans[i])
      }
    }
    return best
  } else {
    console.log("innermost_span - no spans")
  }
}

// find the next larger span
function grow_span(span, span_list) {
  var best
  for (var i = 0; i < span_list.length; i++) {
    var t = span_list[i]
    if (strictly_inside(span, t)) {
      if (!best || inside(t, best)) {
        best = t
      }
    }
  }
  return best
}

// module analyze


// analyze_lines

function make_comment_block(lineno, content, p1, p2) {
  var blk = {}
  blk.lineno = lineno

  // assume p1 just contains a new line

  var p1_bbox = elt_offset(p1)
  var p2_bbox = elt_offset(p2)

  var bbox = {}
  bbox.top    = Math.min(p1_bbox.top, p2_bbox.top)
  bbox.left   = Math.min(p1_bbox.left, p2_bbox.left)
  bbox.width  = Math.max(p1_bbox.width, p2_bbox.width)
  bbox.height = p2_bbox.height
  blk.bbox = bbox

  var nchars = []
  var lines = chomp(content).split("\n")

  for (var i = 0; i < lines.length; i++) {
    nchars.push( lines[i].length )
  }
  blk.nchars = nchars
  return blk
}

function analyze_lines() {
  // determine the east point for each line

  var comments = [];      // pairs of [lineno, char-length] for each comment line
  var line_px_width = []; // width of each line in pixels
  var line_top = [];      // top positions of each line
  var line_chars = [];
  var line_height = [];
  var is_comment = [];

  var start = first_body_pre().firstChild

  var lineno
  var cnt = 100000
  var elt = start
  var nchars = ""
  while (elt && (cnt-- > 0)) {
    if (lineno = at_line_start_int(elt)) {
      var p1 = elt.previousSibling
      if (p1) {
        var p2 = p1.previousSibling
        if (p2 && is_comment_span(p2)) {
          var p3 = p2.previousSibling
          var block_lineno
          if (p3 && (block_lineno = at_line_start_int(p3))) {
            var content = elt_text_content(p2) + elt_text_content(p1)
            var blk = make_comment_block(block_lineno, content, p1, p2)
            comments.push(blk)
            nchars = ""
            elt = elt.nextSibling
            continue
          } else if (p2 == start) {
            // dump_elt("start p1", p1)
            // dump_elt("start p2", p2)
            block_lineno = 1
            var content = elt_text_content(p2) + elt_text_content(p1)
            var blk = make_comment_block(block_lineno, content, p1, p2)
            comments.push(blk)
            nchars = ""
            elt = elt.nextSibling
            continue
          }
        }

        var trace
        if (p2 && at_line_start(p2)) {
          trace = true
        }

        var bbox = elt_offset(p1)
        line_chars[lineno-1]    = chomp(nchars).length
        line_px_width[lineno-1] = bbox.left + bbox.width
        line_top[lineno-1]      = bbox.top
        line_height[lineno-1]   = bbox.height

        nchars = ""
        elt = elt.nextSibling
        continue
      }
    }
    nchars = nchars + text_content(elt)
    elt = elt.nextSibling
  }
  // Process each comment

  for (var i = 0; i < comments.length; i++) {
    var blk = comments[i]
    var base_lineno = blk.lineno
    var height      = blk.bbox.height
    var top         = blk.bbox.top
    var line_count  = blk.nchars.length 
    var avg_height  = height / line_count

    /*
    console.log("comment block, start lineno:", base_lineno,
                "lines:", line_count,
                "height:", height,
                "avg_height:", avg_height,
                "blk.nchars:", blk.nchars
    )
    */

    for (var j = 0; j < blk.nchars.length; j++) {
      lineno = base_lineno + j
      line_chars[lineno]    = blk.nchars[j]
      line_px_width[lineno] = 8*blk.nchars[j]
      line_top[lineno]      = top + j*avg_height
      line_height[lineno]   = avg_height
      is_comment[lineno]    = true
    }
  }
  var info = {}
  info.line_chars = line_chars
  info.line_px_width = line_px_width
  info.line_top = line_top
  info.line_height = line_height
  info.nlines = line_chars.length-1 // last line number
  info.is_comment = is_comment
  return info
}

// analyze util and debugging functions

function dump_text(label, text) {
  var nlines = text.split("\n").length

  var t = text.replace(/[^\n]+/g, "---")
  t = t.replace(/\n/g, 'N')

  var mlines = chomp(text).split("\n").length

  console.log(label, t, "split length:", nlines, "mlines:", mlines)
}

function dump_elt(label, elt) {
  var bbox = elt_offset(elt)
  var lines = count_newlines_elt( elt )
  console.log(label, "lines:", lines, "left:", bbox.top, " top:", bbox.top, "width:", bbox.width, "height:", bbox.height, elt)
}

function show_info(info) {
  for (var i = 1; i < info.line_chars.length; i++) {
    console.log(i, "top:",      info.line_top[i],
                   "px_width:", info.line_px_width[i]
    )
  }
}

function find_block_comments() {
  // find hs-comments which contains a newline
  var found = []
  var comments = document.getElementsByClassName("hs-comment")
  for (var i = 0; i < comments.length; i++) {
    var content = elt_text_content( comments[i] )
    var lines = content.split("\n")
    if (lines.length > 1) {
      found.push( comments[i] )
    }
  }
  return found
}

function analyze_block_comments() {
  var blocks = find_block_comments()
  for (var i = 0; i < blocks.length; i++) {
    var elt = blocks[i]
    var bbox = elt_offset(elt)
    var content = elt_text_content(elt)
    var lines = content.split("\n").length
    console.log("lines:",   lines,
                 "height:", fmt(bbox.height,1),
                 "avg:",    fmt(bbox.height / lines,1)
    )
  }
}

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

  var trace = true
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

// module test_placement

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


function show_best_placement(info, x, y, bheight, bwidth, delta) {

  var topleft = best_placement(info, x, y, bheight, bwidth, delta)

  var top = topleft.top
  var left = topleft.left
  remove_boxes()
  create_box(left, top, bwidth, bheight)
  create_box(x-5, y-5, 10, 10, "blue")
}


var highlight = function(on) {
	return function () {
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			var that = links[i];

			if (this.href != that.href) {
				continue;
			}

			if (on) {
				that.classList.add("hover-highlight");
			} else {
				that.classList.remove("hover-highlight");
			}
		}
	}
};

var typed_spans;     // will be loaded dynamically
var span_stack = []  // stack of spans
var line_info;       // an info object return from analyze_lines

function handle_keypress(e) {
  var ch = (typeof e.which == "number") ? e.which : e.keyCode
  console.log("got char code:", ch)
  if (ch == 97) {           // 'a'
    grow_type_span()
  } else if (ch == 115) {   // 's'
    shrink_type_span()
  } else if (ch == 113) {   // 'q'
    remove_type_span()
  }
}

function handle_click(e) {
  var x = e.clientX, y = e.clientY, elt = document.elementFromPoint(x,y)
  if (!elt) {
    console.log("elt is null")
    return false
  }

  console.log("page x,y:", e.pageX, e.pageY)

  var loc = locate_line(elt)
  if (!loc) {
    console.log("unable to determine location")
    return
  }
  var found = loc[0], lpos = loc[1], rpos = loc[2]

  e.preventDefault()
  console.log("hit at line:", found, "lpos:", lpos, "rpos:", rpos)
  var spans = find_spans(found, lpos, rpos)

  if (spans.length == 0) {
    console.log("no spans found")
    remove_type_span()
    return
  }

  var s = innermost_span(spans)
  remove_type_span()  // clear any existing span

  if (s) {
    span_stack.unshift(s)

    var tip = create_tooltip(null, s[4])
    var bbox = elt_offset(tip)

    console.log("bbox of tooltip:", show_object(bbox))

    var pos = best_tooltip_position(elt, bbox.width, bbox.height)

    move_tooltip(tip, pos)
    highlight_span(s)                 // span.js
    console.log("type:", s[4])
    console.log("span_stack:", span_stack)
  } else {
    console.log("no span found")
  }
}

function best_tooltip_position(elt, bwidth, bheight) {
  // elt is the element which was clicked
  var bbox = elt_offset(elt)
  var x = bbox.left + bbox.width/2
  var y = bbox.top + bbox.height/2

  if (!line_info) {
    line_info = analyze_lines()
  }

  pos = find_placement(line_info, x, y, bheight, bwidth)
  pos.left += 10
  return pos
}

function grow_type_span() {
  if (span_stack.length < 1) return

  var s = grow_span(span_stack[0], typed_spans) // span.js
  if (s){
    span_stack.unshift(s)
    update_span_dom(s)
  } else {
    console.log("span not growable")
  }
}

function shrink_type_span() {
  if (span_stack.length <= 1) {
    remove_type_span()
    return;
  }
  span_stack.shift()
  var s = span_stack[0]
  simple_unhighlight()
  update_span_dom(s)
}

function remove_type_span() {
  span_stack = []
  remove_tooltip()
  simple_unhighlight()
}

function update_span_dom(sp, tip) {
  // if tip is undef, look for the tootip in the DOM
  highlight_span(sp)                 // span.js
  if (tip) {
    tip.innerHTML = sp[4]
  } else {
    var tips = document.getElementsByClassName('tooltip-container')
    if (tips && tips[0]) {
      tips[0].innerHTML = sp[4]
    }
  }
  console.log("type:", sp[4])
  console.log("span_stack:", span_stack)
}


// create a tool tip at the end of the body
function create_tooltip( topLeft, content ) {
  var frag = document.createDocumentFragment()
      tip = document.createElement("div"),
      bodyNode = document.getElementsByTagName("body")[0];

  frag.appendChild(tip)
  tip.className = "tooltip-container"
  if (topLeft) {
    move_tooltip(tip, topLeft)
  }
  if (content) {
    tip.innerHTML = content
  }
  bodyNode.appendChild(frag)
  return tip
}

function move_tooltip(tip, topLeft) {
  var xpos = topLeft.left
  var ypos = topLeft.top
  tip.style.cssText = 'left:' + xpos + 'px;top:' + ypos + 'px'
}

function remove_tooltip() {
  tip_elt = document.getElementsByClassName("tooltip-container")[0];
  if (tip_elt) {
    var bodyNode = document.getElementsByTagName("body")[0];
    bodyNode.removeChild(tip_elt)
  }
}

// find all spans intersecting a portion of a line.
function find_spans(line, minCol, maxCol) {
  if (!typed_spans) {
    console.log("typed_spans not loaded")
    return
  }
  var matches = [], len = typed_spans.length

  for (var i = 0; i < len; i++) {
    var span = typed_spans[i]
    if (!before(span[0], span[1], line, minCol)) continue
    if (!after(span[2], span[3], line, maxCol)) continue
    matches.push(span)
  }
  return matches
}

function leaf_name(path) {
  return path.replace(/^.*(\\|\/|\:)/, '');
}

function load_script(url) {
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= url;
   head.appendChild(script);
}

function initialize() {
  // called when the DOM is ready
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var xdef = links[i].getAttribute("xdef")
        if (xdef) {
      links[i].title = xdef
    } else {
      links[i].onmouseover = highlight(true);
      links[i].onmouseout = highlight(false);
    }
  }
  console.log("done with the anchors");

  // Determine the module name form the page url

  var href = window.location.href
  var modname = leaf_name(href)
  modname = modname.replace(/\.html(#.*)?$/,'')
  var src_url = "type-spans-" + modname + ".js"

  console.log("loading", src_url)
  load_script(src_url)

  // set up event handlers
  document.onclick = function (e) { handle_click(e); return false }
  document.onkeypress = function (e) { handle_keypress(e); return false }
};

window.onload = initialize;

