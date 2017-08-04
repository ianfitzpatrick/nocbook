
// eslint-disable-next-line

let y
let drawCount = 0.0

let ndStart = 5
let ndEnd = 9
let nd = ndStart
let ndDir = 'up'
let zoff = 100

function setup() {
    createCanvas(640, 360)
    background(127)
    colorMode(HSB)

    pixelDensity(1)
    noiseSeed(99)
    noisejs.seed(99)

    // render()
}

function draw() {

    // renderSimpleAnimated(zoff)
    render()
    // renderSimple()
    zoff += 0.05
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

    updatePixels()

}

function renderSimple() {
    loadPixels()

    let xoff = 0.0
    for (let x = 0; x < width; x++) {

        let yoff = 0.0
        for (let y = 0; y < height; y++) {

            let index = (x + y * width) * 4
            pixels[index] = map(noise(xoff, yoff), 0, 1, 0, 359)
            pixels[index + 1] = map(noise(xoff, yoff), 0, 1, 0, 100)
            pixels[index + 2] = map(noise(xoff, yoff), 0, 1, 80, 100)
            pixels[index + 3] = 255

            yoff = yoff + 0.01
        }
        xoff = xoff + 0.01
    }    
    
    updatePixels()
}

function renderSimpleAnimated(zoff) {
    loadPixels()

    let xoff = 0.0
    for (let x = 0; x < width; x++) {

        let yoff = 0.0
        for (let y = 0; y < height; y++) {

            let index = (x + y * width) * 4
            pixels[index] = map(noisejs.perlin3(xoff, yoff, zoff), -1, 1, 0, 359)
            pixels[index + 1] = map(noisejs.perlin3(xoff, yoff, zoff), -1, 1, 0, 100)
            pixels[index + 2] = map(noisejs.perlin3(xoff, yoff, zoff), -1, 1, 80, 100)
            pixels[index + 3] = 255

            yoff = yoff + 0.01
        }
        xoff = xoff + 0.01
    }    
    
    updatePixels()
}

function noiseColor(x, y) {
    let noiseVal = noisejs.perlin2(x, y)
    // let noiseVal = noise(x, y)
    // console.log(noiseVal)
    return map(        
        noiseVal,
        -1, 1,
        0, 255)
}