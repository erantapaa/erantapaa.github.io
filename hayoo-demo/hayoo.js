function makeAutocomplete() {
    var cache = {};
    $( "#hayoo" ).autocomplete({
        minLength: 2,
        source: function( request, response ) {
            var term = request.term;
            if ( term in cache ) {
                response( cache[ term ] );
                return;
            }

            $.getJSON( "/autocomplete", request, function( data, status, xhr ) {
                cache[ term ] = data;
                response( data );
            });
        }
    });
}

function count_ps(target) {
  console.log("number of <p>:",  $(this).find("p").length )
}

function doit() {
  $(document).find(".more").each(function() {
    var short = shorten(this)
    console.log("short:", short)
  })
}

function shorten(target) {
  // iterate over children
  var child = target.firstChild
  if (!child) return null;
  if (child.tagName == "PRE") {
    return null
  } else {
    // assume a block element - iterate over children of child
    var e = child.firstChild
    var len = 0
    var count = 0
    var e = child.firstChild
    var maxlength = 100
    var last_text = ""
    for (; e; e = e.nextSibling) {
      var newl = len + e.textContent.length
      if (newl > maxlength) {
        if (e.nodeType == 3) { // a text node
          // find first space after
          var text = e.textContent
          var k = text.indexOf(' ', maxlength - len)
          if (k >= 0) {
            last_text = text.substr(0, k)
          } else {
            last_text = text
          }
        } else { // an element
          count++
        }
        break
      }
      len = newl
      count++
    }
    if (e) {
      // need to add More..., copy first n nodes
      var frag = document.createElement(child.tagName)
      var j = 0;
      for (var ee = child.firstChild; ee && (j < count); ee = ee.nextSibling, j++) {
        frag.appendChild( ee.cloneNode(true) )
      }
      frag.appendChild( document.createTextNode(last_text + " ...") )
      return frag
    } else {
      // no need to add ellipses
      if (child.nextSibling) {
        var frag = child.cloneNode(true)
        frag.appendChild( document.createTextNode(" ...") )
        return frag
      } else {
        return null // no need to provide short version
      }
    }
  }
}

function isEllipsisActive(e) {
   var tolerance = 2; // In px. Depends on the font you are using
   return e.offsetWidth + tolerance < e.scrollWidth;
}

function doit2() {
  $(document).find(".more").each(function() {
    console.log("is ellipsis active:", isEllipsisActive(this))
  })
}

function handle_more_less(e) {
  console.log("in handle_more_less")
  $(this.parentNode.parentNode.nextSibling).children().toggle()
}

function insert_more_control(target) {
  // <div><p><a class="more-control">More/Less</a></div>
  $(".more").each(function () {
    var div = document.createElement("div")
    div.innerHTML = '<p><a class="more-control">More/Less</a>'
    this.parentNode.insertBefore(div, this)
  })
  $(".more-control").each(function() {
    this.onclick = handle_more_less
  })

}

function makeMores (target) {
    var showChar = 150;
    var maxChar = 10000000;
    var ellipsestext = "...";
    var moretext = "more";
    var lesstext = "less";
    var t = target ? target : document;
    $(t).find('.more').each(function() {
        var content = $(this).html();
        var textContent = $(this).text();

        $(this).html(textContent)


        if (!this.firstChild) {
          console.log("=== no first child!!!, this:", this)
        } else {
          var short = shorten(this)
          if (short) {
            console.log("short version:", short)
            this.insertBefore(short, this.firstChild)
            // insert control div just before this one
            var div = document.createElement("div")
            div.innerHTML = '<p><a class="more-control">More/Less</a>'
            this.parentNode.insertBefore(div, this)
            $(this).children().each(function(i,e) {
              if (i > 0) { $(e).toggle() }
            })
          }
        }

        if(false && (textContent.length > maxChar)) {

            var c = textContent.substr(0, showChar);


            var html = '<div class="preview">' + c + '<span class="moreelipses">'+ellipsestext+'</span>&nbsp;<a href="" class="morelink">'+moretext+'</a></span></div>'
                     + '<div class="content" style="display: none;"">' + content + '<a href="" class="lesslink">'+lesstext+'</a></div>';
            $(this).html(html);
        }

    });

    $(t).find(".morelink").click(function(){
        $(this).parent().hide()
        $(this).parent().next().show()
        return false;
    });
    $(t).find(".lesslink").click(function(){
        $(this).parent().hide()
        $(this).parent().prev().show()
        return false;
    });
}

var page = 1
function addPage(reset) {
    if (page < 20) {
        params = {
            "query": currentQuery
        }
        $.get("/ajax/" + page + "/", params, function(d){
            var d1 = $(d);
            makeMores(d1);
            $("#results").append(d1)
            page += 1
        }).always(reset)
    }
}

function makeNextPage() {
    $('#next-page-button').click(function () {
        var btn = $(this)
        btn.button('loading')
        addPage(function () {
            btn.button('reset')
        });
    });
}

$().ready(function() {
    makeAutocomplete()

    makeMores()
    $(".more-control").each(function() { this.onclick = handle_more_less })

    makeNextPage()

    $("#hayoo").focus()
});
