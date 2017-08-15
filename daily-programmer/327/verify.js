
// var real_words_url = "https://pastebin.com/raw/trMz6nWQ"
var real_words_url = "https://erantapaa.github.io/letter-blocks/real_words.txt"

var blocks15 = "a am irs lnr aeiou dinst aegko deglptz aeinouwy bcdeglms cdilmorsx adeghikruvy fhjkmnpswyz bcefjmnopqtvw bcfhklmnqstuvxz".split(' ')

var real_words = []

function init() {
  console.log("in init")
  $(document).ready(function() {
    $("#blocks").val("")
    load_words(real_words_url)
    $("#blocks").blur(blocks_changed)
    $("#check_one_btn").click(check_one_word) 
    $("#check_all_btn").click(check_all_words)
    set_blocks(blocks15)
  })
}

function update_words(words) {
  real_words = words
  console.log("in update_words")
  $("#word_count").html( words.length )
}

function set_blocks(blocks) {
  var text = blocks.join("\n")
  $("#blocks").val(text)
  $("#block_count").html( blocks.length )
}

function get_blocks() {
  var text = $("#blocks").val()
  var rows = text.split(/\n/)
  var blocks = []
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i].replace(/[^a-z]/g,'')
    if (r.length) {
      blocks.push(r)
    }
  }
  return blocks
}

function blocks_changed() {
  var blocks = get_blocks()
  var text = blocks.join("\n")
  if (text != $("#blocks").val()) {
    $("#blocks").val(text)
  }
  $("#block_count").html( blocks.length )
}

function callback(data) {
  var words = data.split(/\s+/)
  update_words(words)
}

function load_words(url) {
  jQuery.ajax({
    'url': url,
    'dataType': 'text',
    'success': callback
  });
}

function report(msg) {
  $("#cover_solution").val(msg)
}

function check_one_word() {
  var word = $("#one_word").val()
  w2 = word.replace(/[^a-z]/g,'')
  if (w2 != word) {
    $("#one_word").val(w2)
  }
  report("(thinking)")
  var msg = check_word(w2)
  report(msg)
}

function check_word(word) {
  word.replace(/[^a-z]/g,'')
  var blocks = get_blocks()
  var sol = find_cover(blocks, 0, word, "")
  if (sol === null) {
    return("No solution")
  } else {
    return(sol)
  }
}

function test1() {
  var blocks = [ "a", "b", "c" ]
  var word = "cba"
  console.log("--- test1:", find_cover(blocks, 0, word, ""))
}

function find_cover(blocks, b, word, path) {
  if (word.length == 0) {
    return path + '.'.repeat(blocks.length)
  }
  if (b >= blocks.length) {
    return null
  }
  if (blocks.length - b < word.length) {
    return null
  }
  var blen = blocks[b].length
  for (var i = 0; i < blen; ++i) {
    var ch = blocks[b].charAt(i)
    var j = word.indexOf(ch)
    if (j >= 0) {
      var word2 = word.substring(0, j) + word.substring(j+1)
      var sol = find_cover(blocks, b+1, word2, path+ch)
      if (!(sol === null)) {
        return sol
      }
    }
  }
  // try not using this block
  return find_cover(blocks, b+1, word, path + ".")
}

function check_all_words() {
  var blocks = get_blocks()
  var nfailed = 0
  var checked = 0
  var failed = []
  $("#report").val("Checking words...")

  for (var i = 0; i < real_words.length; i++) {
    var word = real_words[i]
    var sol = find_cover(blocks, 0, word, "")
    if (sol === null) {
      nfailed++
      failed.push(word)
    }
    checked++
  }
  var msg = "" + checked + " checked / " + nfailed + " failed"
  $("#check_status").html(msg)
  var msg;
  if (nfailed == 0) {
    msg = "All words verified."
  } else {
    msg = failed.join("\n")
  }
  $("#report").val( msg )
}
