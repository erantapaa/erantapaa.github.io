function V4inc(v, dv) {
    for (let i = 0; i < 4; ++i) {
        v[i] += dv[i]
    }
    return v
}

function V4scale(v, a) {
    for (let i = 0; i < 4; ++i) {
        v[i] = v[i]*a
    }
    return v
}

function V4add(v, w, a) {
    let r = [0,0,0,0]
    for (let i = 0; i < 4; ++i) {
        r[i] = v[i]+w[i]*a
    }
    return r
}

function V4add4(v1, a1, v2, a2, v3, a3, v4, a4) {
    let r = [0,0,0,0]
    for (let i = 0; i < 4; ++i) {
        r[i] = v1[i]*a1 + v2[i]*a2 + v3[i]*a3 + v4[i]*a4
    }
    return r
}

function V4addmany(vs, as) {
    let r = [0,0,0,0]
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < vs.length; ++j) {
            r[i] += vs[j]*as[j]
        }
    }
    return r
}

// Perform one RK4 iteration step.
function RK4_step(G, Y, t, dt) {
    // Y = [x_d, y_d, x, y]
    let k1 = G.computeG(Y, t)
    let Y2 = V4add(Y, k1, 0.5*dt)
    let k2 = G.computeG(Y2, t+0.5*dt)
    let Y3 = V4add(Y, k2, 0.5*dt)
    let k3 = G.computeG(Y3, t+0.5*dt)
    let Y4 = V4add(Y, k3, dt)
    let k4 = G.computeG(Y4, t+dt)

    let Ynew = V4scale(V4add4(k1, 1, k2, 2, k3, 2, k4, 1), dt/6)
    return Ynew
}

class Ggravity {
    constructor(gravity_g) {
        this.gravity_g = gravity_g
    }
    computeG(Y, t) {
        let [x_d, y_d, x, y] = Y
        let x_dd = 0
        let y_dd = -this.gravity_g
        return [x_dd, y_dd, x_d, y_d]
    }
}

class Gdrag {
    constructor(gravity_g, mass, drag) {
        this.gravity_g = gravity_g
        this.mass = mass
        this.drag = drag
    }
    computeG(Y, t) {
        let [x_d, y_d, x, y] = Y
        let v = Math.sqrt(x_d*x_d+y_d*y_d)
        let x_dd = -this.drag*v*x_d/this.mass
        let y_dd = -this.drag*v*y_d/this.mass - this.gravity_g
        return [x_dd, y_dd, x_d, y_d]
    }
}

function simulate_RK4(niters, Y0, t0, G, dt) {
    // returns an array of [t, x_dd, y_dd, x_d, y_d, x, y]
    // Y0 = [x_d, y_d, x, y] at time 0
    let path = []
    let t = t0
    let Y = [...Y0]

    for (let i = 0; i < niters; ++i) {
        let dY = RK4_step(G, Y, t, dt)
        path.push( {
            t: t,
            x: Y[2],
            y: Y[3],
            x_d: Y[0],
            y_d: Y[1],
            x_dd: dY[0],
            y_dd: dY[1]
        })
        if (Y[3] < 0) break
        V4inc(Y, dY)
        t = t + dt
    }
    return path
}

function simulate_simple(niters, Y0, t0, G, dt) {
    // simulate trajectory using the simple solver
    let [vx, vy, x, y] = Y0
    let t = t0
    let Y = [...Y0]
    let path = []

    for (let i = 0; i < niters; ++i) {
        let [ax, ay, x_d, y_d ] = G.computeG(Y, t)
        path.push( {
            t: t,
            x: x,
            y: y,
            x_d: vx,
            y_d, vy,
            x_dd: ax*dt,
            y_dd: ay*dt
        })
        if (y <= 0) break
        vx += ax*dt
        vy += ay*dt
        x += vx*dt
        y += vy*dt
        t += dt
    }
    return path
}

function build_xy_trace(path) {
    let xs = []
    let ys = []
    for (let i = 0; i < path.length; ++i) {
        xs.push( path[i].x )
        ys.push( path[i].y )
    }
    return { x: xs, y: ys }
}

