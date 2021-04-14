var canvas = document.querySelector("#jogo");
var ctx = canvas.getContext("2d");


var imgFundo1 = new Image();
imgFundo1.src = "img/backstart.png";
imgFundo1.onload = function(){
    ctx.drawImage(imgFundo1,0,0);
}

var imgFundo2 = new Image();
imgFundo2.src = "img/back.png"

var personagem;
var personagens=[];

var zumbi = new Image();
zumbi.src = "img/zombie.png"
zumbi.name = "zumbi";

var docBryant = new Image();
docBryant.src = "img/doc_bryant.png"
docBryant.name = "docBryant";

personagens[0] = zumbi;
personagens[1] = docBryant;

var pos_coord;
var timerGame = 0;
var start = false;
var pontos = 0;
 
var coordX = [85 ,203 ,345 ,76 ,230 ,380 ,147 ,362];
var coordY = [38 ,78 ,60 ,137 ,162 ,122 ,239 ,212];

var sec = "90";

///////////////////////////

var bk1Snd = new Audio();
bk1Snd.src = "sfx/music.mp3";
bk1Snd.volume = 0.2;
bk1Snd.loop 

var zombieSnd = new Audio();
zombieSnd.src = "sfx/zombieSnd.mp3";
zombieSnd.volume = 0.5;

var bryantSnd = new Audio();
bryantSnd.src = "sfx/bryantSnd.mp3";
bryantSnd.volume = 0.5;

var gameOver = new Audio();
gameOver.src = "sfx/gameOver.mp3";
gameOver.volume = 0.5;


canvas.addEventListener("click", function(e){
    
    var rect = canvas.getBoundingClientRect();
    var mousex = e.clientX - rect.left;
    var mousey = e.clientY - rect.top;

    if(mousex > 0 && mousex < canvas.width && 
       mousey > 0 && mousey < canvas.height && start == false){
           start = true;
           bk1Snd.play();
           timerGame = setInterval(updateGame, 700);
           
    var cronometro = setInterval(function(){
        sec--;
        if(sec == 0){
            clearInterval(cronometro);
        }
    },1000);

       }else{
           if (mousex >= pos_coord.x && 
              (mousex <= pos_coord.x + personagem.width) && 
              mousey >= pos_coord.y && 
              (mousey <= pos_coord.y + personagem.height)){
                if(personagem.name == "zumbi"){
                    pontos ++;
                    sorteiaCoordenada();
                    zombieSnd.play(); //////////CRIAR SFX
                }
                if(personagem.name == "docBryant"){
                    pontos -=2;
                    sorteiaCoordenada();
                    bryantSnd.play(); //////////CRIAR SFX
                }
             }
       }
});


function updateGame(){
    ctx.drawImage(imgFundo2, 0,0);

    ctx.fillStyle = "#c8a2c8";
    ctx.fillRect(0,320,canvas.width,20);
    ctx.font="15pt Arial";
    ctx.fillStyle = "black";

    ctx.strokeStyle = "#000";
    ctx.strokeText("Pontos:",7,336);
    ctx.fillText("Pontos:",7,336);
    ctx.fillText(pontos,80,337);

    ctx.strokeStyle = "#000";
    ctx.strokeText("Tempo:",350,335);
    ctx.fillText("Tempo:",350,335);
    ctx.strokeText(sec,420,336);
    ctx.fillText(sec,420,336);

    sorteiaCoordenada();
    personagem = personagens[Math.round(Math.random())]
    ctx.drawImage(personagem, pos_coord.x, pos_coord.y); 
    GameOver()
}

function sorteiaCoordenada(){
    var j = Math.round(Math.random()*(coordY.length-1));
    pos_coord = {
        x: coordX[j], y: coordY[j]
    }
}


function GameOver(){
    if(sec == 0){
        clearInterval(timerGame);
        start = "EndGame";
    }

    if(start == "EndGame"){
        bk1Snd.pause();
        gameOver.play();

        ctx.fillStyle = "black";
        ctx.fillRect(50,80,385,220);
        ctx.strokeStyle = "red"
        ctx.strokeRect(50,80,385,220);

        ctx.font="23pt Haettenschweiler";
        ctx.fillStyle = "yellow"
        ctx.fillText("Sua pontuação foi : "+pontos,110,170);
        ctx.strokeStyle = "black"
        ctx.strokeText("Sua pontuação foi : "+pontos,110,170);

        ctx.font="28px Haettenschweiler";
        ctx.fillStyle = "white";
        ctx.fillText("Pressione F5 para recomeçar",80,250);
        ctx.strokeText("Pressione F5 para recomeçar",80,250);
    }
}