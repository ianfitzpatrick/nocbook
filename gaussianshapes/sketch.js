// Cumulative drawing, faster
const trippy = true

// eslint-disable-next-line
function setup() {
    createCanvas(750, 750)
    colorMode(HSB)
    background(0, 100, 0)     

    if (trippy) {
        frameRate(10)
    } else {
        frameRate(2)
    }

}

// eslint-disable-next-line
function draw() {

    if (!trippy) {
        background(0, 100, 0)        
    }

    for (let x=0; x < 700; x+=100) {
        for (let y=0; y <700; y+=100) {
            let flower = new Flower(x + 75, y+75, trippy)
        }
    }


}

class Flower {
    
    constructor(x, y, trippy=false) {

        let color = this.generateColor(trippy)
        let size = this.generateSize()

        this.render(x, y, size, color)
    }

    generateColor(trippy) {

        let baseColor = [
            random(200, 300),
            random(40, 100),
            100,
        ]

        let sd = 30

        let color = [
            baseColor[0] + (randomGaussian() * sd),
            baseColor[1] + (randomGaussian() * sd),
            baseColor[2],
            .25
        ]

        if (trippy) {
            color[3] = 0.10
        }

        return color
    }

    generateSize() {
        let meanWidth = 25
        let sd = 10
        let width = (randomGaussian() * sd) + meanWidth
        let height = width + 40

        return {width: width, height: height}
    }

    render(x, y, size, color) {

        noStroke()

        fill(color)

        push()
        translate(x, y)

        for (let i = 0; i < 10; i ++) {
            ellipse(0, 0, size.width, size.height)
            rotate(PI/5)
        }

        pop()
    }

}