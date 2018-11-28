var mySong;
var analyzer;
var volume = 0;

var wordX = 0, wordY = 0;//文本位置
var stepSize = 5.0;
var letters = "ALWAYS BELIEVE BEAUTIFUL THINGS WILL HAPPEN.";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;

//var s = 'MOVE MOUSE TO SEE MORE';

function preload() {
  // put preload code here
  mySong = loadSound("./assets/Beautiful Things Remix feat.mp3");

}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  mySong.play();
  // able to perform measurements on the song and give back values
  rectMode(CENTER);
  fill(20);
  stroke(255, 251, 249);
  strokeWeight(4);

  //文本箭头设置为光标
  cursor(CROSS);
  wordX = mouseX;
  wordY = mouseY;
  textAlign(LEFT);
  fill(0);

}

function draw() {

  background(255,31,112);
  //文本输入
  push();
  if (mouseOver) {
  var d = dist(wordX, wordY, mouseX,mouseY);
  textFont('Arial');
  textSize(60);
  var newLetter = letters.charAt(counter);;
  stepSize = textWidth(newLetter);

  if (d > stepSize) {
    var angle = atan2(mouseY-wordY, mouseX-wordX);
    push();
    translate(wordX, wordY);
    rotate(angle + random(angleDistortion));
    text(newLetter, 0, 0);
    pop();
    counter++;
   if (counter > letters.length-1) counter = 0;

    wordX = wordX + cos(angle) * stepSize;
    wordY = wordY + sin(angle) * stepSize;
     }
   }
  pop();

  //获取音量
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  //变化的方形和点
  drawDots();

  //随音符变化的节奏
  translate(width / 2, height / 2);
  var num = 10;
  var intervalX = map(volume, 0, width, 40, -40);
  var intervalY = map(abs(volume - width / 2), 0, width / 2, 0, -20);
  var rectX = 100;
  var rectY = 200;
  var tilt = map(volume, 0, width, -20, 20);
  for(var i = num -1; i > 0; i--){
    push();
      var rhytm = map(pow(abs(sin(volume * 0.3 - i * 0.3)), 50), 0, 1, 0, -50)
                   * map(abs(volume - width / 2), 0, width / 2, 0, 1);
       translate(intervalX * (i - num / 2.0), 0);
       fill(0,90,255);
       noStroke();
       rectMode(CENTER);
       rect(0,0,20,intervalY * (i - num / 2.0) + rhytm);
     pop();
   }
   // noStroke();
   // fill(50);
   // textAlign(CENTER);
   // text(s, 0, -350, 70, 80);
}

//鼠标移动控制文本位置
function mouseOver() {
  wordX = mouseX;
  wordY = mouseY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//方形和点
function drawDots() {

  //set diameter to the smallest dimension
  var diameter = 0;
  if (width > height) {
    diameter = height;
  } else {
    diameter = width;
  }

  push();
  translate(width / 2, height / 4);
  stroke(255);
  noFill();
  rotate(volume);
  rectMode(CENTER);
  rect(0,0, volume / 8,volume / 8);
  pop();

  push();
  translate(width / 4, height / 2);
  stroke(255);
  noFill();
  rotate(volume);
  rectMode(CENTER);
  rect(0,0, volume / 8,volume / 8);
  pop();

  push();
  translate(width * 0.75, height / 2);
  stroke(255);
  noFill();
  rotate(volume);
  rectMode(CENTER);
  rect(0,0, volume / 8,volume / 8);
  pop();



  push();
  translate(width / 2, height * 0.75);
  stroke(255);
  noFill();
  rotate(volume);
  rectMode(CENTER);
  rect(0,0, volume / 8,volume / 8);
  pop();

  noStroke();
  fill(0,90,random(200,255));
  ellipse(width * 0.75, height * 0.75, volume/ 10);
  ellipse(width / 4, height / 4, volume/ 10);
  ellipse(width * 0.75, height / 4, volume/ 10);
  ellipse(width / 2, height / 2, volume/ 10);
  ellipse(width / 4, height * 0.75, volume/ 10);

  stroke(255);
  strokeWeight(2);
  noFill()
  ellipse(width * 0.75, height * 0.75, volume/ 6);
  ellipse(width / 4, height / 4, volume/ 6);
  ellipse(width * 0.75, height / 4, volume/ 6);
  ellipse(width / 2, height / 2, volume/ 6);
  ellipse(width / 4, height * 0.75, volume/ 6);

  fill(0,90,255);
  ellipse(windowWidth/ 2, windowHeight + 100, 400+volume/10);

  fill(255);
  ellipse(windowWidth/ 2-50, windowHeight - 60, 40);
  ellipse(windowWidth/ 2+50, windowHeight - 60, 40);
  fill(20);
  ellipse(map(mouseX,0,windowWidth,windowWidth/ 2-60,windowWidth/ 2-40), map(mouseY,0,windowHeight,windowHeight - 70,windowHeight - 50), 20);
  ellipse(map(mouseX,0,windowWidth,windowWidth/ 2+40,windowWidth/ 2+60), map(mouseY,0,windowHeight,windowHeight - 70,windowHeight - 50), 20);
}
