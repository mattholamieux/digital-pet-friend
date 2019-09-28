let restAnimation;
let speakAnimation;
let upsetAnimation;
let smileAnimation;
let animationTags = [];
let currentAnimation = 0;
let pet;
let scl = 50;
let synth;
let envelope;
let note = 0;
let happyMelody = ['C2', 'G3', 'D3', 'C2', 'A2', 'G2', 'C3', 'C1'];
let sadMelody = ['Db2', 'Eb2', 'C#1', 'F#2', 'Gb1', 'Db2', 'CB2'];
let glitch;
let imgSrc = 'assets/Tamagotchi  upset/sprite_2.png';
let emotion;

function preload() {
  happyAnimation = loadAnimation("assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png", "assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png", 'assets/Tamagotchi smile/sprite_0.png', 'assets/Tamagotchi smile/sprite_1.png', 'assets/Tamagotchi smile/sprite_2.png', 'assets/Tamagotchi smile/sprite_3.png', 'assets/Tamagotchi smile/sprite_4.png', 'assets/Tamagotchi smile/sprite_5.png', 'assets/Tamagotchi smile/sprite_6.png', 'assets/Tamagotchi smile/sprite_7.png', 'assets/Tamagotchi smile/sprite_8.png', 'assets/Tamagotchi smile/sprite_9.png', 'assets/Tamagotchi smile/sprite_10.png', 'assets/Tamagotchi smile/sprite_11.png', 'assets/Tamagotchi smile/sprite_12.png', 'assets/Tamagotchi smile/sprite_13.png');
  upsetAnimation = loadAnimation('assets/Tamagotchi  upset/sprite_0.png', 'assets/Tamagotchi  upset/sprite_1.png', 'assets/Tamagotchi  upset/sprite_2.png', 'assets/Tamagotchi  upset/sprite_3.png');
}

function setup() {
  createCanvas(800, 600);
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
  synth = new p5.PolySynth();
  emotion = 'happy';
}

function draw() {
  background(255);
  drawSprites();
  if (emotion === 'sad' && glitch) {
    glitch.show();
    pet.changeAnimation('upset');
  }
  if (emotion === 'happy') {
    pet.changeAnimation('happy');
  }
  playSynth();
}


function mousePressed() {
  currentAnimation++;
  pet.changeAnimation(animationTags[currentAnimation]);
  if (currentAnimation > animationTags.length - 1) {
    currentAnimation = 0;
  }
}


function playSynth() {
  if (emotion === 'happy') {
    let dur = 1.5;
    let time = 0;
    let vel = 0.5;
    if (frameCount % 10 === 0) {
      synth.noteAttack(happyMelody[note], vel, 0, dur);
      synth.noteRelease(happyMelody[note], 0.15);
      note++
      if (note > happyMelody.length - 1) {
        note = 0;
      }
    }
  }
  if (emotion === 'sad') {
    let dur = 1.5;
    let time = 0;
    let vel = 0.5;
    synth.noteAttack(sadMelody[note], vel, 0, dur);
    synth.noteRelease(sadMelody[note], 1.5);
    note++
    if (note > sadMelody.length - 1) {
      note = 0;
    }
  }
}
