function mark_elt(elt) {
  elt.className += " highlighted"
}

function unmark_elt(elt) {
  elt.className = elt.className.replace(/ *highlighted */, '')
}

function foreach(arr, f) {
  var n = arr.length
  for (var i = 0; i < n; i++) {
    f( arr[i] )
  }
}

function contains(larger, smaller) {
  return larger.indexOf(smaller) >= 0
}

function dump_line_elts(lineno) {
  elts = elts_for_line(lineno)
  for (var i = 0; i < elts.length; i++) {
    var e = elts[i]
    var bb = elt_offset(e)
    console.log(i, "width:", Math.floor(bb.width), "left:", Math.floor(bb.left), "top:", Math.floor(bb.top), e)
  }
}

function mark_line(lineno) {
  elts = elts_for_line(lineno)
  for (var i = 0; i < elts.length; i++) {
    mark_elt( elts[i] )
  }
}

function show_line_spans(lineno) {
  var text = extract_line(lineno)
  var spans = []
  for (var i = 0; i < typed_spans.length; i++) {
    var s = typed_spans[i]
    if (s[0] == lineno && s[2] == lineno) {
      spans.push(s)
    }
  }
  console.log("spans found:", spans.length)
  for (var i = 0; i < spans.length; i++) {
    var s = spans[i]
    console.log(s, "-->", text.substring(s[1]-1, s[3]-1) )
  }
}
