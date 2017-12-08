
// A pseudo-random number generator to get predictable
// results across different platforms.
//
// Algorithm taken from https://www.npmjs.com/package/compute-lcg

define([
], function () {
  function RNG(seed) {
    this.mask = 123459876
    this.m = 2147483647
    this.a = 16807
    this.seed = seed
  }

  RNG.prototype.set_seed = function (seed) {
    this.seed = seed
  }

  // return a random number between 0 and 1
  RNG.prototype.random = function() {
    let s = this.seed ^ this.mask
    s = (this.a * s) % this.m
    let r = s / this.m
    this.seed = s ^ this.mask
    return r
  }

  return RNG
})
