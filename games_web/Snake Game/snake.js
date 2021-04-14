var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");
var box = 20;
var snake = [];

var cor = true;
var min = "00";
var sec = "00";
var timer2;
var timer3;
var timer4;

var bkSnd = new Audio();
bkSnd.src = "sfx/music.mp3";
bkSnd.volume = 0.2;
var sfxF = new Audio();
sfxF.src = "sfx/food.mp3";
sfxF.volume = 0.5;
var sfxR = new Audio();
sfxR.src = "sfx/rat.mp3";
sfxR.volume = 0.5;
var sfxD = new Audio();
sfxD.src = "sfx/dead.mp3";
sfxD.volume = 0.5;
var sfxB = new Audio();
sfxB.src = "sfx/blackout.mp3";
sfxB.volume = 0.5;
var sfxB2 = new Audio();
sfxB2.src = "sfx/blackoutOut.mp3";
sfxB2.volume = 0.5;

var img = new Image();
img.src = "pts.png";
var rato = new Image;
rato.src = "rato.png";

snake[0] = {
    x : 10 * box,
    y : 10 * box
};

var food = {
    x:Math.floor(Math.random()*29+1)*box,
    y:Math.floor(Math.random()*29+1)*box
}

var d;
var pontos = 0;

document.addEventListener("keydown",direcao);

function direcao(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

var cronometro = setInterval(function(){
    if(sec == 59){
        min++;
        sec = -1;
        if(min < 10){
            min = "0"+min;
        }
    }
    sec++;
    if(sec < 10){
        sec = "0"+sec;
    }
},1000);

function collision(head,array){
    for(var i=0; i < snake.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){    
    bkSnd.play();

    ctx.fillStyle = "orange";
    ctx.fillRect(0,0,cvs.width,20);
    ctx.font="20px Goudy Stout";
    ctx.fillStyle = "black";

    ctx.strokeStyle = "#000";
    ctx.strokeText("Pontos:",5,16);
    ctx.fillText("Pontos:",5,16);
    ctx.fillText(pontos,80,17);

    ctx.strokeStyle = "#000";
    ctx.strokeText("Tempo:",475,16);
    ctx.fillText("Tempo:",475,16);
    ctx.strokeText((min+":"+sec),540,17);
    ctx.fillText((min+":"+sec),540,17);

    if(cor == true){
        var bkPlay = new Image();
            bkPlay.src = "bkPlay.jpg";
            ctx.drawImage(bkPlay,0, 20, cvs.width, cvs.height); 
    }else{
        var bkChange = new Image();
            bkChange.src = "bkChange.png";
            ctx.drawImage(bkChange,0, 20, cvs.width, cvs.height);
    }

    

    for (var i=0; i < snake.length; i++){
        var cabeca = new Image();
            cabeca.src = "head.png";
            ctx.drawImage(cabeca, snake[0].x,snake[0].y,box,box);
        if(i != 0){
            var corpo = new Image();
            corpo.src = "skin.jpg";
            ctx.drawImage(corpo, snake[i].x,snake[i].y,box,box);
        } 
    }

    ctx.drawImage(img,food.x, food.y,20,20);

    ctx.drawImage(rato,rat.x, rat.y, ratoTam, ratoTam);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;    
    
    if( d == "LEFT")  snakeX -= box;
    if( d == "UP")    snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN")  snakeY += box;    
    
    if(snakeX == food.x && snakeY == food.y){
        sfxF.play();
        food = {
            x:Math.floor(Math.random()*29+1)*box,
            y:Math.floor(Math.random()*29+1)*box
    }
    pontos++
  }
  
  else if ((snakeX == rat.x || snakeX == rat.x+20) &&
             (snakeY == rat.y || snakeY == rat.y +20 ))
  {  
      rat = 
          {
              x: -ratoTam,
              y: ratoTam
          }
          pontos+=5;                                                     
      sfxR.play();
      ctx.strokeStyle = "#000";
      ctx.strokeText("Pontos:",5,16);
      ctx.fillText("Pontos:",5,16);
      ctx.fillText(pontos,80,17);
      
      clearInterval(RatoTmr);
      clearInterval(RatoTmr2);
      RatoFunc();

  }else{
      snake.pop();
  }

    var newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeX > cvs.width-box || 
       snakeY < 20 || snakeY > cvs.height-box || 
       collision(newHead,snake)){                   
            clearInterval(game);
            clearInterval(timer3);
            clearInterval(timer4);
            bkSnd.pause();
            sfxD.play();
            ctx.font="50px Haettenschweiler";
            ctx.fillStyle = "white";    
            ctx.fillText("GAME OVER!",150,270);
            ctx.font="30px Unispace";
            ctx.fillText("Pressione F5 para recomeçar",60,350);
    }   
    snake.unshift(newHead);
} 

mudarCor();
voltarCor();

var game = setInterval(draw,100);

function mudarCor(){
    timer3 = setInterval(function(){
        sfxB.play();
        cor = false;
    },20000);
}
function voltarCor(){
    timer4 = setInterval(function(){
        sfxB2.play();
        cor = true;
        clearInterval(timer3);
        mudarCor();
    },22000);
}



var ratoTam = 40;
var size = (600 / ratoTam)-1;
var rat = 
    {
        x: -ratoTam, 
        y: -ratoTam
    }

RatoFunc();

function RatoFunc()
{
    ratoTmr = setTimeout(function(){
        
        rat = 
        {
            x: Math.floor(Math.random()*size)*ratoTam, 
            y: Math.floor(Math.random()*size)*ratoTam
        }
        
        RatoTmr2 = setTimeout(Rato2,4000);
        
        function Rato2()
        {
            rat = 
            {
                x: -ratoTam, 
                y: -ratoTam
            }
            clearInterval(RatoTmr2);
            RatoFunc();
        }  
    },3000);
}