function isEmpty(e) {
	return "" == e || null == e ? !0 : !1
}

function inRange(e, r, t) {
	var o = parseFloat(e, 10);
	return o < parseFloat(r, 10) || o > parseFloat(t, 10) ? !1 : !0
}

function validateInput(e, r, t) {
	var o = parseFloat(e.value, 10);
	return isEmpty(o) ? (alert("Be sure to enter a data value."), select(e), !1) : isNaN(o) ? (alert("Please make sure all the fields above are filled before clicking Calculate Ballistics"), select(e), !1) : inRange(o, r, t) ? !0 : (alert("Enter a number between " + r + " and " + t + "."), select(e), !1)
}

function select(e) {
	e.focus(), e.select()
}

function fmt(value, digits) {
	let tens = Math.pow(10, digits)
	return Math.round(value*tens)/tens
}

function update_row(form, suffix, X, Y, V, m) {
	/*
	form.A_Dropone.value = (Math.round(Y * 12) + " ");
	form.A_Speedone.value = (Math.round(V) + " ");
	form.A_Energyone.value = (Math.round(0.5 * m * V * V) + " ");
	form.A_Momentum.value = ((m * V) + " ")
	*/
	form["A_Drop"+suffix].value = fmt(Y*12, 2)+" "
	form["A_Speed"+suffix].value = fmt(V, 3)+" "
	form["A_Energy"+suffix].value = fmt(0.5*m*V*V, 3) + " "
	form["A_Moment"+suffix].value = fmt(m*V, 5)+" "
}

function tablegen(form) {
	console.log("using calculator-new2")
	var pi = Math.PI,
		g = 32.22,
		d_air = .00233,
		v_air = 164e-6,
		h = .01,
		V, Vo, Vx, Vy, X, Y, XT = 329,
		t, h, m, W, L, D, R, lf, hf, Typ, D2, D, F, Rf, Rf1, K1, K2, K3;
	if(!(validateInput(form.Arrow_Speed2, 100, 1e3) && validateInput(form.Arrow_Weight2, 100, 1e3) && validateInput(form.A_Lgth, 1, 50) && validateInput(form.F_Lgth, 1, 10) && validateInput(form.F_Hgt, .1, 1))) return !1;
	for(Vo = parseFloat(form.Arrow_Speed2.value),
	    m = parseFloat(form.Arrow_Weight2.value) / 7e3 / 32.22,
		W = parseFloat(form.Arrow_Weight2.value) / 7e3,
		L = parseFloat(form.A_Lgth.value),
		R = .175,
		D = .35,
		lf = parseFloat(form.F_Lgth.value),
		hf = parseFloat(form.F_Hgt.value),
		t = 0,
		V = Vo,
		Vx = Vo,
		Vy = 0,
		X = 0,
		Y = 0,
		update_row(form, "0", X, Y, V, m),
		/*
		form.A_Dropzero.value = Y + " ",
		form.A_Speedzero.value = V + " ",
		form.A_Energyzero.value = Math.round(.5 * m * V * V) + " ",
		form.A_Momentzero.value = m * V + " ",
		*/
		Typ = 1,
		D2 = D * D,
		F = 3 * lf * hf * Typ,
		B = 1,
		K1 = 13e-7,
		K2 = 3.5e-8,
		K3 = 7.7e-8,
		Rf1 = K1 * B * D2 + K2 * L * D + K3 * F; XT > X;) {
			t += h
			Rf = Rf1 * V * V
			Vx -= h * Rf * Vx / V / m
			Vy -= h * (g - Rf * Vy / V / m)
			X += h * Vx
			Y += h * Vy
			V = Math.sqrt(Vx * Vx + Vy * Vy)

			let r = Math.floor(X/30)
			if (r <= 10) {
				update_row(form, (r+1)+"", X, Y, V, m)
			}
		}
}

function add_tr(table, yards, suffix) {
	let tr = document.createElement("tr")
	tr.setAttribute("align", "center")
	let td = document.createElement("td")
	td.innerHTML = yards
	tr.appendChild(td)
	for (let fld of ["Drop", "Speed", "Energy", "Moment"]) {
		td = document.createElement("td")
		let inp = document.createElement("input")
		inp.setAttribute("type", "text")
		inp.setAttribute("name", "A_"+fld+suffix)
		inp.setAttribute("size", 5)
		td.appendChild(inp)
		tr.appendChild(td)
	}
	table.appendChild(tr)
}

document.addEventListener("DOMContentLoaded", () => {
	let tbl = document.getElementById("trajectory-table")
	if (tbl) {
		for (let y = 0; y <= 11; ++y) {
			add_tr(tbl, y*10, y+"")
		}
	} else {
		console.error("unable to find trajectory table")
	}
})
/*
<tr align="center">
<td width="20%" align="center">0</td>
<td width="20%" align="center"><input TYPE="text" NAME="A_Dropzero" size="5"></td>
<td width="20%" align="center"><input TYPE="text" NAME="A_Speedzero" size="5"></td>
<td width="20%" align="center"><input TYPE="text" NAME="A_Energyzero" size="5"></td>
<td width="20%" align="center"><input TYPE="text" NAME="A_Momentzero" size="5"></td>
</tr>
*/