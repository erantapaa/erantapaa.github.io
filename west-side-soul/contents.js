
function add_script_tag(url) {
  var d = document
  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url
  d.getElementsByTagName('head')[0].appendChild(script);
}

function add_link_tag(url) {
  var link = document.createElement("link")
  link.href = url
  link.rel = "stylesheet"
  document.head.appendChild(link)
}

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

function make_span(cls, content) {
  return make_element("span", cls) + html_escape(content) + "</span>"
}

function make_anchor(href) {
  return '<a href="' + href + '">'
}

function fmt_toc_line_with_anchor(lookup_href, line) {
  var html = ""
  var m = line.match(/^\s*((A?\d+)[a-z]?)\.\s*(.*) -\s+(.*)/)
  if (m) {
    var songid = m[1]
    var label = m[2]
    var title = m[3]
    var artist = m[4]
    var href = lookup_href( songid )
    if (href) {
      html += "<li>" + make_span("songid", label) + make_anchor(href) + make_span("title", title) + "</a>" + make_span("artist", artist) + "\n"
    } else {
      html += "<li>" + make_span("songid", label) + make_span("title", title) + make_span("artist", artist) + "\n"
    }
  }
  return html
}

function fmt_toc_line(line) {
  var html = ""
  var m = t.match(/^\s*(A?\d+\w?)\.\s*(.*) -\s+(.*)/)
  if (m) {
    html += "<li>" + make_span("songid", m[1]) + make_span("title", m[2]) + make_span("artist", m[3]) + "\n"
  }
  return html
}

function no_links(x) { return "humma" }

function fmt_toc_lines(lookup_href, lines) {
  var html = make_element("ul")

  for (var i = 0; i < lines.length; i++) {
    var t = lines[i]
    html += fmt_toc_line_with_anchor(lookup_href, t)
  }
  html += "</ul>\n"
  return html
}

function process_toc_div(lookup_href, div) {
  var text = div.textContent
  text = text.trim()
  var lines = text.split(/\r\n|\n|\r/)
  var newdiv = document.createElement("div")
  newdiv.classList.add("toc-section")
  newdiv.innerHTML = fmt_toc_lines(lookup_href, lines)

  div.parentNode.insertBefore(newdiv, div)
  div.style.display = "none"
}

function process_prefix_toc_div(all_songs, prefix, lookup_href, div) {
  // Determine which songs
  var songs = []
  for (var i = 0; i < all_songs.length; i++) {
    var songid = all_songs[i]["songid"]
    if (songid && songid.startsWith(prefix)) {
      songs.push(all_songs[i])
    }
  }

  songs.sort(function(a,b) {
    var ax = a["songid"]
    var bx = b["songid"]
    return (ax < bx ? -1 : (ax === bx ? 0 : 1))
  })

  html = "<ul>\n"
  for (var i = 0; i < songs.length; i++) {
    var songid = songs[i]["songid"]
    var title = songs[i]["title"]
    var artist = songs[i]["artist"]
    var href = lookup_href(songid)
    html += "<li>" + make_span("songid", songid) + make_anchor(href) + make_span("title", title) + "</a>" + make_span("artist", artist) + "\n"
  }
  html += "</ul>\n"

  var newdiv = document.createElement("div")
  newdiv.classList.add("toc-section")
  newdiv.innerHTML = html
  div.parentNode.insertBefore(newdiv, div)
  div.style.display = "none"
}

function main() {
  // process the songs array
  var h = {}
  for (var i = 0; i < songs.length; i++) {
    var songid = songs[i]["songid"]
    var file = songs[i]["file"]
    h[songid] = file
  }

  var lookup_href = function(songid) { return h[songid] }
  var divs = document.getElementsByTagName("contents")
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i]
    var prefix = div.getAttribute("prefix")
    if (prefix) {
      process_prefix_toc_div(songs, prefix, lookup_href, div)
    } else {
      process_toc_div(lookup_href, div)
    }
  }
}

if (document) {
  document.addEventListener("DOMContentLoaded", main)
  add_link_tag("https://fonts.googleapis.com/css?family=Roboto")
}

