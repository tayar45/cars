var board;
var context;
var blockSize=25;
var rows=30;
var vitas=0;
var start=false;
var pos;
var gameOver=false

//remote
var left=document.getElementById('left')
var right=document.getElementById('right')

//Car
var carRed=new Image()
carRed.src="/Car_Red.webp"

var carHieght=blockSize*5
var carWidth=blockSize*3
var carPosition=carWidth

//otherCar
var carPurple=new Image()
carPurple.src="/Car_Purple.webp"

var carGreen=new Image()
carGreen.src="/Car_Green.webp"

var otherCol=carWidth
var otherRow=0-blockSize*5

//srore
var score=document.getElementById('score')
//background animation
var s=0


window.onload=()=>{
  board=document.getElementById('board')
  board.height=rows*blockSize
  board.width=(carWidth+20)*4
  context=board.getContext('2d')
  setInterval(update,1000/1000)
}



function update() {
  
  if (gameOver) {
    
    return
  }
  context.fillStyle="#131E3A"
  context.fillRect(0,0,board.width,board.height)
  
  for (var i = -300; i < board.height-100; i++) {
    context.fillStyle = "white"
    context.fillRect(155, s+i*165, 10, 120)
    context.fillStyle = "white"
    context.fillRect(155+95, s + i * 165, 10, 120)
    
  }
  
  
  context.fillStyle="green"
  context.fillRect(0,0,60,board.height)
    
  context.fillStyle="green"
  context.fillRect(board.width-30,0,60,board.height)
  
  for (var i = -300; i < board.height-100; i++) {
    
    context.fillStyle = "white"
    context.fillRect(60,1+i*50+s, 10, 25)
    context.fillStyle = "red"
    context.fillRect(60,25+i*50+s, 10, 27)
    
  }
  if (s>=50+board.height) {
    s=0
  } else {
      s+=10
  }

  
  
  
  
  for (var i = -300; i < board.height; i++) {
    context.fillStyle = "white"
    context.fillRect(board.width-35,1+i*50+s, 10, 25)
    context.fillStyle = "red"
    context.fillRect(board.width-35,25+i*50+s, 10, 27)
  }
  
  
  
  
  
  context.drawImage(carRed,carPosition,board.height-carHieght-20,carWidth,carHieght)
  
  
 
  otherRow=otherRow+vitas
  
  
   if (start!=true) {
     pos1=otherCol
     pos2=otherCol+carWidth+20
   }
  
  else if (otherRow>board.height) {
    otherRow=-100
     pos1 = otherCol+(carWidth+20)*Math.floor(Math.random()*3)
     pos2 = otherCol+(carWidth+20)*Math.floor(Math.random()*3)
     
     score.innerHTML=parseInt(score.innerHTML)+1
  }
  if ((carPosition==pos1||carPosition==pos2)&&otherRow>=board.height-carHieght-carHieght) {
    gameOver=true
    alert("game over")
    location.reload()
    
    
   
    
  }
 context.drawImage(carPurple,pos1,otherRow,carWidth,carHieght)
 context.fillStyle="red"
 context.drawImage(carGreen,pos2,otherRow,carWidth,carHieght)
  
}






var startX, startY;

document.addEventListener("touchstart", function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function(event) {
  var currentX = event.touches[0].clientX;
  var currentY = event.touches[0].clientY;
  var diffX = startX - currentX;
  var diffY = startY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 10) {
      start = true;
      if (vitas == 0) {
        vitas = 20
      }
      
      if (carPosition > 100) {
        carPosition = carPosition - carWidth - 20
      }
          // Reset startX and startY
          startX = null;
          startY = null;
    }else{
      start =true
  if (vitas == 0) {
    vitas = 20
  }
 
    if(carPosition<board.width-carWidth-100){
      carPosition=carPosition+carWidth+20
    }
     // Reset startX and startY
  startX = null;
  startY = null;
    }
  }

});


