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
fill(102, 204, 255, 80)

}

function draw() {
    // planeMethod()
    vertexMethod()
}

// Experimental Way
function planeMethod() {

    // Update terrain array
    flying -= 1
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

    customPlane(w, h, rows, cols, terrain)
}

// Original Way
function vertexMethod() {

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
            vertex(x*scl, y*scl, terrain[x][y])
            vertex(x*scl, (y+1)*scl, terrain[x][y+1])
        }
        endShape()
    }
}


// Modified custom plane to except terrain param (Z value given x y coords)
p5.prototype.customPlane = function(){
    var args = new Array(arguments.length)

    for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i]
    }

    var width = args[0] || 50
    var height = args[1] || width
    var detailX = typeof args[2] === 'number' ? args[2] : 1
    var detailY = typeof args[3] === 'number' ? args[3] : 1
    var terrain = args[4]

    var gId = 'plane|'+width+'|'+height+'|'+detailX+'|'+detailY+'|'+terrain

    if(!this._renderer.geometryInHash(gId)){
        var _plane = function(){
            var u,v,p
            
            for (var i = 0; i <= this.detailY; i++){
                v = i / this.detailY
    
                for (var j = 0; j <= this.detailX; j++){
                    u = j / this.detailX
                    p = new p5.Vector(
                        (width * u - width/2) ,
                        height * v - height/2,
                        terrain[j][i])
                    this.vertices.push(p)
                    this.uvs.push([u,v])
                }
            }
        }

        var planeGeom = new p5.Geometry(detailX, detailY, _plane)
        planeGeom.computeFaces().computeNormals()
        this._renderer.createBuffers(gId, planeGeom)
    }

    this._renderer.drawBuffers(gId)

}
