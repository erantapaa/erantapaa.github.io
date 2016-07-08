
function init() {
  console.log("=== here in init")
  $.getJSON("report.json" , function(data) {
    build_content(data)
  }) 
}

function first_word(s) {
  return s.split(" ")[0]
}

function td_(s) {
  return '<td>' + s + '</td>'
}

function atag(url) {
  return '<a href="' + url + '">'
}

function contents_link(pkg, vers, body) {
  var url = "http://hackage.haskell.org/package/" + pkg + "-" + vers
  return atag(url) + body + "</a>"
}

function explain(r) {
  var p = r['package']
  var v = r['version']
  var t = first_word( r['upload_time'] )
  var par1 = "Version "+v+" of " + p + " was uploaded on " + t + ", but no attempts to generate its docs have been made since then."
  var lst = r['last_status']
  if (! r['last_version'] ) {
    par2 = "No docs are available for any version of this package."
  } else {
    var vl = r['last_version']
    var tl = first_word( r['last_upload_time'] )
    var was_uploaded = vl + " was uploaded on " + tl
    if (lst.match(/Docs uploaded by user/)) {
      var tl = first_word( r['last_upload_time'] )
      par2 = "Version " +  was_uploaded + ", and docs were uploaded by the user."
    } else if (lst.match(/Docs not available/)) {
      par2 = "By comparison, version " + vl + " was uploaded on " + tl + ", and doc generation was attempted but it was not successful."
    } else if (lst.match(/Docs available/)) {
      par2 = "By comparison, version " + vl + " was uploaded on " + tl + ", and doc generation was attempted and it was successful."
    } else {
      par2 = "By comparison, version " + vl + " was uploaded on " + tl + " and has doc generation status " + lst + "."
    }
  }
  alert(par1 + "\n\n" + par2)
}

function build_content(data) {
  var created_time = data['created_time']
  var rows = data['rows']
  console.log("first row:", rows[0])
  console.log("row count: " + rows.length)
  var trs = []
  trs.push("<tr><th class=hash>#</th><th>Uploaded</th><th>Package</th><th>Version</th><th>Prev Upload Time</th><th>Prev Version</th><th>Prev Status</th></tr>")
  var fields = "upload_time package version last_version last_upload_time last_status".split(" ")
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i]
    var p = r["package"]
    var v = r["version"]
    var t0 = first_word( r["upload_time"] )
    var t1 = first_word( r['last_upload_time'] || "--" )
    var url = "http://hackage.haskell.org/package/" + p + "-" + v
    var atag = '<a href="' + url + '">'
    var lst = r["last_status"] || "--"
    lst = lst.replace(/\[ *build log.*/, "")
    lst = lst.replace(/ *Build status unknown.*/, "")
    var lvers = r['last_version'] || "--"
    var lvers;
    if (r['last_version']) {
      lvers = contents_link(p, r['last_version'], r['last_version'])
    } else {
      lvers = "--"
    }
    var atag2 = '<a href="" class="explainer" data-i="' + i + '">'
    var cols = [ '<td class=counter>' + atag2 + (i+1) + '</a>' + '</td>'
               , td_( t0 )
               , td_(  p  )
               , td_( atag + r['version'] + '</a>' )
               , td_( t1 )
               , td_( lvers )
               , td_( lst  )
               ]
    var tr = "<tr>" + cols.join('') + "</tr>"
    trs.push(tr)
  }
  var joined = trs.join("")
  $("#tbl").html(joined)
  $("#preface").html("Report created on " + created_time)
  // add explainer links
  $("a.explainer").each(function() {
    var i = $(this).attr("data-i")
    $(this).click(function(e) {
      e.preventDefault()
      $(".highlight").removeClass("highlight")
      $(this).parent().parent().addClass("highlight")
      window.setTimeout( function() { explain(rows[i]) } , 100 )
      console.log("i = ", i, "row:", rows[i])
    })
  })
}

$(document).ready(init)

