// module util

function contains(larger, smaller) {
  return larger.indexOf(smaller) >= 0
}

function chomp(str) {
  if (str.slice(-1) == "\n") {
    return str.substring(0, str.length-1)
  } else {
    return str
  }
}

function ends_with_newline(text) {
  return (text.slice(-1) == "\n")
}

// a simplistic version of computing x^n
function pow(x,n) {
  if (n <= 0) { return 1 }
  if (n <= 1) { return x }
  return (x*x*pow(x,n-2))
}

// simplistic numeric formating
function fmt(x, d) {
  var tens = pow(10,d)
  var s = '' + Math.floor(x*tens)
  return s.substr(0, s.length-d) + '.' + s.substr(s.length-d)
}

// show_object
function show_object(obj) {
  var s = ""
  for (var x in obj) {
    s += (", " + x + ": " + obj[x])
  }
  return s.substring(2)
}

