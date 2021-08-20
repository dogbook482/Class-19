var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300,50,50)
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5;
  ghost.velocityY=4;  
  
  doorsGroup=new Group();
  climbersGroup=new Group();
}

function draw() {
  background("black");
  
  if (gameState=="play"){  
    
    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")){
      ghost.velocityY=-5;
    }
    ghost.velocityY= ghost.velocityY+0.8;
    if (keyDown("RIGHT_ARROW")){
      ghost.velocityX=3
    }
    if (keyDown("LEFT_ARROW")){
      ghost.velocityX=-3;
    }

    if (doorsGroup.isTouching(ghost)||climbersGroup.isTouching(ghost)||ghost.y>600){
      gameState="end";
    }
          
    spawnDoors();
  }
  
  if(gameState=="end"){
    tower.destroy();
    ghost.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    fill("yellow");
    text("Game Over",300,300)
  }
 
  drawSprites();
}

function spawnDoors(){

  if(frameCount%200==0){
  door=createSprite(Math.round(random(10,550)),0,200,200);
  door.addImage(doorImg);
  door.velocityY=3;
  door.lifetime=800;
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  doorsGroup.add(door);

  climber=createSprite(100,50,200,200);
  climber.x=door.x;
  climber.addImage(climberImg);
  climber.velocityY=3;
  climber.lifetime=800;
  climbersGroup.add(climber);

}
}