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

