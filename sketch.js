
  // All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

// pet friend drawings
let restAnimation;
let speakAnimation;
let frames = [];
let upsetAnimation;
let smileAnimation;
let cloud;
let plant;
let grass;
let grassx;
let grassy;

// preload drawing files
function preload() {
  restAnimation = loadAnimation("assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png");
  smileAnimation = loadAnimation('assets/Tamagotchi smile/sprite_0.png', 'assets/Tamagotchi smile/sprite_1.png', 'assets/Tamagotchi smile/sprite_2.png', 'assets/Tamagotchi smile/sprite_3.png', 'assets/Tamagotchi smile/sprite_4.png', 'assets/Tamagotchi smile/sprite_5.png', 'assets/Tamagotchi smile/sprite_6.png', 'assets/Tamagotchi smile/sprite_7.png', 'assets/Tamagotchi smile/sprite_8.png', 'assets/Tamagotchi smile/sprite_9.png', 'assets/Tamagotchi smile/sprite_10.png', 'assets/Tamagotchi smile/sprite_11.png', 'assets/Tamagotchi smile/sprite_12.png', 'assets/Tamagotchi smile/sprite_13.png');
  speakAnimation = loadAnimation('assets/Tamagotchi talks/sprite_0.png', 'assets/Tamagotchi talks/sprite_1.png', 'assets/Tamagotchi talks/sprite_2.png', 'assets/Tamagotchi talks/sprite_3.png', 'assets/Tamagotchi talks/sprite_4.png');
  upsetAnimation = loadAnimation('assets/Tamagotchi  upset/sprite_0.png', 'assets/Tamagotchi  upset/sprite_1.png', 'assets/Tamagotchi  upset/sprite_2.png', 'assets/Tamagotchi  upset/sprite_3.png');
  cloud = loadImage('assets/cloud/cloud-1.png');
  plant = loadImage('assets/plant/plant.png');
  grass = loadImage('assets/plant/grass.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  current = createVector(0,0);
  previous = createVector(0,0);
}

function draw() {
  background(249, 255, 143);

  // draw digital pet friend
  animation(restAnimation, width/2, height/2);

  // draw world
  //image(plant,width/10, height/2,200,200);
  //image(plant,width/5, height/6,200,200);

  for(var y = 550; y<height; y+=150){
    for(var x = 20; x<width; x+=150){
  image(grass, x, y,100,100);
  }
}
  //image(grass,grassx, height/2+200,100,100);
  //image(grass,grassx, height/2+100,100,100);

  image(cloud,100, 100,100,100);

  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop
function mouseReleased() {
  painting = false;
}

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(50);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

// Display plath
Path.prototype.display = function() {

  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
  this.size = 10;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan = this.lifespan-1;
  //this.size = this.size+0.05;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  noStroke();
  fill(random(255), random(255), random(255), this.lifespan*2);
  rect(this.position.x,this.position.y-(this.size*20), this.size, this.size);
  //println(this.lifespan);
  // If we need to draw a line
  //if (other) {
  //  line(this.position.x, this.position.y, other.position.x, other.position.y);
  //}
}
