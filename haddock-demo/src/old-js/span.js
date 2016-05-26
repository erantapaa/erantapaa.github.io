// module span.js

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
