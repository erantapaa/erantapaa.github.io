// module line.js

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

function extract_line(lineno) {
  var q = "a[name=line-" + lineno + ']'
  var elt = document.querySelector(q)
  if (!elt) {
    console.log("line", lineno, "not found")
    return
  }
  elt = elt.nextSibling
  var text = []
  visit_siblings(text, elt)
  return text.join("")
}

function extract_line(lineno, lpos, rpos) {
  var elt = find_line(lineno)
  var pos = 0
  var start, end;
  var count = 20
  while (count > 0 && elt) {
    count = count-1
    var len = elt.textContent.length
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
      var len = elt.textContent.length
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
