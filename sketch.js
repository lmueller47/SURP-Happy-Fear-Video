//input your start time
//set to point of video switch filters

let seconds = 15;
let totalSeconds = 0;
let mode = 1;
var stepSize;
let reset = 0;
let countdown;
/*
- fade in from black
- happy part == oversaturated colors and circles to represent happieness
- transition to curve filter slowly building intensity ie randomness of curves
- looks over shoulders nervously 
- color slowly drains and red backgroud beceomes apparent
- just reds and grays
- scream zoom in on mouth
- fade from inner mouth to black 
*/

var capture;

function setup() 
{
  createCanvas(1920/2, 1080/2);
  frameRate(30);
  
  //input video file for capture to apply filter to video 
  capture = createCapture(VIDEO);
  capture.size(1920/2, 1080/2);
  noStroke();
}

function draw() 
{  
  let currentTime = int(millis() / 1000);
  countdown = seconds + totalSeconds - currentTime;
  if(countdown <= 0 && mode == 1)
    {
      mode = 0;
      seconds = 9;
      totalSeconds = totalSeconds + 15;
    }
  else if(countdown <= 0 && mode == 0)
    {
      mode = 1;
      seconds = 15;
      totalSeconds = totalSeconds + 9; 
    }
  capture.loadPixels();
  
  if(mode == 1)
    {
      background(0);
      stepSize = 10 
      
      for (var x = 0; x < capture.width; x += stepSize) {
        for (var y = 0; y < capture.height; y += stepSize) {
          var index = ((y*capture.width) + x) * 4;
          var redVal = capture.pixels[index];
          var greenVal = capture.pixels[index + 1];
          var blueVal = capture.pixels[index + 2];
          fill(redVal, greenVal, blueVal, 75);
          ellipse(x, y, stepSize + 10, stepSize+ 10);
        }
      }
    }
  if(mode == 0){
  stepSize = 20;
  for (var x = 0; x < capture.width; x += stepSize) {
    for (var y = 0; y < capture.height; y += stepSize) {
      var index = ((y*capture.width) + x) * 4;
      var redVal = capture.pixels[index];
      var greenVal = capture.pixels[index + 1];
      var blueVal = capture.pixels[index + 2];
      let xPos = x;
      let yPos = y;
      push();
      translate(xPos, yPos);
      rotate(radians((random(360))));
      noFill();
      strokeWeight((random(5)));
      stroke(color(redVal, greenVal, blueVal));
      
      strokeWeight(random(7.5));
      curve(
        xPos,
        yPos,
        sin(xPos) * (random(60)),
        cos(xPos) * sin(xPos) * (random(90)),
        (random(10)),
        (random(80)),
        cos(yPos) * sin(yPos) * (random(140)),
        cos(xPos) * sin(xPos) * 50
      );
      pop();
      }
    }
  }
}