const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const paddleSpeed = 0.3;
const paddleWidth = 25;
const paddleHeight = 100;
const boardWidth = 500;
const boardHeight = 500;
const paddleDistanceFromEdge = 5;
const ballSpeed = 0.2;
const ballRadius = 15;

let previousTime = 0;
let paddlePosition = (boardHeight / 2) - (paddleHeight / 2);

let upKeyPressed = false;
let downKeyPressed = false;

let ballPosition = {
    x: boardWidth / 2,
    y: boardHeight / 2
}

const angle = Math.random() * 2 * Math.PI;

const ballVelocity = {
    x: Math.cos(angle) * ballSpeed,
    y: Math.sin(angle) * ballSpeed
}

document.addEventListener('keydown', (event) => {
    if (event.repeat) {
        return;
    }

    if (event.code === 'ArrowUp') {
        upKeyPressed = true;
    }

    if (event.code === 'ArrowDown') {
        downKeyPressed = true;
    }
});


document.addEventListener('keyup', (event) => {
    if (event.repeat) {
        return;
    }

    if (event.code === 'ArrowUp') {
        upKeyPressed = false;
    }

    if (event.code === 'ArrowDown') {
        downKeyPressed = false;
    }
});


const calculateBallPosition = (deltaTime) => {
    // collides with bottom
    if (ballPosition.y + ballRadius >= boardHeight) {
        ballVelocity.y *= -1;
    }

    // collides with top
    if (ballPosition.y - ballRadius <= 0) {
        ballVelocity.y *= -1;
    }

    // collides with right
    if (ballPosition.x + ballRadius >= boardWidth) {
        ballVelocity.x *= -1;
    }

    // collides with left
    if (ballPosition.x - ballRadius <= 0) {
        ballVelocity.x *= -1;
    }

    // collides with green paddle
    const greenPaddleCoordinates = { x: paddleDistanceFromEdge, y: paddlePosition };
    if (circleIntersectsRectangle(ballPosition, ballRadius, greenPaddleCoordinates, paddleWidth, paddleHeight)) {
        ballVelocity.x *= -1;
    }

    // collides with green paddle
    const bluePaddleCoordinates = { x: boardWidth - paddleWidth - paddleDistanceFromEdge, y: paddlePosition };
    if (circleIntersectsRectangle(ballPosition, ballRadius, bluePaddleCoordinates, paddleWidth, paddleHeight)) {
        ballVelocity.x *= -1;
    }

    return {
        x: ballPosition.x + (ballVelocity.x * deltaTime),
        y: ballPosition.y + (ballVelocity.y * deltaTime)
    }
}


const run = (time) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = time - previousTime;
    const paddleMovement = upKeyPressed ? -paddleSpeed : downKeyPressed ? paddleSpeed : 0;

    paddlePosition = paddlePosition + (paddleMovement * deltaTime);
    ballPosition = calculateBallPosition(deltaTime);

    context.fillStyle = "darkgrey";
    context.fillRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "green";
    context.fillRect(paddleDistanceFromEdge, paddlePosition, paddleWidth, paddleHeight);

    context.fillStyle = "blue";
    context.fillRect(boardWidth - paddleWidth - paddleDistanceFromEdge, paddlePosition, paddleWidth, paddleHeight);

    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballPosition.x, ballPosition.y, ballRadius, 0, Math.PI * 2, true);
    context.fill();

    previousTime = time;
    requestAnimationFrame(run);
}

run(0);
