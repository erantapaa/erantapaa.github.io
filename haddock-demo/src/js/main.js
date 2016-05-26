#include span.js
#include analyze.js
#include placement.js 
#include test_placement.js

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

