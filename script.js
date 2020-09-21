// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsPressed,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let backgroundColor, frogX, frogY, frogV, score, lives, gameIsOver, car1X, car1Y, car1V, car2X, car2Y, car2V, car3X, car3Y, car3V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2;
  frogY = height * .96;
  frogV = 10;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 400;
  car1V = 5;
  car2X = 0;
  car2Y = 250;
  car2V = 7;
  car3X = 0;
  car3Y = 100;
  car3V = 9;

}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  lifeIndicator();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= frogV;
  }
  else if (keyCode === DOWN_ARROW){
    frogY += frogV;
  }
  else if (keyCode === LEFT_ARROW){
    frogX -= frogV;
  }
  else if (keyCode === RIGHT_ARROW){
    frogX += frogV;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  car2X += car2V;
  car3X += car3V;

  // Reset if it moves off screen
  if (car1X > width){
    car1X = 0;
    car1Y = random(50, height * 0.8);
  }
  if (car2X > width){
    car2X = 0;
    car2Y = random(50, height * 0.8);
  }
  if (car3X > width){
    car3X = 0;
    car3Y = random(50, height * 0.8);
  }

}

function drawCars() {
  // Code for cars
  fill(30, 50, 90);
  rect(car1X, car1Y, 40, 30);
  fill(90, 50, 80);
  rect(car2X, car2Y, 30, 30);
  fill(180, 50, 80);
  rect(car3X, car3Y, 25, 25);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20) || collideRectCircle(car2X, car2Y, 30, 30, frogX, frogY, 20) ||collideRectCircle(car3X, car3Y, 25, 25, frogX, frogY, 20)){
    console.log("Collided with Car1");
    frogX = width / 2;
    frogY = height * .96;
    lives -= 1;
    if (lives < 1){
      gameIsOver = true;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (collideRectCircle(0, 0, width, 40, frogX, frogY, 20)){
    score += 1;
    frogX = width / 2;
    frogY = height * .96;
  }
}

function displayScores() {
  textSize(15);
  fill(0);
  // Display Lives
  text(`Lives: `, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 38);
  // Display game over message if the game is over
  if (gameIsOver){
    textSize(60);
    text("GAME OVER", 70, height/2);
  }
  if (score == 5){
    textSize(60);
    text("YOU WON!", 70, height/2);
    frogX = width / 2;
    frogY = height * 0.96;
  }
}

function lifeIndicator(){
  if (lives == 3){
    fill(120, 80, 80);
    ellipse(65,15,15);
    ellipse(82,15,15);
    ellipse(99,15,15);
  }
  else if (lives == 2){
    fill(30, 90, 80);
    ellipse(65,15,15);
    ellipse(82,15,15);
  }
  else if (lives == 1){
    fill(0, 80, 80);
    ellipse(65,15,15);
  }
}