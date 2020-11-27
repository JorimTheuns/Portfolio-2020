//import peasy.*;

//PeasyCam camera;

let r = 1;
let aout = 0.5;
let aout1 = 0.5;
//let aout2 = 0.5;

let bout = 0.5;
let bout1 = 0.5;
//let bout2 = 0.5;

let cout = 0.5;
let cout1 = 0.5;
//let cout2 = 0.5;

//PFont font;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1.0);
  background(0, 0.1);
  strokeWeight(2);
}

function draw() {
  background(0,0.03);
  rectMode(CENTER);
    textAlign(CENTER, CENTER);
  textSize(12);
  push();
  fill(255);
  noStroke();
  textSize(24);
  text("Perlin noise", width/6, height-50);
  text("Logistic function", 2*width/4, height-50);
  text("Randomness", (width/6)*5, height-50);
  pop();
  //push();
  //translate(0, 0, 800);
  //translate(50, 50, 50);
  //rotateY(millis()/1000.0);
  //translate(-50, -50, -50);
  for (let j = 20; j < 80; j++) {
    r = (j/20.0);
    let strokeHue = r/4.0;
    stroke(strokeHue, 1, 1);
    for (let i = 0; i < 7; i++) {
      aout2 = aout1;
      aout1 = aout;
      aout = noise(millis()/(r*1000.0));
      point(aout*width/3, aout2*(height-100));
    }
  }
  for (let j = 20; j < 80; j++) {
    r = (j/20.0)+random(0.001);
    let strokeHue = r/4.0;
    stroke(strokeHue, 1, 1);
    for (let i = 0; i < 7; i++) {
      bout2 = bout1;
      bout1 = bout;
      bout = r*bout*(1-bout);
      point(bout*(width/3)+(width/3), bout2*(height-100));
    }
  }
  //pop();
  //push();
  //translate(1500, 0, 0);
  //translate(500, 500, 500);
  //rotateY(millis()/10000.0);
  //translate(-500, -500, -500);
  for (let j = 20; j < 80; j++) {
    r = (j/20.0);
    let strokeHue = r/4.0;
    stroke(strokeHue, 1, 1);
    for (let i = 0; i < 7; i++) {
      cout2 = cout1;
      cout1 = cout;
      cout = random(1);
      point(cout*(width/3)+(width/3)+(width/3), cout1*(height-100));
    }
  }
  //pop();
  //pop();*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}