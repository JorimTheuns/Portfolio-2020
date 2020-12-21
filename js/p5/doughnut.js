
let sqrtN;
let totalNodes;
let N;
let pts;
let angle;
let count;

// lathe segments
let segments;
let latheAngle;
let latheRadius;
let radius;

let highlight_col;
let other_col;
let background_col;
let cube_col;

//vertices
let vertices;
let vertices2;

// for shaded or wireframe rendering 
let isWireFrame;

// for optional helix
let isHelix;
let helixOffset;

let strokeW;

function setup() {
  sqrtN = 10;
  totalNodes  = sqrtN*sqrtN;
  N = ceil(sqrt(totalNodes));
  pts = 25; 
  angle = 0.0;
  count = 0;

// lathe segments
  segments = 1000/pts;
  latheAngle = 0;
  latheRadius = 500;
  radius = (latheRadius/(segments/pts))/2;
  highlight_col= color("#DFE3E3");
  other_col= color("#3A3A37");
  background_col= color("#ffffff");
  cube_col= color("#F1F3F5");

// for shaded or wireframe rendering 
  isWireFrame = true;

// for optional helix
  isHelix = false;
  helixOffset = 5.0;
  
  strokeW = 1;
  
  vertices = [];
  vertices2 = [];
  
  createCanvas(windowWidth, windowHeight, WEBGL)
  smooth(8);
}

function draw() {
  background(background_col);
  // basic lighting setup
  lights();
  var moveX = map(mouseX, 0, width, -width, width);
  var moveY = map(mouseY, 0, height, -height, height);
  //console.log(camera());
  camera(moveX,moveY,500,-width/2,0,0,0,1,0);
  push();
  fill("#ffffff");
  noStroke();
  rotateZ(frameCount*0.01);
  translate(latheRadius-(radius/2), 0, 0);
  //pointLight(255, 255, 255, 0, 0, 0);
  //pointLight(255, 255, 255, 0, 0, -radius);
  //pointLight(255, 255, 255, 0, 0, radius);
  //sphere(10);
  translate(radius*1.7, 0, 0);
  //pointLight(255, 255, 255, 0, 0, 0);
  //sphere(10);
  //sphere(20);
  pop();

  // 2 rendering styles
  // wireframe or solid
  if (isWireFrame) {
    stroke(highlight_col);
    //noStroke();
    fill(highlight_col);
    noFill();
  } else {
    noStroke();
    fill(other_col);
  }
  //center and spin toroid
  //translate(width/2, height/2, -100);

  //rotateX(frameCount*PI/3000);
  //rotateY(frameCount*PI/500);
  //rotateZ(frameCount*PI/2000);

  // initialize polet arrays

  // fill arrays
  for (let i=0; i<=pts; i++) {
    vertices[i] = createVector();
    vertices[i].x = latheRadius + sin(radians(angle))*radius;
    vertices[i].z = cos(radians(angle))*radius;
    angle=((360.0/pts)*i)+(frameCount*0.1);
  }

  // draw toroid
  latheAngle = 0+(frameCount*0.05);
  for (let i=1; i<=segments; i++) {
    for (let j=0; j<=pts; j++) {
      push();
      vertices2[j] = createVector();
      vertices2[j].x = cos(radians(latheAngle))*vertices[j].x;
      vertices2[j].y = sin(radians(latheAngle))*vertices[j].x;
      vertices2[j].z = vertices[j].z;
      translate(vertices2[j].x, vertices2[j].y, vertices2[j].z);
      //rotateZ(-latheAngle);
      rotateZ(radians(latheAngle));
      rotateY(radians((((360.0/(pts))*j)-(360.0/pts))+(frameCount*0.1)));
      //println(latheAngle);
      fill(cube_col);
      //noStroke();
      strokeWeight(strokeW);
      if (j>0) {
        box(25);
      }
      pop();
    }
    latheAngle=((360.0/segments)*i)+(frameCount*0.05);
  }
  //println(count);
  for (let i=0; i<=segments; i++) {
    noFill();
    //fill(255, 255, 255);
    strokeWeight(strokeW);
    beginShape(QUAD_STRIP);
    for (let j=1; j<=pts; j++) {
      vertex(vertices2[j].x, vertices2[j].y, vertices2[j].z);
      vertices2[j].x = cos(radians(latheAngle))*vertices[j].x;
      vertices2[j].y = sin(radians(latheAngle))*vertices[j].x;
      vertices2[j].z = vertices[j].z;
      vertex(vertices2[j].x, vertices2[j].y, vertices2[j].z);
    }
    vertex(vertices2[0].x, vertices2[0].y, vertices2[0].z);
    vertices2[0].x = cos(radians(latheAngle))*vertices[0].x;
    vertices2[0].y = sin(radians(latheAngle))*vertices[0].x;
    vertices2[0].z = vertices[0].z;
    vertex(vertices2[0].x, vertices2[0].y, vertices2[0].z);

    latheAngle=((360.0/segments)*i)+(frameCount*0.05);
    endShape();
  }
  /*pushStyle();
  fill(#000000);
  textFont(myFont);
  text("Total Nodes: " + totalNodes, 20, 50);
  text("Divisors: " + N + ", " + totalNodes/N, 20, 100);
  popStyle();*/
  /*if (frameCount%10==0) {
    totalNodes++;
    N=ceil(sqrt(totalNodes));
    set();
  }
  if (totalNodes==101){
    exit();
  }*/
}