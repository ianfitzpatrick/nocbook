
let splash

// eslint-disable-next-line
function setup() {
    createCanvas(640, 360)
    pixelDensity(1)
    colorMode(HSB)
    background(0)
    splash = new Splash() 
    splash.render()
}

// eslint-disable-next-line
function draw() {
}

class Splash {

    constructor() {
        this.x = 0
        this.y = 0
        this.xysd = 60

        this.numDots = 0
        this.numDotsMean = 3000
        this.numDotSd = 2000
        this.dotCount()

        this.dropWidth = 0
        this.dropMeanWidth = 5
        this.dropSd = 4

        this.hSd = 30
        this.sSd = 30

        this.h = random(200, 300)
        this.s = random(40, 100)
        this.b = 100
    }

    generate() {
        this.location()
        this.width()
    }

    dotCount(sd=this.numDotSd) {
        while (this.numDots < 1) {
            let dev = randomGaussian() * sd
            this.numDots = this.numDotsMean + dev
        }
    }

    location(sd=this.xysd) {
        let xdev = randomGaussian() * sd
        let ydev = randomGaussian() * sd

        this.x = (width / 2) + xdev
        this.y = (height /2) + ydev        
    }

    width(sd=this.dropSd) {
        let dev = randomGaussian() * sd
        this.dropWidth = this.dropMeanWidth + dev
    }

    fill(hSd=this.hSd, sSd=this.sSd) {

        let sdev = randomGaussian() * hSd
        let s = this.s + sdev   

        let hdev = randomGaussian() * sSd
        let h = this.h + hdev   

        fill(h, s, this.b)
    }

    render() {

        for (let i=0; i < this.numDots; i++) {
            this.generate()
            noStroke()
            this.fill()
            ellipse(this.x, this.y, this.dropWidth)
        }
    }
}