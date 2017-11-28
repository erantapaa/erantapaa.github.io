
/*
                   4x2 + 14x +  36
           _______________________
    x - 3 ) 4x3 +  2x2 -  6x +   3
            4x3 - 12x2
            ----------
                  14x2 -  6x
                  14x2 - 42x
                  ----------
                         36x +   3
                         36x - 108
                         ---------
                               111
*/

let Superscripts = [ 0, 185, 178, 179, 8308, 8309, 8310, 8311, 8312, 8313 ]

function xterm(v, k) {
  if (k > 0) {
    if (v == 1) {
      return exponent(k)
    } else if (v == -1) {
      return "-" + exponent(k)
    } else {
      return '' + v + exponent(k)
    }
  } else {
    return '' + v
  }
}

function exponent(k) {
  if (k <= 0) return ""
  if (k == 1) return "x"
  return "x<sup>" + k + "</sup>"
  // if (k <= 9) return "x" + String.fromCharCode(Superscripts[k])
  // return ("x^" + k)
}

function render_tr(r, n, ncols) {
  let tr = []
  let first = 1
  let j = 0
  for (; j < r.length; ++j) {
    if (r[j] === '') { // empty cell
      tr.push('')
      if (j > 0) { tr.push('') }
    } else if (first) {
        if (j > 0) tr.push('')
        tr.push( xterm( r[j], n-j) ) 
        first = 0
    } else {
        // first cannot be true
        let op = tr_op(r[j] < 0 ? '-' : '+')
        let v = Math.abs(r[j])
        tr.push(op)
        tr.push(xterm(v, n-j))
    }
  }
  while (tr.length < ncols) { tr.push('') }
  return tr
}

function tr_op(op) {
  return op
}

function b_op(op) {
  return '<span class="bop">' + op + '</span>'
}

function render_b(b) {
  let html = ''
  let n = b.length-1
  for (let i = 0; i < b.length; ++i) {
    let v
    if (i == 0) {
      html += xterm(b[i], n-i)
    } else {
      v = Math.abs(b[i])
      let op = b_op( b[i] < 0 ? '-' : '+' )
      html += op + xterm(v, n-i)
    }
  }
  return html
}

function render(a, b, rows, quot, rem) {
  let table = []
  let n = a.length-1     // highest exponent
  let ncols = 2*n+1            // number of table columns

  let q = quot.slice(0)
  while (q.length < rows[0].length) { q.unshift('') }
  let tr0 = render_tr(q, n, ncols)

  tr0.unshift('')
  table.push(tr0)

  for (let i = 0; i < rows.length; ++i) {
    let r = rows[i]
    let tr = render_tr(r, n, ncols)
    if (i == 0) {
      tr.unshift( render_b(b) )
    } else {
      tr.unshift('')
    }
    table.push(tr)
  }

  return table
}

function determine_class(i, j, blen, content) {
  // blen = length of divisor
  if ((i == 0) && (content !== '')) {
    return "tdquotient"
  }
  if ((j == 0) && (content != '')) {
    return "tddivisor"
  }
  if ((i == 1) && (j == 1)) {
    return "tddividend1st"
  }
  if ((i == 1) && (j > 0)) {
    return "tddividend"
  }
  if ((i >= 2) && (i % 2 == 0) && (content !== '')) {
    return "tdmul"
  }
  return ''
}

function render_html(table, b) {
  let html = '<table>'
  for (let i = 0; i < table.length; ++i) {
    let tr = "<tr>"
    for (let j = 0; j < table[i].length; ++j) {
      let cls = determine_class(i, j, b.length, table[i][j])
      if ( (j >= 2) && (j % 2 == 0) ) {
        if (cls) { cls += " tdop" } else { cls = "tdop" }
      }
      let c = cls ? ` class="${cls}"` : ""
      tr += `<td${c}>` + table[i][j] + '</td>'
    }
    tr += '</tr>' + "\n"
    html += tr
  }
  html += "</table>"
  return html
}

function addrow(rows, i, coeffs) {
  let x = coeffs.slice(0)
  for (let j = 0; j < i; ++j) { x.unshift("") }
  rows.push(x)
}

function polydivide(a0, b) {
  let a = a0.slice(0)    // make a copy of a0
  let rows = []
  let quot = []             // quotient

  let i = 0
  rows.push(a.slice(0))

  while (a.length >= b.length) {
    let q = a[0] / b[0]
    quot.push(q)
    x = b.map( (c) => c*q )

    addrow(rows, i, x)
    for (let j = 0; j < b.length; ++j) { a[j] = a[j] - x[j] }
    // a[0] should be 0
    a.shift()

    addrow(rows, i+1, a.slice(0, b.length))
    i++
  }

  return { rows: rows, quot: quot, rem: a }
}

function test0() {
  console.log( render_tr( [4, 2, -6, 3], 3, 7) )
}

function test1() {
  let a = [4, 2, -6, 3]
  let b = [1, -3]
  let ans = polydivide(a, b)

  let table = render(a, b,  ans.rows, ans.quot, ans.rem)
  // for (let i = 0; i < table.length; ++i) { console.log(table[i]) }
  console.log( render_html(table, b) )
}

function test2() {
  let a = [4, 2, -6, 3]
  let b = [1, -3]
  let ans = polydivide(a, b)

  let table = render(a, b,  ans.rows, ans.quot, ans.rem)
  // for (let i = 0; i < table.length; ++i) { console.log(table[i]) }
  let html = render_html(table, b)
  console.log("html:", html)
  $("#foo").html(html)
}

function showOutput(html) {
  $("#output").html(html)
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

function parsePoly(x) {
  let terms = x.trim().split(/\s+/).map( (x) => parseInt(x) )
  if (terms.some( isNaN )) {
    return null
  }
  return terms
}

function render2() {
  let aval = $("#dividend").val().trim()
  let bval = $("#divisor").val().trim()

  let b = parsePoly(bval)
  let a = parsePoly(aval)

  if (!b) {
    showFailure("Unable to parse divisor: "+bval)
    return;
  }
  if (!a) {
    showFailure("Unable to parse dividend: " + aval)
    return;
  }

  let ans = polydivide(a, b)
  let table = render(a, b, ans.rows, ans.quot, ans.rem)
  let html = render_html(table, b)
  showOutput(html)
}

function init() {
  let challenges = [ ["4 2 -6 3", "1 -3" ], ["2 -9 21 -26 12", "2 -3"], ["10 0 -7 0 -1", "1 -1 3"] ]
  for (let i = 0; i < challenges.length; ++i) {
    let click = () => { dochallenge( challenges[i][0], challenges[i][1]) }
    $("#challenges").append('<p>').append( $("<button>").text(`Challenge ${i+1}`).click( click) )
  }
  $("#divideBtn").click(render2)
}

$(document).ready(init)

