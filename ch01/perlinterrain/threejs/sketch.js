/*global THREE cube scene rendere*/

let w = 1000
let h = 600
let cols, rows
let scl = 20
let flying = 0
let terrain = []
let canvas = {w: 600, h: 600}

let scene, camera, renderer, geometry, material


function setup() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 75, canvas.w/canvas.h, 0.1, 1000 )
    renderer = new THREE.WebGLRenderer()
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    renderer.setSize( canvas.w, canvas.h )
    document.body.appendChild( renderer.domElement )


    camera.position.z = 5

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


let animate = function() {
    requestAnimationFrame( animate )

    vertexMethod()
    renderer.render(scene, camera)
}

function vertexMethod() {

    geometry = new THREE.Geometry()
    // Update terrain array
    flying -= 0.3
    let yoff = flying

    for (let y = 0; y < rows; y++) {
        let xoff = 0

        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noisejs.perlin2(xoff, yoff), -1, 1, -100, 150)
            xoff += 0.2
        }
        yoff += 0.2
    }

    // translate(0, 100)
    // background(0)
    
    // rotateX(-PI/3)
    // translate(-w / 2, -h / 2)
    geometry = new THREE.Geometry()
    for (let y = 0; y < rows-1; y++) {
        
        let index = 0

        for (let x = 0; x < cols; x++) {            
            geometry.vertices.push(
                // new THREE.Vector3( x*scl, y*scl, terrain[x][y] ),
                // new THREE.Vector3( x*scl, (y+1)*scl, terrain[x][y+1])

                new THREE.Vector3( x * -scl,  y * scl, 0 ),
                new THREE.Vector3( x * -scl, y * -scl, 0 ),
                new THREE.Vector3( x * scl, y * -scl, 0 ),

            )

            geometry.faces.push( new THREE.Face3( index, index + 1, index + 2 ))
            index += 3
        } 
    }
    let mesh = new THREE.Mesh( geometry, material )
    mesh.drawMode = THREE.TriangleStripDrawMode
    scene.add(mesh)

}

setup()
animate()