function remove_all_data_rows(table) {
    // remove all data rows from a table
    // assumes all data rows appear at the end of the table
    let child = table.lastElementChild
    while (child) {
        if ((child.nodeName == 'TR') && (child.classList.contains("tbl-header"))){
            table.removeChild(child)
            child = table.lastElementChild
        } else {
            break
        }
    }
}

class TableBuilder {
    constructor() {
    }

    td_row(values) {
        return values.map((x) => `<td>${ String(round(x)) }</td>`).join('')
    }
    columns() {
        return ['t', 'x', 'y', 't', 'x', 'y', 'dx', 'dy', 'dy (in.)']
    }

    header_tr(innerHTML) {
        return `<tr class="tbl-header">${innerHTML}</tr>`
    }

    header_row1() {
        return this.header_tr(`
    <th colspan=3>RK4</td>
    <th colspan=3>Simple</td>
    <th colspan=3>Difference</td>
    `)
    }

    header_row2() {
        return (this.columns().map((x) => `<th>${x}</th>`).join(''))
    }

    header(tbl) {
        return `${this.header_row1()}${this.header_row2()}`
    }

    build_row(path1, path2, i) {
        let p1 = (i < path1.length ? path1[i] : null)
        let p2 = (i < path2.length ? path2[i] : null)
        let c1 = p1 ? this.td_row([p1.t, p1.x, p1.y]) : '<td colspan=3>---</td>'
        let c2 = p2 ? this.td_row([p2.t, p2.x, p2.y]) : '<td colspan=3>---</td>'
        let c3 = (p1 && p2) ? this.td_row( [p1.x - p2.x, p1.y - p2.y, (p1.y-p2.y)*12]) : '<td colspan=3>---</td>'
        return `<tr>${c1}${c2}${c3}</tr>`
    }

    build_table(path1, path2) {
        let maxi = Math.max(path1.length, path2.length)
        return `<table id="output-table">
    ${this.header()}
    ${ [...Array(maxi).keys() ].map( (i) => this.build_row(path1, path2, i) ).join('')
    }
    </table>
        `
    }
}

function round(x) {
    // trim a floating point number
    return parseFloat(x.toExponential(3))
}

function add_td(elt, value) {
    let td = document.createElement("td")
    td.innerHTML = round(value)
    elt.appendChild(td)
}

function format_row(i, row, tr) {
    // console.log("row", i, ":", row)
    if (row) {
        add_td(tr, row.t)
        add_td(tr, row.x)
        add_td(tr, row.y)        
    } else {
        let td = document.createElement("td")
        td.setAttribute("colspan", 3)
        // td.innerHTML = "(empty)"
        tr.appendChild(td)
    }
}

function build_multipath_table(table, paths, fmtfn) {
    // assume row i in both paths correspond to the same time
    // assume table is empty of data rows
    // fmt is the function which formats a row from a path
    let lengths = paths.map( (a) => a.length )
    let maxi = Math.max( ...lengths )
    for (let i = 0; i < maxi; ++i) {
        let tr = document.createElement("tr")
        for (let path of paths) {
            fmtfn( i, (i < path.length ? path[i] : null), tr)
        }
        table.appendChild(tr)
        // console.log("appending row", tr, "to", table)
    }
}

function enable_copy_btn() {
    let btn = document.getElementById("copy-btn")
    if (btn) {
        btn.style.display = "";
        btn.disabled = false;
        btn.onclick = copy_table;
    }
}

function disable_copy_btn() {
    let btn = document.getElementById("copy-btn")
    if (btn) {
        btn.style.display = "none"
        btn.disabled = true
    }
}

function copy_table() {
    let table = document.getElementById("output-table")
    if (table) {
        let range = document.createRange()
        let sel = window.getSelection()
        sel.removeAllRanges()
        range.selectNodeContents(table)
        sel.addRange(range)
        document.execCommand('copy')
    } else {
        alert("Unable to find data table")
    }
}

function form_get(id) {
    let field = document.getElementById(id);
    if (field) {
        return parseFloat(field.value)
    }
    throw 'unable to find input field '+id;
}

function set_field(field_id, value) {
    let elt = document.getElementById(field_id)
    if (!elt) {
        throw ("unable to find input field "+field_id)
    } else {
        elt.value = value
    }
}

