class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,400);
    car2 = createSprite(300,400);
    car3 = createSprite(500,400);
    car4 = createSprite(700,400);
    car1.addImage("car1",carimg1);
    car2.addImage("car2",carimg2);
    car3.addImage("car3",carimg3);
    car4.addImage("car4",carimg4);
    
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
player.getplayerrank();


    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      image(track,0,-displayHeight*4,displayWidth,displayHeight*6);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill("red");
          ellipse(x,y,70,70);
          fill("white");
          text (player.name,x-20,y-55);
          posX=x;
          posY=y;
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      carsound.play();

    }
if(player.distance>3860&&player.distance<3861){
  gameState=2;
  player.rank=player.rank+1
  Player.updaterank(player.rank);
}
    drawSprites();
  }
  end(){
    //console.log("game end");
    game.update(2);
    console.log(player.rank);
    text("Game Over",displayWidth/2,displayHeight/10);
    if(player.rank===1){
      text("You WON!!! You came First",posX,posY-20);
    }
    else if(player.rank===2){
      text("You came 2nd",displayWidth/2,displayHeight/4+25)
    }
    else if(player.rank===3){
      text("You came 3rd",displayWidth/2,displayHeight/4+25)
    }
    else{
      text("You Lost, you came 4th",displayWidth/2,displayHeight/4+25)
    }
    
  }
}
