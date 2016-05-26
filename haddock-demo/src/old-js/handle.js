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
    update_span_dom(s, elt)
  } else {
    console.log("no span found")
  }
}

var highlight = function (on) {
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

function leafname(path) {
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
  var modname = leafname(href)
  modname = modname.replace(/\.html(#.*)?$/,'')
  var src_url = "type-spans-" + modname + ".js"

  console.log("loading", src_url)
  load_script(src_url)

  // set up event handlers
  document.onclick = function (e) { handle_click(e); return false }
  document.onkeypress = function (e) { handle_keypress(e); return false }
};

window.onload = initialize;

