
// @flow
// pass in the jQuery $

SearchBox.prototype = {

  load_name_to_element:  function () {
    this.name_to_element = {}
    var me = this
    $("td.src").each( function(i,e) {
      var name = e.textContent
      me.name_to_element[name] = e
    });
  },

  element_for_name: function (name) {
    if (!this.name_to_element) {
      this.load_name_to_element()
    }
    return this.name_to_element[name]
  },

  all_entries: function() {
    var matches = document.getElementsByClassName("src")
    var r = []
    for (var i = 0; i < matches.length; i++) {
      r.push( matches[i].textContent )
    }
    return r
  },

  filter_input: function(text,input) {
    var ch = input.charCodeAt(0)
    // require two characters if alphabetic
    if ( ((ch >= 65) && (ch <= 90)) || ((ch >= 97) && (ch <= 122)) ) {
      return (input.length >= 2) && (text.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    } else {
      return text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },

  scroll_to_element: function (elt) {
    $('html, body').animate({
        scrollTop: ( $(elt).offset().top - 50) + 'px'
    }, 'fast');
    return this; // for chaining...
  },

  highlight_entry_td: function (td_elt) {
    this.highlight_tr(td_elt.parentNode)
  },


  highlight_tr: function(tr) {
    $(tr).addClass("highlighted")
    $(tr).children().addClass("highlighted")
    tr = tr.nextSibling
    var count = 100
    while (tr && (count-- > 0)) {
      if (tr.firstChild) {
        var c = tr.firstChild.className
        if (c.indexOf("src") >= 0) {
          break
        }
      }
      $(tr).addClass("highlighted")
      $(tr).children().addClass("highlighted")
      tr = tr.nextSibling
    }
  },

  clear_highlights: function () {
    $(".highlighted").removeClass("highlighted")
  },

  create_search_div: function() {
    var searchDiv = document.createElement("div")
    searchDiv.id = "searchDiv"
    searchDiv.style.visibility = "hidden"
    searchDiv.innerHTML = '<div class="centered"><input type="text" id="searchInput" size=30 class="awesomplete"></div>'

    var indexDiv = document.getElementById("index")

    indexDiv.insertBefore(searchDiv, indexDiv.firstChild)

    var me = this

    var entries = me.all_entries()

    var searchInput = document.getElementById("searchInput")

    var ac = new Awesomplete(searchInput, {
      minChars:  1,
      maxItems:  100,
      filter:    me.filter_input,
      autoFirst: true,
      sort:      function (xs) { return xs },
      list:      entries
    });

    searchInput.addEventListener("awesomplete-selectcomplete", function(e) {
      var name = searchInput.value
      var elt = me.element_for_name(name)
      if (elt) {
        me.clear_highlights()
        me.highlight_entry_td(elt)
        me.scroll_to_element(elt)
        $("#searchDiv").each(function(i,e) { e.style.visibility = "hidden" })
      }
    });

  },

  handle_keypress: function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if (("key" in evt) && evt.key) {
        isEscape = evt.key == "Escape";
    } else {
        isEscape = evt.keyCode == 27;
    }
    if (isEscape) {
      $("#searchDiv").each(function(i,e) {
        if (e.style.visibility) {
          e.style.visibility = ""
          $("#searchInput").val("")
          $("#searchInput").focus()
        } else {
          e.style.visibility = "hidden"
        }
      })
      evt.stopPropagation()
    }
  },

  initialize: function() {
    console.log("initializing...")
    this.create_search_div()
    $(document).keydown(this.handle_keypress)
    console.log("done initializing")
  }

};

function SearchBox() {
  this.name_to_element = null
}

var theSearchBox = new SearchBox()
window.addEventListener('load', function() {
  console.log("initializing theSearchBox")
  theSearchBox.initialize() })
console.log("=== done loading main.js")

