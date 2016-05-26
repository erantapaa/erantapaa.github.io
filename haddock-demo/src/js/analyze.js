// module analyze

#include util.js

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

