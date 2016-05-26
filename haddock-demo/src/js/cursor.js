// module cursor

#include line.js

// A cursor to keep track of line and column positions
function Cursor() {
  this.lineno = undefined  // current line number
  this.column = undefined  // current column
  this.elt = undefined

  this.goto_line = function(n) {
    this.elt = find_line(n)
    this.lineno = n
    this.column = 0
    if (this.elt) { return true } else { return false }
  }

  // return the current left position
  this.lpos = function () {
    return this.column
  }

  // return the current right position
  this.rpos = function () {
    var len = this.elt.textContent.length
    return this.column + len
  }

  // advance - returns false if at end
  this.advance = function () {
    var len = this.elt.textContent.length
    this.elt = this.elt.nextSibling
    if (this.elt) {
      var ln = at_line_start(this.elt)
      if (ln) {
        this.lineno = ln
        this.column = 0
      } else {
        this.column += len
      }
      return true
    } else {
      return false
    }
  }
}

