
let t = 0

// eslint-disable-next-line
function setup() {
    createCanvas(640, 360)
}

// eslint-disable-next-line
function draw() {
    background(127)

    let n = noise(t)
    let x = map(n, 0, 1, 0, width)
    ellipse(x, 180, 16, 16)

    t = t + 0.03
}

