
let w = 1400
let h = 1000
let cols, rows
let scl = 20
let flying = 0

let terrain = []

// eslint-disable-next-line
function setup() {
    createCanvas(600, 600, WEBGL)
    cols = w / scl
    rows = h / scl

    // Initialize terrain array
    for (let x = 0; x < cols; x++) {
        terrain[x] = []
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0
        }            
    }

}

// eslint-disable-next-line
function draw() {

    // Update terrain array
    flying -= 0.3
    let yoff = flying

    for (let y = 0; y < rows; y++) {
        let xoff = 0

        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 150)
            xoff += 0.2
        }
        yoff += 0.2
    }

    translate(0, 100)
    background(0)
    
    rotateX(-PI/3)
    translate(-w / 2, -h / 2)

    for (let y = 0; y < rows-1; y++) {
        beginShape(TRIANGLE_STRIP)
        
        for (let x = 0; x < cols; x++) {
            fill(102, 204, 255, 80)
            vertex(x*scl, y*scl, terrain[x][y])
            vertex(x*scl, (y+1)*scl, terrain[x][y+1])
        }
        endShape()
    }

}