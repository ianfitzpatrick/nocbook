
// eslint-disable-next-line
function setup() {
    createCanvas(640, 360)
    background(0)
}

// eslint-disable-next-line
function draw() {

    // Get gaussian random numer w/ mean of 0, standard deviation 1.0

    let sd = 60
    let mean = width/2

    let xdev = (randomGaussian() * sd)
    let xloc =  xdev + mean

    fill(255, 114, 245, 5)
    noStroke()
    ellipse(xloc, height/2, 32, 32)
}