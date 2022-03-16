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

  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
   
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,50,50,50);
  ghost.addImage("standing",ghostImg);
  ghost.scale = 0.3;
 

}

function draw() {
  background(200);
  
  if (gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    
    if (keyDown("space")){
    ghost.velocityY = -4;
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 2;
    }

    if(keyDown("left")){
      ghost.x = ghost.x-2;
    }
    
    ghost.velocityY = ghost.velocityY + 1;

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();    
    drawSprites();
  }

if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over",230,250);
}
  
} 
  
function spawnDoors(){
     
  if (frameCount % 300 === 0){
    
     door = createSprite(200,-50); 
     door.addImage("door",doorImg);

     climber = createSprite(200,10);
     climber.addImage("climber",climberImg);

     invisibleBlock = createSprite(200,15);
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
     

     door.x = Math.round(random(120,400));
     door.velocityY = 1;

     climber.x = door.x;
     climber.velocityY = 1;

     invisibleBlock.x = door.x
     invisibleBlock.velocityY = 1;

     
     door.lifetime = 800;
     doorsGroup.add(door);

     climber.lifetime = 800;
     climbersGroup.add(climber);

     invisibleBlockGroup.add(invisibleBlock);
     invisibleBlock.debug = false;

     door.depth = ghost.depth;
     ghost.depth += 1;
    }
   
}
