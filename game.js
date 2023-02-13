const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
const up=document.querySelector('#up');
const left=document.querySelector('#left');
const down=document.querySelector('#down');
const right=document.querySelector('#right');
const spanLives=document.querySelector('#lives');
const spanTime=document.querySelector('#time');
const spanRecord=document.querySelector('#record');
const pResult=document.querySelector('#result');

let canvasSize;
let elementsSize;
let level=0;
let lives=3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition={
    x:undefined,
    y:undefined,
}
const giftPosition={
    x:undefined,
    y:undefined,
}
let enemyPositions=[];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);







function setCanvasSize(){
    if (window.innerHeight > window.innerWidth) {
        canvasSize=window.innerWidth*0.8;
    }else{
        canvasSize=window.innerHeight*0.8;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height',canvasSize);
    elementsSize=canvasSize/10;
    startGame();
}
function startGame(){
    
    console.log({canvasSize,elementsSize});
    game.font=elementsSize+'px Verdana';
    game.textAlign='end';

    const map= maps[level];

    if (!map) {
        gameWin();
        return;
    }
    if (!timeStart) {
        //Le asignamos a timeStart la hora en ms.
        timeStart=Date.now();
        timeInterval=setInterval(showTime,100);
        showRecord();
    }
    

    const mapRows=map.trim().split('\n');
    const mapRowCols=mapRows.map(row=>row.trim().split(''));
    console.log({map,mapRows,mapRowCols});

    showLives();

    enemyPositions=[];
    game.clearRect(0,0,canvasSize,canvasSize);

        mapRowCols.forEach((row, rowI) => {
            row.forEach((col, colI) => {
            const emoji = emojis[col];
              const posX = elementsSize * (colI + 1);
              const posY = elementsSize * (rowI + 1);
        
    
        if (col=='O') {
            if(!playerPosition.x && !playerPosition.y){
            playerPosition.x=posX;
            playerPosition.y=posY;
            console.log({playerPosition});
            }}else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col=='X'){
                enemyPositions.push({
                x : posX,
                y : posY,  
                })
                
            }
        
    game.fillText(emoji,posX,posY);
    });
    });
    movePlayer();        
}
function showRecord(){
    spanRecord.innerHTML=localStorage.getItem('record_time');
}
function movePlayer(){
    const giftCollisionX=playerPosition.x.toFixed(3)==giftPosition.x.toFixed(3);
    const giftCollisionY=playerPosition.y.toFixed(3)==giftPosition.y.toFixed(3);
    const giftCollision=giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
    }
    const enemyCollision=enemyPositions.find(enemy=>{
        const enemyCollisionX=enemy.x.toFixed(3)==playerPosition.x.toFixed(3);
        const enemyCollisionY=enemy.y.toFixed(3)==playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });
    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
}
function levelWin(){
console.log('Subiste de nivel!')
level++;
startGame();
}
function showLives(){
    let totalHearts=emojis['HEART'].repeat(lives);
    spanLives.innerHTML=totalHearts;
}
function showTime(){
    spanTime.innerHTML=Date.now()-timeStart;
}
function levelFail(){
    console.log('Chocaste con el enemigo!');
    lives--;
    if(lives<=0){
        level=0;
        lives=3;
        timeStart=undefined;
    }
        playerPosition.x=undefined;
        playerPosition.y=undefined;
        startGame();  
}
function gameWin(){
    console.log('Terminaste el juego!')
    clearInterval(timeInterval);

    const recordTime=localStorage.getItem('record_time');
    const playerTime=Date.now()-timeStart;
    if (recordTime) {
        if(recordTime>=playerTime){
            localStorage.setItem('record_time',playerTime);
            pResult.innerHTML='SUPERASTE el record :)';
        }else{
            pResult.innerHTML='Lo siento, no superaste el record :(';
        }
    }else{
        localStorage.setItem('record_time',playerTime);
        pResult.innerHTML='Primera vez? Felicidades lograste un nuevo record :)';
    }
    console.log({recordTime,playerTime});
}

window.addEventListener('keydown',moveByKeys);
up.addEventListener('click',mvUp);
left.addEventListener('click',mvLeft);
down.addEventListener('click',mvDown);
right.addEventListener('click',mvRight);

function moveByKeys(event){
    switch (event.key) {
        case 'ArrowUp':
            mvUp();
            break;
        case 'ArrowLeft':
            mvLeft();
            break;
        case 'ArrowDown':
            mvDown();
            break;
        case 'ArrowRight':
            mvRight();
            break;
    
        default:
            break;
    }
}

function mvUp(){
    console.log('Quiero ir hacia arriba');
    if ((playerPosition.y-elementsSize)<elementsSize) {
        console.log('OUT');
    }else{
        playerPosition.y-=elementsSize;
        startGame();  
    }
    
}
function mvLeft(){
    console.log('Quiero ir hacia la izquierda');
    if ((playerPosition.x-elementsSize)<elementsSize) {
        console.log('OUT');
    }else{
        playerPosition.x-=elementsSize;
        startGame();  
    }
}
function mvDown(){
    console.log('Quiero ir hacia abajo');
    if ((playerPosition.y+elementsSize)>canvasSize) {
        console.log('OUT');
    }else{
        playerPosition.y+=elementsSize;
        startGame();
    }
    
}
function mvRight(){
    console.log('Quiero ir hacia la derecha');
    if ((playerPosition.x+elementsSize)>canvasSize) {
        console.log('OUT');
    }else{
        playerPosition.x+=elementsSize;
        startGame();
    }
    
}
