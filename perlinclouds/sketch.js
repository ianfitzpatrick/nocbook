
// eslint-disable-next-line

let y
let drawCount = 0.0

let ndStart = 5
let ndEnd = 9
let nd = ndStart
let ndDir = 'up'

function setup() {
    createCanvas(640, 360)
    background(127)

    pixelDensity(1)

    // render()
}

function draw() {
    render()
    console.log(frameRate())
}

function render() {
    loadPixels()
    noiseDetail(nd)
    let yoff = 0.0 + drawCount

    for (let y = 0; y < height; y++) {
        let xoff = 0.0 + drawCount
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4
            pixels[index] = noiseColor(xoff, yoff) + 50

            pixels[index + 1] = noiseColor(xoff, yoff) + 100
            pixels[index + 2] = noiseColor(xoff, yoff) + 100
            pixels[index + 3] = 255

            xoff = xoff + 0.005
        }
        yoff = yoff + 0.005
    }    
        
    drawCount = drawCount + 0.1
    

    if (ndDir == 'up' && nd < ndEnd) {
        nd += 1
    } else if (ndDir == 'down' && nd > ndStart) {
        nd -= 1
    } else if (nd == ndEnd) {
        nd -=1
        ndDir = 'down'
    } else if (nd == ndStart) {
        nd += 1
        ndDir = 'up'
    }

    console.log(nd)

    updatePixels()

}

function renderSimple() {
    loadPixels()

    let xoff = 0.0
    for (let x = 0; x < width; x++) {

        let yoff = 0.0
        for (let y = 0; y < height; y++) {

            let index = (x + y * width) * 4
            pixels[index] = map(noise(xoff, yoff), 0, 1, 0, 255)
            pixels[index + 1] = 0
            pixels[index + 2] = 0
            pixels[index + 3] = 255

            yoff = yoff + 0.01
        }
        xoff = xoff + 0.01
    }    
    
    updatePixels()

}

function noiseColor(x, y) {
    return map(
        noise(x, y),
        0, 1,
        0, 255)
}