const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
const up=document.querySelector('#up');
const left=document.querySelector('#left');
const down=document.querySelector('#down');
const right=document.querySelector('#right');

let canvasSize;
let elementsSize;

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

    const map=maps[2];
    const mapRows=map.trim().split('\n');
    const mapRowCols=mapRows.map(row=>row.trim().split(''));
    console.log({map,mapRows});

    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
        game.fillText(emojis[mapRowCols[row-1][col-1]],elementsSize*col ,elementsSize*row);    
        }  
    }
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
}
function mvLeft(){
    console.log('Quiero ir hacia la izquierda');
}
function mvDown(){
    console.log('Quiero ir hacia abajo');
}
function mvRight(){
    console.log('Quiero ir hacia la derecha');
}
