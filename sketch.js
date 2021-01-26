//Create variables here
var database;
var dog,happyDog,foodS,foodStock;
var dog_image, happy_dog_image;
var add_food_button, feed_button;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood,feedDog;
var foodObj,readStock;



function preload()
{
  dog_image = loadImage("dogImg.png");
  happy_dog_image = loadImage("dogImg1.png");	
 
}

function setup() {
  database = firebase.database();

  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(happy_dog_image);
  dog.scale=0.15;
  
  feed=createButton("Feed Dog");
  feed.position(1100,390);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1200,390);
  addFood.mousePressed(addFoods);

}


function draw() {  
 background("red") 


 foodObj.display();

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 fill(255,255,254);
 textSize(20);
 if(lastFed > 12){
  text("lastFed: " + lastFed%12 + "PM", 350, 30);
}
if(lastFed = 12){
  text("lastFed: 12PM", 350, 30);
}
else if (lastFed === 0) {
  text("Last Fed: 12 AM",350,30);
}
else{
     text ("LastFed :"+lastFed + "AM", 350, 30);
}
drawSprites(); 
}
  
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happy_dog_image );
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}
