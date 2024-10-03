// Seleciona o canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Carrega as imagens
const planeGreen = new Image();
const background = new Image();
const foreground = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

planeGreen.src = 'images/planeGreen.png';
background.src = 'images/bg.png';
foreground.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

// Variáveis
let gap = 200;
let constant;

let birdX = 33;
let birdY = 150;
let gravity = 1.5;
let score = 0;

// Sons
//const flySound = new Audio();
//const scoreSound = new Audio();
const backgroundSound = new Audio();
backgroundSound.src = 'sounds/backgroundSound.wav';
backgroundSound.loop = true;
backgroundSound.play();
//flySound.src = 'sounds/fly.mp3';
//scoreSound.src = 'sounds/score.mp3';

// Evento ao pressionar uma tecla
document.addEventListener('keydown', moveUp);

function moveUp() {
    birdY -= 25;
    //flySound.play();
}

// Coordenadas dos canos
let pipes = [];

pipes[0] = {
    x: canvas.width,
    y: 0
};

// Função de desenho
function draw() {
    context.drawImage(background, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        constant = pipeNorth.height + gap;
        context.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        context.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

        pipes[i].x--;

        if (pipes[i].x == 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detecta colisões
        if (birdX + planeGreen.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width && (birdY <= pipes[i].y + pipeNorth.height || birdY + planeGreen.height >= pipes[i].y + constant) || birdY + planeGreen.height >= canvas.height - foreground.height) {
            location.reload(); // Recarrega o jogo
        }

        if (pipes[i].x == 5) {
            score++;
            //scoreSound.play();
        }
    }

    context.drawImage(foreground, 0, canvas.height - foreground.height);
    context.drawImage(planeGreen, birdX, birdY);

    birdY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Pontuação: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
