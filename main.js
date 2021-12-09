// SNAKE
const HEIGHT = 600, WIDTH = 1000;
const CELL_WIDTH = CELL_HEIGHT = 20;
const COLS = Math.floor(WIDTH / CELL_WIDTH), ROWS = Math.floor(HEIGHT / CELL_HEIGHT);
const MAX_CELLS = COLS * ROWS;

var grid = [];
var snake;
var food;
var gameOver = false;

// enum for direction of the snake
const Direction = {
    left: 0,
    up: 1,
    down: 2,
    right: 3
};

// first function ran by p5
function setup() {
    createCanvas(WIDTH, HEIGHT)
    frameRate(10)

    for(let y = 0; y < ROWS; y++)
        for(let x = 0; x < COLS; x++)
            grid.push(new Cell(x, y))
    snake = new Snake(Direction.left);
    food = new Food(getRandomLocation(true));
}

// draw loop
function draw() {
    background(255);

    // color the grid ... this probably wasnt needed
    grid.forEach(item => item.highlight());

    // calculate the next coordinate the snake's head (and the rest of its body) should go to
    snake.calculateCoord();

    // check if the snake's head has hit a wall or another part of itself
    if (snake.hitWall() || snake.hitSelf())
        gameOver = true;

    // check of the snake has grown to fill the entire game space
    // at that point u have technically won
    if (snake.length() === MAX_CELLS)
        gameOver = true;

    // check if the draw loop should be stopped because the game is over
    if (gameOver)
        noLoop();

    // check of the head of the snake has hit the food
    if (snake.intersects(food)) {
        snake.grow(); // grow the snake by 1 segment
        // set a new location for the food
        food = new Food(getRandomLocation());
    }

    // draw the snake and the food on the canvas
    snake.draw();
    food.draw();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW)
        snake.changeDirection(Direction.left);
    if (keyCode === RIGHT_ARROW)
        snake.changeDirection(Direction.right);
    if (keyCode === UP_ARROW)
        snake.changeDirection(Direction.up);
    if (keyCode === DOWN_ARROW)
        snake.changeDirection(Direction.down);
}

const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

// allow for 2 space away from the walls for the snake to appear
// to give the user chance to react when the same starts
const getRandomLocation = (isFood=false) => {
    let min = isFood ? 0 : 2;
    let y = getRandomInteger(min, isFood ? ROWS : ROWS - 2);
    let x = getRandomInteger(min, isFood ? COLS : COLS - 2);
    return { x, y }
}

// keep the passed "value" with the range of min and max
const constrain = (value, min, max) => {
    if (value > max)
        return max;
    if (value < min)
        return min;
    return value;
};

// This class simply colors the canvas ... probably useless
class Cell {
    constructor(i, j) {
        this.x = i;
        this.y = j;

        this.highlight = () => {
            let x = this.x * CELL_WIDTH;
            let y = this.y * CELL_HEIGHT;

            noStroke();
            fill("#0d1117");
            rect(x, y, CELL_WIDTH, CELL_HEIGHT)
        }
    }
}