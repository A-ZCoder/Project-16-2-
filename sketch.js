var gameState = "serve";
var PLAY;
var END;

var vader, vaderImg, big, bigImg;
var screen;
var bo;
var life = 2;
var ammo = 60;
var sta = 0;
var kills = 0;

var storm, storm1,storm2, luke, space, moon;
var tormImg, storm1Img,storm2Img, lukeImg, spaceImg, moonImg;
var sprite;
var sprite2;
var spriteImg;
var sprite2Img;
var button,buttonImg;
var yoda, yodaImg;
var stormGroup,starGroup,boGroup;
var star,starImg;
var box, lazer, lazerImg;
var bomb, bombImg;
var ship, shipImg;
var boImg;
var hitSound, fatalSound, endSound, knifeSound, swooshSound, killSound;


function preload() 
{
stormImg = loadImage("storm.png");
storm1Img = loadImage("storm1.png");
storm2Img = loadImage("storm2.png");
lukeImg = loadImage("luke.png");
spaceImg = loadImage("space.jpg");
moonImg = loadImage("moon2.png");
spriteImg = loadImage("face.png");
sprite2Img = loadImage("b.png");
buttonImg = loadImage("start.png");
yodaImg = loadImage("yoda.png");
starImg = loadImage("star.png");
lazerImg = loadImage("lazerbeam.png");
bombImg  = loadImage("bomb.png");
bigImg = loadImage("yodabig.png");
vaderImg = loadImage("darth.png");
shipImg = loadImage("ship.png");
boImg = loadImage("but.png");

knifeSound = loadSound("knifeSwoosh.mp3");
hitSound = loadSound("gore.wav");
fatalSound = loadSound("fatal.mp3");
endSound = loadSound("sound.wav");
swooshSound = loadSound("swoosh.wav");
killSound = loadSound("kill.wav");
}


function setup() 
{
createCanvas(1050,620)

button = createSprite(-500,-500);
   button.addImage(buttonImg);
   button.scale=0.2;

space = createSprite(300,300);
space.addImage(spaceImg);
space.scale = 0.5;

moon = createSprite(350,300);
moon.addImage(moonImg);
moon.scale = 0.250;

moon2 = createSprite(700,300);
moon2.addImage(moonImg);
moon2.scale = 0.250;

sprite = createSprite(350,290);
sprite.addImage(spriteImg);
sprite.scale = 0.4


sprite2 = createSprite(700,290);
sprite2.addImage(sprite2Img);
sprite2.scale = 0.4;

button = createSprite(-500,-500);
   button.addImage(buttonImg);
   button.scale=0.2;

   luke = createSprite(-10000,-40000);
    luke.scale = 0.680;
    luke.addImage(lukeImg);
    luke.visible = false;

    yoda = createSprite(-10000, -10000);
    yoda.scale= 0.1;
    yoda.addImage(yodaImg);
    yoda.visible = false;  
    
    lazer = createSprite(-2000,-2000);
    bomb = createSprite(-2222, -2222);

    screen = createSprite(-22222,-22222)
screen.visible = false;

vader = createSprite(900,200);
vader.addImage(vaderImg);
vader.scale = 0.33;
vader.velocityX = -2.5;
vader.visible = false;

big = createSprite(830,200);
big.addImage(bigImg);
big.scale = 0.3;
big.velocityX = -2.5;
big.visible = false;

ship = createSprite(1085, 300);
ship.addImage(shipImg);
ship.scale = 0.8;
ship.destroy();

bo = createSprite(500,500);
bo.addImage(boImg);
bo.scale = 0.5;
bo.visible = false;

    stormGroup= new Group();
    starGroup= new Group();
    boGroup= new Group();

    life = 2;
    ammo = 55;
    sta = 0;   
    kills = 0;
}


