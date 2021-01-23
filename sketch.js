var bird,birdupdown;
var cloud,cloudImage;
var num;
var cloudsGroup;
var score=0;
var obstacle1,obstacle1im;
var obstacle2,obstacle2im;
var obstacleGroup2;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;
var invisible;
var obstacleGroup1;

function preload(){
  birdupdown=loadAnimation("wingdown.png","wingup.png");
  cloudImage=loadImage("clouds.png");
  obstacle1im=loadImage("obstacle.png");
  obstacle2im=loadImage("obstacle2.png");
  gameOver=loadAnimation("gameOver.png");
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bird=createSprite(windowWidth/2,windowHeight/2,20,20);
  bird.addAnimation("bird",birdupdown);
  bird.scale=windowWidth/850;
  cloudsGroup=createGroup();
  obstacleGroup1=createGroup();
  obstacleGroup2=createGroup();
  
  invisible=createSprite(0,bird.y+100,3,windowHeight*7)
  invisible.visible=false; 
}

function draw() {
  
  background("white");
  num=Math.round(random(1,2));
  var g=50;
  if(score%3==0){
    g=g-2;
  }
  if(gameState==PLAY){
    if(frameCount%g==0){
    switch(num){
      case 1:
        ob1()
        
        break;
      case 2:
        ob2()
        
      
    }
    }
    if(obstacleGroup1.isTouching(invisible)){
      score+=1;
      obstacleGroup1.destroyEach();
    } 
    if(obstacleGroup2.isTouching(invisible)){
      score+=1;
      obstacleGroup2.destroyEach();
    } 
    
    if(keyDown("space")||touches.length>0){
      bird.y=bird.y-10;
      
      touches=[ ];
    }
    bird.velocityY=3;
    textSize(25);
    text("Score: "+score,windowWidth/2.5,30);
  }
  if(bird.isTouching(obstacleGroup1)||bird.isTouching(obstacleGroup2)||bird.y<25||bird.y>windowHeight-15){
    bird.addAnimation("bird",gameOver);
    bird.x=windowWidth/2;
    bird.y=windowHeight/2;
    bird.velocityY=0;
    gameState=END;
  }
  if(gameState==END){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    text("Click to play again",windowWidth/3,windowHeight/3)
    if(keyWentDown("space")||touches.length>0){
      score=0;
      bird.addAnimation("bird",birdupdown)
      gameState=PLAY;
    }
  }
  textSize(30);
  
  drawSprites();
  
}

function ob1(){
  obstacle1=createSprite(windowWidth,0,40,40);
      obstacle1.y=Math.round(random(0,windowHeight));
      obstacle1.velocityX=-2;
      obstacle1.lifetime=5008;
      obstacle1.addImage("obstacle1",obstacle1im);
      obstacle1.scale=windowWidth/700;
      obstacleGroup1.add(obstacle1);
      
  
}
function ob2(){
    obstacle2=createSprite(windowWidth,0,100,40);
      obstacle2.y=Math.round(random(0,windowHeight));
      obstacle2.velocityX=-2;
      obstacle2.lifetime=5008;
      obstacle2.addImage("obstacle2",obstacle2im);
      obstacle2.scale=windowWidth/650;  
      obstacleGroup2.add(obstacle2)
  
}