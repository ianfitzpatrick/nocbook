// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/* exported setup */
/* exported draw */

let walker
let debug = false

// eslint-disable-next-line
function setup() { 
    createCanvas(640,360)
    walker = new Walker()
    background(127)
}

// eslint-disable-next-line
function draw() {
    walker.algo()
    walker.render()
}

function keyPressed() {
    if (keyCode == 32) {
        walker.cycle()
    }
}

function consoleXY(obj) {
    if (debug) {
        console.log(`x: ${obj.x}, y: ${obj.y}`) 
    }
}


class Walker {

    constructor() {
        this.x = width/2
        this.y = height/2
        this.label = ''

        this.algos = [
            'step', 'nineStep', 'floatStep', 'badLevyStep', 'exponentialChanceStep',
            'monteCarloStep', 'rightStep', 
        ]
        this.currentAlgo = 0
    }

    algo() {
        let currentAlgo = this.algos[this.currentAlgo]
        this[currentAlgo]()
    }

    cycle() {
        clear()
        background(127)
        this.currentAlgo ++

        if (this.currentAlgo == this.algos.length) {
            this.currentAlgo = 0
        }

        this.x = width/2
        this.y = height/2
        
    }

    render() {
        // fill(random(255), random(255), random(255))
        // ellipse(this.x, this.y, 16, 16)
        stroke(0)
        point(this.x,this.y)


        // fill(0, 102, 153)
        noStroke()
        fill(255, 255, 255)
        textSize(32);
        text(this.label, 20, height - 20)

    }

    step() {
        let choice = floor(random(4))

        if (choice === 0) {
            this.x++
        
        } else if (choice === 1) {
            this.x--
        
        } else if (choice === 2) {
            this.y++
        
        } else {
            this.y--
        }
        
        this.x = constrain(this.x, 0, width - 1)
        this.y = constrain(this.y, 0, height - 1)        

        this.label = 'Step'
    }

    nineStep() {
        let stepX = floor( random(3) ) - 1
        let stepY = floor( random(3) ) - 1

        consoleXY({x: stepX, y: stepY})

        this.x += stepX
        this.y += stepY
        this.label = 'Nine Step'

    }

    floatStep() {
        let stepX = random(-1, 1)
        let stepY = random(-1, 1)

        consoleXY({x: stepX, y: stepY})

        this.x += stepX
        this.y += stepY

        this.label = 'Float Step'
    }

    badLevyStep() {
        let stepX = 0
        let stepY = 0

        if ( random(1) < 0.01 ) {
            stepX = random(-100, 100)
            stepY = random(-100, 100)
        } else {
            stepX = random(-1, 1)
            stepY = random(-1, 1)
        }

        this.x += stepX
        this.y += stepY

        this.label = 'Bad Levy Step'
    }    

    exponentialChanceStep() {
        let stepSize = random(0, 5)

        stepSize = stepSize** 2

        let stepX = random(-stepSize, stepSize)
        let stepY = random(-stepSize, stepSize)

        this.x += stepX
        this.y += stepY

        this.label = 'Exponential Chance Step'

    }

    monteCarlo() {
        while (true) {
            let r1 = random(5)
            let probability = r1
            let r2 = random(5)

            if (r2 < probability) {
                return r1
            }
        }
    }

    monteCarloStep() {

        let stepX = this.monteCarlo()
        let stepY = this.monteCarlo()

        if (random() < 0.5) {
            stepX = stepX * -1
        }

        if (random() < 0.5) {
            stepY = stepY * -1
        }

        this.x += stepX
        this.y += stepY

        this.label = 'Monte Carlo Step'        
    }

    rightStep() {
        let r = random(1)

        if (r < 0.4) {
            this.x++
        } else if ( r < 0.6 ) {
            this.x--
        } else if (r < 0.8) {
            this.y++
        } else {
            this.y--
        }

        this.label = 'Right Step'
    }


}