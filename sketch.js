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
let upsetAnimation;
let smileAnimation;
let cloud;
let plant;
let grass;
let grassx;
let grassy;
let animationTags = [];
let currentAnimation = 0;
let pet;
let scl = 50;
let synth;
let envelope;
let note = 0;
let happyMelody = ['C3', 'G4', 'D4', 'C3', 'A3', 'G3', 'C4', 'C2'];
let sadMelody = ['D2', 'E2', 'C1', 'F#2', 'Gb1', 'Db2', 'C2'];
let glitch;
let imgSrc = 'assets/Tamagotchi  upset/sprite_2.png';
let emotion;
let detoon = 0;
const faceDetector = new FaceDetector();
let happinessMeter;

// preload drawing files
function preload() {
  happyAnimation = loadAnimation("assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png", "assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png", 'assets/Tamagotchi smile/sprite_0.png', 'assets/Tamagotchi smile/sprite_1.png', 'assets/Tamagotchi smile/sprite_2.png', 'assets/Tamagotchi smile/sprite_3.png', 'assets/Tamagotchi smile/sprite_4.png', 'assets/Tamagotchi smile/sprite_5.png', 'assets/Tamagotchi smile/sprite_6.png', 'assets/Tamagotchi smile/sprite_7.png', 'assets/Tamagotchi smile/sprite_8.png', 'assets/Tamagotchi smile/sprite_9.png', 'assets/Tamagotchi smile/sprite_10.png', 'assets/Tamagotchi smile/sprite_11.png', 'assets/Tamagotchi smile/sprite_12.png', 'assets/Tamagotchi smile/sprite_13.png');
  upsetAnimation = loadAnimation('assets/Tamagotchi  upset/sprite_0.png', 'assets/Tamagotchi  upset/sprite_1.png', 'assets/Tamagotchi  upset/sprite_2.png', 'assets/Tamagotchi  upset/sprite_3.png');
  cloud = loadImage('assets/cloud/cloud-1.png');
  plant = loadImage('assets/plant/plant-1.png');
  grass = loadImage('assets/plant/grass.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  current = createVector(0, 0);
  previous = createVector(0, 0);

  // Matt's
  frameRate(30);
  pet = createSprite(width / 2, height / 2, scl, scl);
  pet.addAnimation('upset', upsetAnimation);
  pet.addAnimation('happy', happyAnimation);
  loadImage(imgSrc, function(img) {
    glitch = new Glitch(img);
  });
  envelope = new p5.Env();
  envelope.setRange(1, 0);
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
      type: "triangle"
    },
    polyphony: 8,
    volume: 0,
    detune: 0,
  }).toMaster();
  emotion = 'happy';

  faceDetector.setup();
}

function draw() {
  if (frameCount % 15 === 0) {
    faceDetector.update();
  }

  const happinessLevel = faceDetector.getHappinessLevel();
  emotion = happinessLevel > 0.5 ? 'happy' : 'sad';

  background(249, 255, 143);

  if (emotion === 'sad' && glitch) {
    background(255);
    drawSprites();
    glitch.show();
    pet.changeAnimation('upset');
  }
  if (emotion === 'happy') {
    background(249, 255, 143);
    drawSprites();
    pet.changeAnimation('happy');
    for (var y = 550; y < height; y += 150) {
      for (var x = 20; x < width; x += 150) {
        image(grass, x, y, 100, 100);
      }
    }

    image(cloud, 100, 100, 100, 100);
  }
  playSynth();


  // draw world



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
  for (var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }

  // Draw happiness bar
  fill(emotion === 'sad' ? 'red' : 'green');
  rect(0, 0, 200 * happinessLevel, 20);
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
      this.particles[i].display(this.particles[i + 1]);
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
  this.lifespan = this.lifespan - 1;
  //this.size = this.size+0.05;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  noStroke();
  fill(random(255), random(255), random(255), this.lifespan * 2);
  rect(this.position.x, this.position.y - (this.size * 20), this.size, this.size);
  //println(this.lifespan);
  // If we need to draw a line
  //if (other) {
  //  line(this.position.x, this.position.y, other.position.x, other.position.y);
  //}
}



function playSynth() {
  if (emotion === 'happy') {
    detoon = 0;
    synth.volume.value = 0;
    synth.detune.value = 0;
    if (frameCount % 10 === 0) {
      synth.triggerAttackRelease([happyMelody[note]], "16n");
      note++
      if (note > happyMelody.length - 1) {
        note = 0;
      }
    }
  }
  if (emotion === 'sad') {
    synth.volume.value = -10;
    synth.detune.value = detoon;
    synth.triggerAttackRelease([happyMelody[note]], "4n");
    note++
    if (note > sadMelody.length - 1) {
      note = 0;
    }
    detoon++;
  }
}


function changeEmotion() {
  if (emotion === 'happy') {
    emotion = 'sad';
  } else {
    emotion = 'happy';
  }
  note = 0;

}
