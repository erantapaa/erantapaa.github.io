
define(['jquery','Random'
], function($, Random) {
  let MeasureTable = `
    96 32 69 40 148 104 152 119 98 3 54
    22 6 95 17 74 157 60 84 142 87 130
    141 128 158 113 163 27 171 114 42 165 10
    41 63 13 85 45 167 53 50 156 61 103
    105 146 153 161 80 154 99 140 75 135 28
    122 46 55 2 97 68 133 86 129 47 37
    11 134 110 159 36 118 21 169 62 147 106
    30 81 24 100 107 91 127 94 123 33 5
    70 117 66 90 25 138 16 120 65 102 35
    121 39 136 176 143 71 155 88 77 4 20
    26 126 15 7 64 150 57 48 19 31 108
    9 56 132 34 125 29 175 166 82 164 92
    112 174 73 67 76 101 43 51 137 144 12
    49 18 58 160 136 162 168 115 38 59 124
    109 116 145 52 1 23 89 72 149 173 44
    14 83 79 170 93 151 172 111 8 78 131`

  function parseTable(str) {
    let rows = str.trim().split(/\n/)
    let choices = []
    for (let r of rows) {
      choices.push( r.trim().split(/\s+/).map( (x) => parseInt(x,10) ) )
    }
    return choices
  }

  let MeasureChoices = parseTable(MeasureTable)

  function parseLily(str) {
    let lines = str.split(/\n/)
    let measure_id = 0
    let lily_measures = {}
    for (let i = 0; i < lines.length; ++i) {
      let m = lines[i].match(/^\s*%\s*Measure\s+(\d+)/)
      if (m) {
        measure_id = parseInt(m[1], 10)
        continue
      }
      if (measure_id) {
        m = lines[i].match(/^(.*?)\|(.*?)\|\s*$/)
        if (m) {
          lily[ "treble-" + measure_id ] = m[1]
          lily[ "bass-" + measure_id ] = m[2]
        }
      }
      measure_id = 0
    }
    return lily_measures
  }

  function load_lily() {
    let fs = require('fs')
    return fs.readFileSync("measures.ly", "utf8")
  }

  // parse a Lily score to get all of the measure definitions
  function parse_lily_measures(str) {
    let lines = str.split(/\n/)
    let measure_id = 0
    let lily = {}
    for (let i = 0; i < lines.length; ++i) {
      let m = lines[i].match(/^\s*%\s*Measure\s+(\d+)/)
      if (m) {
        measure_id = parseInt(m[1], 10)
        continue
      }
      if (measure_id) {
        m = lines[i].match(/^(.*?)\|(.*?)\|\s*$/)
        if (m) {
          lily[ "treble-" + measure_id ] = m[1]
          lily[ "bass-" + measure_id ] = m[2]
        }
      }
      measure_id = 0
    }
    return lily
  }

  // constructor
  function Mozart() {
    this.rng_class = Random
    this.lily_measures = null
    this.lily_score = "% uninitialized"
    this.measure_choices = MeasureChoices
    // this.init()
  }

  Mozart.prototype.init_measures = function (m) {
    this.lily_score = m
    this.lily_measures = parse_lily_measures(this.lily_score)
  }

  function running_under_node() {
    return (typeof process !== 'undefined') && (process.release.name === 'node')
  }

  Mozart.prototype.init = function() {
    let MEASURES_LY = "measures.ly"
    if (running_under_node()) {
      let score = require('fs').readFileSync(MEASURES_LY, "utf8")
      this.init_measures(score)
    } else {
      let me = this
      $.get(MEASURES_LY).done(function(score) {
          me.init_measures(score)
      }).fail(function() {
        alert("failed to load " + MEASURES_LY)
      })
    }
  }

  // return the composition generated from a seed
  Mozart.prototype.seeded_composition = function(seed) {
    let rng = new (this.rng_class)(seed)
    let comp = []
    for (let choices of this.measure_choices) {
      let j = Math.floor( rng.random() * choices.length )
      comp.push( choices[j] )
    }
    return comp
  }

  // return the LilyPond code for a list of measures
  Mozart.prototype.lily_composition = function(comp, title) {
    let body = ""
    for (let measure_id of comp) {
      body += "\\set Score.currentBarNumber = #" + measure_id + "\n" +
             this.lily_measures[ "treble-" + measure_id ] + " | " +
             this.lily_measures[ "bass-" + measure_id ] + " |\n"
    }
    let header = ""
    if (title) {
      header = `\\header { title = "${title}" }`
    }

    let score = `
\\score {
  {
    \\override Score.BarNumber.break-visibility = #end-of-line-invisible
    \\set Score.barNumberVisibility = #all-bar-numbers-visible
    \\bar ""
    \\parallelMusic #'(voiceA voiceB) {
${body}
    }
    \\new StaffGroup << \\new Staff { \\time 3/8 \\voiceA } \\new Staff { \\clef bass \\voiceB } >>
    \\bar "|."
  }
  \\layout{}
  \\midi{}
}
`
    let code = header + score
    return code
  }
 
  return Mozart
})

