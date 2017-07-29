int w = 1400;
int h = 1000;
int cols;
int rows;
int scl = 20;
float flying = 0;
float [][] terrain;

void setup() {
  size(600, 600, P3D);
 
    cols = w / scl;
    rows = h / scl;
  
    terrain = new float[cols][rows];
    
    // Initialize terrain array
    for (int x = 0; x < cols; x++) {
        for (int y = 0; y < rows; y++) {             
            terrain[x][y] = 0;
        }
    }
    fill(102, 204, 255, 80);
}

void draw() {
 flying -= 0.3;
    float yoff = flying;

    for (int y = 0; y < rows; y++) {
        float xoff = 0;

        for (int x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 150);
            xoff += 0.2;
        }
        yoff += 0.2;
    }

    translate(0, 400);
    background(0);
    noStroke();
    
    rotateX(PI/3);
    translate(-w / 3, -h /3 );
  
    for (int y = 0; y < rows-1; y++) {
        beginShape(TRIANGLE_STRIP);
        
        for (int x = 0; x < cols; x++) {
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
        }
        endShape();
    }
}

