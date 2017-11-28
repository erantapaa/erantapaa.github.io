function showLatexOutput(data) {
  let words = data.trim().split(/\s+/)
  url = words[1]
  $("#output").html(`<img src="${url}">`)
  $("#output").show()
  $("#error").hide()
}

function showFailure(msg) {
  $("#output").hide()
  $("#error").text(msg)
  $("#error").show()
}

function dochallenge(a,b) {
  $("#dividend").val(a)
  $("#divisor").val(b)
  render2()
}

function validPoly(x) {
  let coeff = '\\s*(-?\\d+)'
  let termx = `(${coeff})?\\s*x(^\\d+)?`
  let term = `(${coeff})|(${termx})`
  let poly = `^${term}(\\s*[+-]${term})*$`
  let re = new RegExp(poly)
  return re.test(x)
}

function render2() {
  let a = $("#dividend").val().trim()
  let b = $("#divisor").val().trim()

  if (!validPoly(b)) {
    showFailure("Divisor not a polynomial in x: "+b)
    return;
  }
  if (!validPoly(a)) {
    showFailure("Dividend not a polynomial in x: " + a)
    return;
  }

  let formula = `\\polylongdiv{${a}}{${b}}`
  let preamble = `
  \\usepackage{amsmath}
  \\usepackage{amsfonts}
  \\usepackage{amssymb}
  \\usepackage{polynom}`

  formula = formula.replace(/%/g,"%25");
  formula = formula.replace(/&/g,"%26");

  preamble = preamble.replace(/%/g,"%25");
  preamble = preamble.replace(/&/g,"%26");

  let rnd = Math.random()*100
  let body = `formula=${formula}&preamble=${preamble}&fsize=17px&mode=0&out=1&remhost=quicklatex.com&rnd=${rnd}`
  $("#output").html('<img src="progressbar.gif">')
  $.ajax({
    url: "http://www.quicklatex.com/latex3.f",
    type: 'POST',
    data: body,
    processData: false,
    timeout: 100000,
    success: showLatexOutput,
    error: function(xhr,textStatus) { showFailure("XHR error: " + textStatus) }
  })
}

function init() {
let challenges = [ ["4x^3 + 2x^2 - 6x + 3", "x - 3"], ["2x^4 - 9x^3 + 21x^2 - 26x + 12", "2x - 3"], ["10x^4 - 7x^2 - 1", "x^2 - x + 3"] ]
for (let i = 0; i < challenges.length; ++i) {
  let click = () => { dochallenge( challenges[i][0], challenges[i][1]) }
  $("#challenges").append('<p>').append( $("<button>").text(`Challenge ${i+1}`).click( click) )
}
$("#divideBtn").click(render2)
}

$(document).ready(init)

