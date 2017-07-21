
let walker

// eslint-disable-next-line
function setup() {
    createCanvas(640, 360)
    background(0)
    walker = new Walker()
}

// eslint-disable-next-line
function draw() {
    walker.step()
    walker.render()
}

class Walker {

    constructor() {
        this.tx = 0
        this.ty = 5000
    }

    step() {
        this.x = map(noise(this.tx), 0, 1, 0, width)
        this.y = map(noise(this.ty), 0, 1, 0, height)

        this.tx += 0.02
        this.ty += 0.02
    }

    render() {
        fill(random(255), random(255), random(255))
        ellipse(this.x, this.y, 16, 16)
    }
}