function draw() 
{
background(0);

if(vader.x == 400 || big.x == 400) {
    vader.x = 1100;
    big.x = 1100;
}


if(mousePressedOver(button)) {  
    button.destroy();
    sprite.destroy();
    sprite2.destroy();
    moon2.destroy();
    moon.destroy();
    luke.visible = true;
    yoda.visible = true;
    }

if(gameState == "PLAY") {

    luke.x = World.mouseX;
    luke.y = World.mouseY;
    yoda.y = World.mouseY;
    yoda.x = World.mouseX;
    edges = createEdgeSprites();
    luke.collide(edges);
    yoda.collide(edges);


    createStorm();
    createStorm1();
    createStorm2();
    createStar();
    
    if(keyDown("space")) {
        lazer = createSprite();
        lazer.x = luke.x;
        lazer.y = luke.y;
        lazer.scale = 0.260;
        lazer.addImage(lazerImg);
        lazer.lifetime = 2;
        lazer.debug = false;
        lazer.setCollider("rectangle", 0, 0, 1040, 1100);
        swooshSound.play();

        bomb = createSprite();
        bomb.x = yoda.x;
        bomb.y = yoda.y;
        bomb.scale = 1.2;
        bomb.addImage(bombImg);
        bomb.lifetime = 4;

        ammo = ammo-1;
    }



    if(starGroup.isTouching(luke)) {
        starGroup.destroyEach();
        sta = sta+2;
    }

    if(starGroup.isTouching(yoda)) {
        starGroup.destroyEach();
        sta = sta+2;
    }


    if(ammo <= 1) {
        ammo = 0
        lazer.x = -22222;
        lazer.y = -222222;
        bomb.y = -222222;
        bomb.x = -2222222;
        lazer.visible = false;
        bomb.visible = false;
        if(ammo > 0) {
            lazer.visible = true;
            bomb.visible = true;
            lazer.x = luke.x;
            lazer.y = luke.y;
            bomb.x = yoda.x;
            bomb.y = yoda.y;
        }
    }
    if(ammo < 1) {
        if(Math.round(frameCount%135 === 0)) {
            ammo = ammo+1
        }
    }

    if(Math.round(frameCount%135 === 0)) {
        ammo = ammo+1
    }

    if(bomb.isTouching(luke)) {
        bomb.destroy();
    }

    if(lazer.isTouching(yoda)) {
        lazer.destroy();
    }

    if(stormGroup.isTouching(stormGroup)) {
       stormGroup.collide(stormGroup);
    }

    if(lazer.isTouching(stormGroup) || bomb.isTouching(stormGroup)) {
        stormGroup.destroyEach();
        lazer.destroy();
        bomb.destroy();
        kills = kills+1;
        killSound.play();
    }

    if(stormGroup.isTouching(luke) || (stormGroup.isTouching(yoda))) {
       life = life-1
       stormGroup.destroyEach();
       hitSound.play();
    }

    if(kills > 55 || sta > 69) {
        stormGroup.destroyEach();
        starGroup.destroyEach();
        lazer.destroy();
        bomb.destroy();
        ship = createSprite(1085,300);
        ship.addImage(shipImg)
        ship.scale = 0.8;
    }

    if(life < 1) {
        gameState = END;
        fatalSound.play();
        luke.destroy();
        yoda.destroy();
        stormGroup.destroyEach();
        starGroup.destroyEach();
        bomb.destroy();
        lazer.destroy();
    }
}
    else if(gameState === END) {
        bo.visible = true;
        vader.visible = true;
        big.visible = true;

        if(mousePressedOver(bo)) {
            reset();
        }

        if(vader.x == 600) {
            vader.velocityX= 0
        } 

        if(big.x == 600) {
            big.velocityX= 0
        } 
    }

    if(luke.isTouching(ship)) {
        vader.destroy();
        bo.visible = true;
        if(mousePressedOver(bo)) {
            reset();
        }
    }
    
    if(yoda.isTouching(ship)) {
        big.destroy();
        bo.visible = true;
        if(mousePressedOver(bo)) {
            reset();
        }
    }

drawSprites();

if(luke.isTouching(ship)) {
    textSize(30);
    fill("lime");
    text("New Levels and Characters coming soon", 200,200);
    vader.destroy();
}

if(yoda.isTouching(ship)) {
    textSize(30);
    fill("green");
    text("You have completed basic training, for more levels play with other characters", 70,300)
    big.destroy();
}


if(gameState == "serve") 
{
textSize(30);
fill("skyblue");
text("Training", 650, 170)

textSize(30);
fill("skyblue");
text("Challenge", 290, 170)


textSize(40);
fill("green")
textFont("bold")
text("Choose", 445,100);

if(mousePressedOver(sprite2)) {
    text("Baby-Yoda", 380, 500);
    sprite2.x = 500;
    sprite2.y = 300;
    moon2.x=500;
    moon2.y=300;
    button.x= 500;
    button.y=500;
    sprite.destroy();
    moon.destroy();
    luke.destroy();
    vader.destroy();
 }

if(mousePressedOver(sprite)) {
   text("Luke Skywalker", 380, 500);
   sprite.x = 500;
   sprite.y = 300;
   moon.x=500;
   moon.y=300;
   button.x= 500;
   button.y=500;
   sprite2.destroy();
   moon2.destroy();
   yoda.destroy();
   big.destroy();
   life = 1;
   ammo = 10;
}


} else  {
    gameState == "PLAY";
}

if(mousePressedOver(button)) {
    gameState = "PLAY";
}

if(gameState == "PLAY") {
    textSize(30);
    fill("red")
    text("Lives :"+life, 899,60)
    fill("violet")
    text("Ammo :"+ammo, 890,100);
    fill("purple")
    text("Star :"+sta,899,140);
    fill("red");
    text("Kills :"+kills, 896,180);
}


if(gameState === END) {
    if(big.x == 600) {
        textSize(40)
        fill("orange");
        text("You still have a lot to learn", 100,100);
    }     

    if(vader.x == 600) {
        textSize(40)
        fill("red");
        text("I am your Father", 200,100);
    }     
}

}


