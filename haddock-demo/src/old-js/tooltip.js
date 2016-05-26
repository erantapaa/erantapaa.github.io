var typed_spans;     // will be loaded dynamically
var span_stack = []  // stack of spans
var current_tooltip; // currently displayed tooltip
var tooltip_xy;      // last location of the display tooltip

// remove_type_span
// grow_type_span
// shrink_type_span
// update_span_dom
// push_type_span ???

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

function grow_type_span() {
  if (span_stack.length < 1) return

  var s = grow_span(span_stack[0])
  if (s) {
    span_stack.unshift(s)
    update_span_dom(s)
  } else {
    console.log("span not growable")
  }
}

function remove_type_span() {
  span_stack = []
  tooltip_remove()
  simple_unhighlight()
}

function update_span_dom(sp, elt) {
  highlight_span(sp)
  tooltip_display(sp[4], elt)
  console.log("type:", sp[4])
  console.log("span_stack:", span_stack)
}

