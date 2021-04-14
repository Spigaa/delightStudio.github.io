var canvas = document.querySelector("#game");
var ctx = canvas.getContext("2d");

var imgFundo1 = new Image();
imgFundo1.src = "backstart.jpg";
window.onload = function(){
    ctx.drawImage(imgFundo1,0,0);
}

notaVet = [];

//////////////////////////////////////////////////////////////////////////////////////////////////
var imgFundo2 = new Image();
imgFundo2.src = "backgroundPlay.jpg"

var final = new Image();
final.src = "img/final.png"
//////////////////////////////////////////////////////////////////////////////////////////////////

var nota01 = new Image();
nota01.src = "img/nota01.png";
nota01.name = "nota1";
notaVet[0] = nota01;

var nota02 = new Image();
nota02.src = "img/nota02.png"
nota02.name = "nota2";
notaVet[1] = nota02;

var nota03 = new Image();
nota03.src = "img/nota03.png"
nota03.name = "nota3";
notaVet[2] = nota03;

var nota04 = new Image();
nota04.src = "img/nota04.png"
nota04.name = "nota4";
notaVet[3] = nota04;


var nota05 = new Image(); 
nota05.src = "img/nota05.png"
nota05.name = "nota5";
notaVet[4] = nota05;
//////////////////////////////////////////////////////////////////////////////////////////////////
var start = false;
var timerGame;
var pontos = 0;
var sec = 60;
var velocidade = 40
//////////////////////////////////////////////////////////////////////////////////////////////////
var bkSnd = new Audio();
bkSnd.src = "sfx/backMusic.mp3";
bkSnd.volume = 0.05;
bkSnd.loop 

var gameOverSfx = new Audio();
gameOverSfx.src = "sfx/gameOver.mp3";
gameOverSfx.volume = 0.1;

var erro = new Audio();
erro.src = "sfx/erro.mp3";
erro.volume = 0.5;

var nota01Snd = new Audio();
nota01Snd.src = "sfx/note01.mp3";
nota01Snd.volume = 0.08;


var nota02Snd = new Audio();
nota02Snd.src = "sfx/note02.mp3";
nota02Snd.volume = 0.08;


var nota03Snd = new Audio();
nota03Snd.src = "sfx/note03.mp3";
nota03Snd.volume = 0.08;


var nota04Snd = new Audio();
nota04Snd.src = "sfx/note04.mp3";
nota04Snd.volume = 0.08;


var nota05Snd = new Audio();
nota05Snd.src = "sfx/note05.mp3";
nota05Snd.volume = 0.08;
//////////////////////////////////////////////////////////////////////////////////////////////////

var notaImagem = notaVet [Math.round(Math.random()*4)]
var notaPos = {
    x: Math.round(Math.random()*900),
    y: -100
}   
tam = Math.round(Math.random()*90)+45;

canvas.addEventListener("click", function(e){

    var rect = canvas.getBoundingClientRect();
    var mousex = e.clientX - rect.left;
    var mousey = e.clientY - rect.top;
    if(mousex > 0 && mousex < canvas.width && 
       mousey > 0 && mousey < canvas.height && start == false){
           start = true;
           bkSnd.play();
           draw();
           timerGame = setInterval(draw, 100);
           
    var cronometro = setInterval(function(){
        sec--;
        if(sec == 0){
            clearInterval(cronometro);
        }
    },1000);
  }else{
    if (mousex >= notaPos.x && 
        (mousex <= notaPos.x + notaImagem.width) 
        && mousey >= notaPos.y && 
        (mousey <= notaPos.y + notaImagem.height)){
         if(notaImagem.name == "nota1"){
             pontos ++;
             nota01Snd.play();
             notaImagem = notaVet [Math.round(Math.random()*4)]
             notaPos.x = Math.round(Math.random()*900);
             notaPos.y = -100;
             tam = Math.round(Math.random()*90)+45;
             velocidade = velocidade - 20;
            }
         if(notaImagem.name == "nota2"){
             pontos ++;
             nota02Snd.play();
             notaImagem = notaVet [Math.round(Math.random()*4)]
             notaPos.x = Math.round(Math.random()*900);
             notaPos.y = -100;
             tam = Math.round(Math.random()*90)+45;
             velocidade = velocidade - 20;
             }
        if(notaImagem.name == "nota3"){
             pontos ++;
             nota03Snd.play(); 
             notaImagem = notaVet [Math.round(Math.random()*4)]
             notaPos.x = Math.round(Math.random()*900);
             notaPos.y = -100;
             tam = Math.round(Math.random()*90)+45;
             velocidade = velocidade - 20;
             }
        if(notaImagem.name == "nota4"){
            pontos ++;            
            nota04Snd.play();
            notaImagem = notaVet [Math.round(Math.random()*4)]
             notaPos.x = Math.round(Math.random()*900);
             notaPos.y = -100;
             tam = Math.round(Math.random()*90)+45;
             velocidade = velocidade - 20;
             }
        if(notaImagem.name == "nota5"){
            pontos ++;
            nota05Snd.play();
            notaImagem = notaVet [Math.round(Math.random()*4)]
             notaPos.x = Math.round(Math.random()*900);
             notaPos.y = -100;
             tam = Math.round(Math.random()*90)+45;10;
             velocidade = velocidade - 20;
             
            }
        }
    }
});

function draw(){
    ctx.drawImage(imgFundo2, 0,0);
    update();

    if (velocidade < 40){
        velocidade = 40;
    } 

    if (notaPos.y > canvas.height){ 
        notaImagem = notaVet [Math.round(Math.random()*4)]
        notaPos.x = Math.round(Math.random()*900);
        notaPos.y = -100;
        tam = Math.round(Math.random()*90)+45;
        pontos = pontos - 2;
        velocidade = velocidade + 10;
        erro.play();
        if (velocidade >= 90){
            velocidade = 90;
        }
        
    }

    ctx.drawImage(notaImagem, notaPos.x, notaPos.y, tam, tam);

    ctx.fillStyle = "#f00";
    ctx.fillRect(0,600,canvas.width,30);
    ctx.font="17pt Courier New";
    ctx.fillStyle = "black";

    ctx.strokeStyle = "#000";
    ctx.strokeText("Pontos:",7,622);
    ctx.fillText("Pontos:",7,622);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.strokeText(pontos,115,623);
    ctx.fillText(pontos,115,623);

    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.strokeText("Tempo:",820,622);
    ctx.fillText("Tempo:",820,622);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.strokeText(sec,910,623);
    ctx.fillText(sec,910,623);
} 

function update(){
    notaPos.y += velocidade;
    console.log(velocidade)
    GameOver()
}

function GameOver(){
        if(sec == 0){
            clearInterval(timerGame);
            start = "EndGame";
        }
        if(start == "EndGame"){
            bkSnd.pause();
            gameOverSfx.play();

            

            ctx.fillStyle = "black";
            ctx.fillRect(185,65,570,380);
            ctx.drawImage(final,200,80,540,350);
    
            ctx.font="35pt Haettenschweiler";
            ctx.fillStyle = "red"
            ctx.fillText("Sua pontuação foi : "+pontos,320,210);
            ctx.strokeStyle = "black"
            ctx.strokeText("Sua pontuação foi : "+pontos,320,210);
    
            ctx.font="45px Haettenschweiler";
            ctx.fillStyle = "white";
            ctx.fillText("Pressione F5 para recomeçar",265,300);
            ctx.strokeText("Pressione F5 para recomeçar",265,300);

            ctx.clearRect(notaImagem, notaPos.x , notaPos.y);
        }
    }