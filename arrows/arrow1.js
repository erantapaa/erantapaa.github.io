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

function simulate(niters, Y0, t0, G, dt) {
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

function test1(niters = 1000, y0 = 1, theta = 45, v0 = 1, dt = 0.01) {
    let G = new Ggravity(9.8)
    let x_d = v0*Math.cos(theta*Math.PI/180)
    let y_d = v0*Math.sin(theta*Math.PI/180)
    let x0 = 0
    let Y0 = [x_d, y_d, x0, y0]
    let path = simulate(niters, Y0, 0, G, dt)
    return path
}

function plot_xy(path, layout) {
    let xs = []
    let ys = []
    for (let i = 0; i < path.length; ++i) {
        xs.push( path[i].x )
        ys.push( path[i].y )
    }

    Plotly.newPlot('myDiv', [{x: xs, y:ys, mode: 'lines' }], layout)
}

function round(x) {
    // trim a floating point number
    return Math.round(x*1000000)/1000000;
}

function add_td(elt, value) {
    let td = document.createElement("td")
    td.innerHTML = round(value)
    elt.appendChild(td)
}

function create_table(path, info) {
    let mass = info.mass / 7000  // mass in lbs
    let height = info.height // initial height in feet
    let gravity = 32.17 // gravity in ft/sec^2

    // create a table of the path data hanging off of the element root
    let table = document.createElement("table")
    let header = document.createElement("tr")

    let fields = ["i", "t", "x", "y", "x_d", "y_d", "x_dd", "y_dd"]
    let field_titles = [ "<br>step", "t<br>sec.", "x<br>ft", "y<br>ft", "x_d<br>ft/s", "y_d<br>ft/s", "x_dd⨯𝚫t", "y_dd⨯𝚫t",
                         "Drop<br>inches", "Speed<br>ft/s", "KE<br>ft lbf", "Momentum<br>ft lb/sec"]
    for (let f of field_titles) {
        let th = document.createElement("th")
        th.innerHTML = f
        header.appendChild(th)
    }
    table.appendChild(header)

    for (let i = 0; i < path.length; ++i) {
        let tr = document.createElement("tr")
        add_td(tr, i)
        let r = path[i]
        add_td(tr, r.t)
        add_td(tr, r.x)
        add_td(tr, r.y)
        add_td(tr, r.x_d)
        add_td(tr, r.y_d)
        add_td(tr, r.x_dd)
        add_td(tr, r.y_dd)
        let drop = height - r.y // in feet
        add_td(tr, drop*12)
        let velocity = Math.sqrt(r.x_d*r.x_d + r.y_d*r.y_d) // ft/sec
        add_td(tr, velocity)
        let kinetic = 0.5*velocity*velocity*mass / gravity
        add_td(tr, kinetic)
        let momentum = mass*velocity // in foot-pounds per second
        add_td(tr, momentum)

        table.appendChild(tr)
    }
    return table
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
    let table = document.getElementById("the-data-table")
    if (table) {
        let range = document.createRange()
        range.selectNode(table)
        window.getSelection().addRange(range)
        document.execCommand('copy')
    } else {
        alert("Unable to find data table")
    }
}

function install_table(path, info) {

    let div = document.getElementById("myTable")
    // Remove all children of this div
    while (div.lastChild) {
        div.removeChild(div.lastChild)
    }

    let table = create_table(path, info)
    table.setAttribute('id', 'the-data-table')
    div.appendChild(table)
    enable_copy_btn()
}

function form_get(id) {
    let field = document.getElementById(id);
    if (field) {
        return parseFloat(field.value)
    }
    throw 'unable to find input field '+id;
}

function handle_kform(event) {
    try {
        let B = form_get("B")
        let D = form_get("D")/12
        let L = form_get("L")/12
        let F = form_get("F")/144
        let K1 = form_get("K1")
        let K2 = form_get("K2")
        let K3 = form_get("K3")
        let K = K1*B*D*D + K2*L*D + K3*F
        let Kfield = document.getElementById("K")
        if (Kfield) {
            Kfield.value = K
        } else {
            throw "unable to find input field K";
        }
    } catch(ex) {
        alert("Error: "+ex)
        console.error(ex)
    } 
    event.preventDefault();
}

let FORM_DEFAULTS = {
    K1: 0.0000013 * 7000,
    K2: 0.000000035 * 7000,
    K3: 0.000000077 * 7000,
    dt: 0.01,
    endtime: 5.0,
    angle: 0,
    height: 3.0,
    speed: 100,
    weight: 100,
    drag: 0
}

function handle_tform(e) {
    // handle the trajectory form
    try {
        let drag = form_get("drag")
        let weight = form_get("weight")
        let height = form_get("height")
        let speed = form_get("speed")
        let angle = form_get("angle")
        let dt = form_get("dt")
        let endtime = form_get("endtime")
        let niters = Math.ceil( endtime / dt )

        // computation are in grains, feet, seconds
    
        let x_d = speed*Math.cos(angle*Math.PI/180)
        let y_d = speed*Math.sin(angle*Math.PI/180)
        let x0 = 0
        let y0 = height
        let Y0 = [x_d, y_d, x0, y0]

        let G = new Gdrag(32.17, weight, drag)

        path = simulate(niters, Y0, 0, G, dt)

        let layout = { xaxis: { title: "Distance (ft)" } ,
                       yaxis: { title: "Height (ft)" }
                     }

        plot_xy(path, layout)
        let info = { mass: weight, height: height }
        install_table(path, info)

    } catch (ex) {
        alert("Error: "+ex)
        console.error(ex)
    }
    e.preventDefault();
}

function initialize() {
    document.addEventListener("DOMContentLoaded", () => {
        let form = document.getElementById("trajectory-form")
        console.log("form =", form)
        if (form) {
            form.addEventListener("submit", handle_tform, false);
        } else {
            console.error("compute-form not found!")
        }
        for (const k in FORM_DEFAULTS) {
            let field = document.getElementById(k)
            field.value = FORM_DEFAULTS[k]
        }
        let kform = document.getElementById("drag-form")
        if (kform) {
            kform.addEventListener("submit", handle_kform, false)
        } else {
            console.error("drag-form not found")
        }
    })
}

initialize()
