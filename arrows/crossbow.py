import math

gravity_g = 32.22 # gravity in ft/s^2

K1 = 0.0000013
K2 = 3.5e-8
K3 = 7.7e-8

# Arrow dimensions

B = 1.0
D = 0.35 # shaft diameter (inches)
L = 20 # shaft length (inches)
Typ = 1
lf = 3.0 # fletching length (inches)
hf = 0.45 # fletching height (inches)
F = 3*lf*hf*Typ
V0 = 200 # initial speed
Wgrains = 100 # weight in grains
mass = Wgrains / 7000 / gravity_g

Vx = V0
Vy = 0
X = 0
Y = 0
D2 = D*D
Rf1 = K1*B*D*D + K2 * L * D + K3 * F
h = 0.01

def doit():
    XT = 300
    t = 0
    X = 0
    Y = 0
    h = 0.01
    Rf1 = K1*B*D*D + K2 * L * D + K3 * F
    Vx = V0
    Vy = 0
    V = V0

    nextX = 30
    while XT > X:
        t += h
        Rf = Rf1 * V * V
        Vx  = Vx - h * Rf * Vx / V / mass
        Vy = Vy - h*(gravity_g - Rf * Vy / V / mass)
        newX = X + h*Vx
        emit = newX >= nextX
        X += h * Vx
        Y += h * Vy
        V = math.sqrt(Vx*Vx + Vy*Vy)
        drop = abs( Y*12 ) # drop in inches
        if emit:
            print("{:.2f}  {:.5f}  {:.5f}  {:4.1f}".format(t, X, Y, drop) )
            nextX += 30
doit()

