let restAnimation;
let speakAnimation;
let frames = [];
let upsetAnimation;
let smileAnimation;

function preload() {
  restAnimation = loadAnimation("assets/Tamagotch rest/sprite_0.png", "assets/Tamagotch rest/sprite_1.png", "assets/Tamagotch rest/sprite_2.png", "assets/Tamagotch rest/sprite_3.png", "assets/Tamagotch rest/sprite_4.png", "assets/Tamagotch rest/sprite_5.png", "assets/Tamagotch rest/sprite_6.png", "assets/Tamagotch rest/sprite_7.png", "assets/Tamagotch rest/sprite_8.png");
  smileAnimation = loadAnimation('assets/Tamagotchi smile/sprite_0.png', 'assets/Tamagotchi smile/sprite_1.png', 'assets/Tamagotchi smile/sprite_2.png', 'assets/Tamagotchi smile/sprite_3.png', 'assets/Tamagotchi smile/sprite_4.png', 'assets/Tamagotchi smile/sprite_5.png', 'assets/Tamagotchi smile/sprite_6.png', 'assets/Tamagotchi smile/sprite_7.png', 'assets/Tamagotchi smile/sprite_8.png', 'assets/Tamagotchi smile/sprite_9.png', 'assets/Tamagotchi smile/sprite_10.png', 'assets/Tamagotchi smile/sprite_11.png', 'assets/Tamagotchi smile/sprite_12.png', 'assets/Tamagotchi smile/sprite_13.png');
  speakAnimation = loadAnimation('assets/Tamagotchi talks/sprite_0.png', 'assets/Tamagotchi talks/sprite_1.png', 'assets/Tamagotchi talks/sprite_2.png', 'assets/Tamagotchi talks/sprite_3.png', 'assets/Tamagotchi talks/sprite_4.png');
  upsetAnimation = loadAnimation('assets/Tamagotchi  upset/sprite_0.png', 'assets/Tamagotchi  upset/sprite_1.png', 'assets/Tamagotchi  upset/sprite_2.png', 'assets/Tamagotchi  upset/sprite_3.png');

}

function setup() {
  createCanvas(800, 600);
  frameRate(30);
}

function draw() {
  background(255);
  animation(restAnimation, 300, 300);
}