function createStorm() 
{
    if(frameCount%1000 === 0) {
    storm = createSprite(300,300);
    storm.addImage(stormImg);
    storm.scale = 0.4;
    storm.velocityX = 4;
    storm.lifetime = 240;
    stormGroup.add(storm);
    storm.y = Math.round(random(70,550));
    storm.x = Math.round(random(10,10));
    storm.debug = false;
    storm.setCollider("rectangle", 0, 0, 300, 890)
}
}

function createStorm1() 
{
    if(frameCount%1100===0) {
        storm1 = createSprite(300,300);
        storm1.addImage(storm1Img);
        storm1.scale = 0.294;
        storm1.velocityX = -4;
        storm1.lifetime = 240;
        stormGroup.add(storm1);
        storm1.y = Math.round(random(70,550));
        storm1.x = Math.round(random(990,1000));
        storm1.debug = false;
    }
}

function createStorm2()
{
    if(frameCount%1320 === 0) {
storm2 = createSprite(300,300);
storm2.addImage(storm2Img);
storm2.scale = 0.3;
storm2.lifetime = 240;
storm2.velocityX = -4;
stormGroup.add(storm2);
storm2.y = Math.round(random(70,550));
storm2.x = Math.round(random(990,1000));
storm2.mirrorX(-1);
storm2.debug = false;
    }
}

function createStar()
{
    if(frameCount%200 === 0) {
        var star = createSprite(300,300);
        star.addImage(starImg);
        star.scale = 0.3;
        star.lifetime = 240;
        star.velocityX = (-7+sta/4)
        starGroup.add(star);
        star.y = Math.round(random(50,550));
        star.x = Math.round(random(990,1000));
    }
}

function createStorm() 
{
    if(frameCount%500 === 0) {
    storm = createSprite(300,300);
    storm.addImage(stormImg);
    storm.scale = 0.4;
    storm.velocityX = 4;
    storm.lifetime = 240;
    stormGroup.add(storm);
    storm.y = Math.round(random(70,550));
    storm.x = Math.round(random(10,10));
    storm.debug = false;
    storm.setCollider("rectangle", 0, 0, 300, 890)
}
}

function createStorm1() 
{
    if(frameCount%666===0) {
        storm1 = createSprite(300,300);
        storm1.addImage(storm1Img);
        storm1.scale = 0.294;
        storm1.velocityX = -4;
        storm1.lifetime = 240;
        stormGroup.add(storm1);
        storm1.y = Math.round(random(70,550));
        storm1.x = Math.round(random(990,1000));
        storm1.debug = false;
    }
}

function createStorm2()
{
    if(frameCount%760 === 0) {
storm2 = createSprite(300,300);
storm2.addImage(storm2Img);
storm2.scale = 0.3;
storm2.lifetime = 240;
storm2.velocityX = -4;
stormGroup.add(storm2);
storm2.y = Math.round(random(70,550));
storm2.x = Math.round(random(990,1000));
storm2.mirrorX(-1);
storm2.debug = false;
    }
}

function reset() 
{
gameState = "serve"
vader.visible = false;
big.visible = false;
bo.visible = false;
moon = createSprite(350,300);
moon.addImage(moonImg);
moon.scale = 0.250;

moon2 = createSprite(700,300);
moon2.addImage(moonImg);
moon2.scale = 0.250;

sprite = createSprite(350,290);
sprite.addImage(spriteImg);
sprite.scale = 0.4

sprite2 = createSprite(700,290);
sprite2.addImage(sprite2Img);
sprite2.scale = 0.4;

button = createSprite(-500,-500);
   button.addImage(buttonImg);
   button.scale=0.2;

   luke = createSprite(-10000,-40000);
   luke.scale = 0.680;
   luke.addImage(lukeImg);
   luke.visible = false;

   yoda = createSprite(-10000, -10000);
   yoda.scale= 0.1;
   yoda.addImage(yodaImg);
   yoda.visible = false;  
   
   lazer = createSprite(-2000,-2000);
   bomb = createSprite(-2222, -2222);

   if(mousePressedOver(sprite)) {
       big.x = big.x +22222
       vader.visible = true;
       big.setVelocityXEach(0)
   }

   if(mousePressedOver(sprite2)) {
       vader.x = vader.x+22222
       big.x = 600
       big.visible = true;
       vader.setVelocityXEach(0)
   }
    life = 2
    kills = 0
    sta = 0
    ammo = 55
}