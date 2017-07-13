

function html_escape(r) {
  return r.replace(/[\x26\x0A\<>'"]/g,
                     function(r){return"&#"+r.charCodeAt(0)+";"})
}

function make_element(tag, cls) {
  var html = "<" + tag;
  if (cls) {
    html += ' class="' + cls + '"';
  }
  html += ">"
  return html
}

function div_text(cls, text, br) {
  var html = make_element("div", cls) + html_text(text, br)
  return html
}

function html_text(text, br) {
  var html = (text || (text === "0")) ? html_escape(text) : ""
  if (br) {
    html += "<br/>"
  }
  return html
}

function lyrics_to_html(text) {
  var html = html_text(text)
  html = html.replace(/ /g, '&nbsp;')
  return html
}

function chord_html_text(v) {
  var html = html_text( v ) // v.replace(/#/g, '\u266f').replace('b', '\u266F') )
  html = html.replace(/ /g, '&nbsp;')
  return html
}

function fmt_chord_line(parts, nochords, full_lines) {
  if (parts.length == 0) {
    return ""
  }

  if (full_lines && (parts.length == 1)) {
    parts.push('')
  }

  if (parts.length == 1) {
    return lyrics_to_html(parts[0]) + "\n"
  } else if (nochords) {
    lyrics = ""
    for (var i = 0; i < parts.length; i += 2) {
      lyrics += parts[i]
    }
    return lyrics_to_html(lyrics) + "\n"
  } else {
    html = ""
    for (var i = 0; i < parts.length; i++) {
      var v = parts[i]
      if ((i % 2) == 0) {
        html += lyrics_to_html(v)
      } else {
        html += make_element("span", "relc") + make_element("span", "absc") +
                  chord_html_text(v) + "</span></span>"
      }
    }
    return '<div class="chordline">' + html + "</div>"
  }
}

function make_parts(chords, lyrics) {
  var parts = []
  var k = 0
  var prev_chord = 0

  while (chords.length) {
    var m = chords.match(/^(\s*)(\S+)/)
    if (!m) break
    var nspaces = prev_chord + m[1].length
    var ltext = lyrics.substring(k, k+nspaces)

    if (k+nspaces >= lyrics.length) {
      // start of chord is off the page
      var sp = k+nspaces - lyrics.length
      var ctext = " ".repeat(sp) + chords.substring(m[1].length)
      if (ltext.length == 0) {
        if (parts.length) {
          parts[ parts.length-1 ] += ctext
        } else {
          parts.push('')
          parts.push(ctext)
        }
      } else {
        parts.push(ltext)
        parts.push(ctext)
      }
      k += nspaces
      break
    } else {
      parts.push( ltext )
      k += nspaces
      parts.push( m[2] )
      chords = chords.substring(m[0].length)
      prev_chord = m[2].length
    }
  }
  if (k < lyrics.length) {
    parts.push( lyrics.substring(k) )
  }
  return parts
}

function fmt_lyrics_div(div) {
  var text = div.textContent
  text = text.replace(/^\s*\n/, '')
  text = text.replace(/\s*$/, '')
  var lines = text.split(/\r\n|\n|\r/)

  // trim trailing white space
  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s*$/,'')
  }

  var nochords = div.hasAttribute("nochords") ? 1 : 0
  var full_lines = div.hasAttributes("full-lines") ? 1 : 0
  var html = ""
  if (div.hasAttribute("two-line")) {
    for (var i = 0; i < lines.length; i += 2) {
      var chords = lines[i]
      var lyrics = lines[i+1]
      var parts = make_parts(chords, lyrics)
      html += fmt_chord_line(parts, nochords, full_lines)
    }
  } else {
    for (var i = 0; i < lines.length; i++) {
      var txt = lines[i]
      var parts = txt.split(/\[(.*?)\]/)
      html += fmt_chord_line(parts, nochords, full_lines)
    }
  }
  return html
}


// Convert undefined and null to the empty string
function to_string(x) {
  if ((x === null) || (x === undefined)) {
    return ""
  } else {
    return x
  }
}

function get_meta_content(name) {
  var metas = document.getElementsByTagName("meta")
  for (var i = 0; i < metas.length; i++) {
    var m = metas[i]
    var a = m.getAttribute("name")
    if (a === name) {
      return to_string(m.getAttribute("value"))
    }
  }
  return ""
}

function add_link_tag(url) {
  var link = document.createElement("link")
  link.href = url
  link.rel = "stylesheet"
  document.head.appendChild(link)
}

function add_class(element, cls) {
  var c = element.getAttribute("class")
  if (c && c.length) {
    c = cls + " " + c
  } else {
    c = cls
  }
  element.setAttribute("class", c)
}

function transform_verse_div(verse_div) {
  var html = fmt_lyrics_div(verse_div)

  var lyrics_div = document.createElement("div")
  lyrics_div.innerHTML = html

  // Copy over all specified attributes
  for (var i = 0; i < verse_div.attributes.length; i++) {
    var attrib = verse_div.attributes[i];
    if (attrib.specified) {
      lyrics_div.setAttribute(attrib.name, attrib.value)
    }
  }

  add_class(lyrics_div, "lyrics")

  verse_div.parentNode.insertBefore(lyrics_div, verse_div)
  verse_div.style.display = "none"
}

function getFirstInnerText(tag, def) {
  var elts = document.getElementsByTagName(tag)
  var text
  if (elts.length) {
    text = elts[0].textContent
  } else {
    text = def
  }
  return text
}

function setup_title() {
  var title = getFirstInnerText("title", "(NO TITLE)").toUpperCase()
  var artist = get_meta_content("artist")
  var h1 = document.createElement("h1")
  h1.innerHTML = title + " &mdash; " + artist
  document.body.insertBefore(h1, document.body.firstChild)
}

function main() {
  var divs = document.getElementsByTagName("verse")
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i]
    transform_verse_div(div)
  }

  // Remove the verse divs afer they have been transformed

  var divs = document.getElementsByTagName("verse")
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i]
    div.parentNode.removeChild(div) // Also: div.remove()
  }

  setup_title()
}

function test() {
  var ch = "A     D      Em D     A             D  Em  D"
  var ly = "Louie Louie, oh baby, we gotta go."
  var parts = make_parts(ch, ly)
  console.log(parts)
}

add_link_tag("https://fonts.googleapis.com/css?family=Roboto")
document.addEventListener("DOMContentLoaded", main)