function handle_kform(event) {
    try {
        let B = form_get("B")
        let D = form_get("D")
        let L = form_get("L")
        let F = form_get("F")
        let K1 = form_get("K1")
        let K2 = form_get("K2")
        let K3 = form_get("K3")
        let K = K1*B*D*D + K2*L*D + K3*F
        let Rf = K*200*200
        let K1BD2 = K1*B*D*D
        let K2LD = K2*L*D
        let K3F = K3*F
        set_field("K", K.toExponential(5) )
        set_field("K1BD2", K1BD2.toExponential(5))
        set_field("K2LD", K2LD.toExponential(5))
        set_field("K3F", K3F.toExponential(5))
        set_field("Rf", Rf)
    } catch(ex) {
        alert("Error: "+ex)
        console.error(ex)
    } 
    event.preventDefault();
}

let FORM_DEFAULTS = {
    K1: 1.3e-6,
    K2: 3.5e-8,
    K3: 7.7e-8,
    dt: 0.01,
    endtime: 5.0,
    angle: 0,
    height: 3.0,
    speed: 200,
    weight: 100,
    drag: 0,
    D: 5.0/16.0,
    L: 26.0,
    F: 7.5,
}

var The_RK4_Path = []
var The_Simple_Path = []

function handle_tform(e) {
    // handle the trajectory form
    try {
        let drag = form_get("drag")
        let weight = form_get("weight")/7000
        let height = form_get("height")
        let speed = form_get("speed")
        let angle = form_get("angle")
        let dt = form_get("dt")
        let endtime = form_get("endtime")
        let niters = Math.ceil( endtime / dt )

        // computation are in lbs, feet, seconds
    
        let gravity_g = 32.17
        let x_d = speed*Math.cos(angle*Math.PI/180)
        let y_d = speed*Math.sin(angle*Math.PI/180)
        let x0 = 0
        let y0 = height
        let Y0 = [x_d, y_d, x0, y0]

        let G = new Gdrag(gravity_g, weight/gravity_g, drag)

        let rk4_path = simulate_RK4(niters, Y0, 0, G, dt)
        let simple_path = simulate_simple(niters, Y0, 0, G, dt)
        
        The_RK4_Path = rk4_path
        The_Simple_Path = simple_path

        let layout = { xaxis: { title: "Distance (ft)" } ,
                       yaxis: { title: "Height (ft)" }
                     }

        let rk4_trace = build_xy_trace(rk4_path)
        rk4_trace.mode = "lines"
        rk4_trace.name = "RK4"

        let simple_trace = build_xy_trace(simple_path)
        simple_trace.mode = "lines"
        simple_trace.name = "Simple"

        Plotly.newPlot('myDiv', [rk4_trace, simple_trace], layout)

        let info = { mass: weight/gravity_g, height: height }

        // Populate the output table
        let div = document.getElementById('output-table-div')
        if (div) {
            div.style.display = ""
        }
        enable_copy_btn()

        if (0) {
            let table = document.getElementById('output-table')
            if (table) {
                remove_all_data_rows(table)
                build_multipath_table(table, [rk4_path, simple_path], format_row)
            } else {
                alert("unable to find output table")
            }
        } else {
            let b = new TableBuilder()
            div.innerHTML = b.build_table(rk4_path, simple_path)
        }
    } catch (ex) {
        alert("Error: "+ex)
        console.error(ex)
    }
    e.preventDefault();
}

function initialize() {
    document.addEventListener("DOMContentLoaded", () => {
        let form = document.getElementById("trajectory-form")
        // console.log("form =", form)
        if (form) {
            form.addEventListener("submit", handle_tform, false);
        } else {
            console.error("compute-form not found!")
        }
        for (const k in FORM_DEFAULTS) {
            let field = document.getElementById(k)
            if (field) {
                field.value = FORM_DEFAULTS[k]
            } else {
                console.warn("field named", k, "not found")
            }
        }
        let kform = document.getElementById("drag-form")
        if (kform) {
            kform.addEventListener("submit", handle_kform, false)
        } else {
            console.warn("drag-form not found")
        }
        let div = document.getElementById('output-table-div')
        if (div) {
            div.style.display = "none"
        }
    })
}

initialize()
