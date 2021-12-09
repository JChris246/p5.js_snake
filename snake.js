class Snake {
    constructor(direction) {
        this.segments = [];
        this.segments.push(getRandomLocation());
        this.direction = direction;

        this.draw = () => {
            this.segments.forEach(segment => {
                fill(88, 255, 51);
                let x = segment.x * CELL_WIDTH;
                let y = segment.y * CELL_HEIGHT;
                rect(x, y, CELL_WIDTH, CELL_HEIGHT);
            })
        };

        this.calculateCoord = () => {
            // move the snake's body segments to follow the head
            // shift every segment to the position of segment infront of it
            for(let i = this.segments.length - 1; i > 0; i--) {
                this.segments[i].x = this.segments[i-1].x;
                this.segments[i].y = this.segments[i-1].y;
            }

            // move the head of the snake to its new location based on the direction it is moving
            if (this.direction === Direction.down)
                this.segments[0].y++;
                // this.segments[0].y = constrain(this.segments[0].y + 1, 0, ROWS - 1);
            if (this.direction === Direction.up)
                this.segments[0].y--;
                // this.segments[0].y = constrain(this.segments[0].y - 1, 0, ROWS - 1);
            if (this.direction === Direction.left)
                this.segments[0].x--;
                // this.segments[0].x = constrain(this.segments[0].x - 1, 0, COLS - 1);
            if (this.direction === Direction.right)
                this.segments[0].x++;
                // this.segments[0].x = constrain(this.segments[0].x + 1, 0, COLS -1);
        };

        // change the direction of the snake if the passed direction is not the polar opposite
        // of the current direction ... also setting the direction to same direction of 
        // current wont matter
        this.changeDirection = direction => {
            if (this.direction === Direction.down && direction !== Direction.up)
                this.direction = direction;
            if (this.direction === Direction.up && direction !== Direction.down)
                this.direction = direction;
            if (this.direction === Direction.right && direction !== Direction.left)
                this.direction = direction;
            if (this.direction === Direction.left && direction !== Direction.right)
                this.direction = direction;
        }

        // if the head of the snake has the same x and y coords and the food (ie intersect),
        // the snake has eaten the food
        this.intersects = food => this.segments[0].x === food.x() && this.segments[0].y === food.y();

        // if the head of the snake has the same x and y coords of any of the body segments, the snake 
        // has hit itself
        this.hitSelf = () => this.segments.slice(1).some(segment => segment.x === this.segments[0].x && segment.y === this.segments[0].y);

        // if the head of the snake has the same x and y coords of the walls ...
        this.hitWall = () => this.segments[0].x === COLS || this.segments[0].x === -1 || this.segments[0].y === ROWS || this.segments[0].y === -1;

        // add a segment to the end of the snake
        this.grow = () => {
            // set the inital value of the x and y value for the new segment
            let x = this.segments.slice(-1)[0].x;
            let y = this.segments.slice(-1)[0].y;

            // depending on the direction of the snake update the new segment's x or y
            if (this.direction === Direction.down)
                y = this.segments.slice(-1)[0].y + 1
            if (this.direction === Direction.up)
                y = this.segments.slice(-1)[0].y - 1
            if (this.direction === Direction.left)
                x = this.segments.slice(-1)[0].x - 1
            if (this.direction === Direction.right)
                x = this.segments.slice(-1)[0].x + 1

            // add the segment to the end of the snake
            this.segments.push({ x, y });
        };

        // return the length ie the number of segments of the snake
        this.length = () => this.segments.length;
    }
}