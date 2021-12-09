class Food {
    constructor(location) {
        this.location = location;

        this.draw = () => {
            fill(255, 0, 0);
            let x = this.location.x * CELL_WIDTH;
            let y = this.location.y * CELL_HEIGHT;
            rect(x, y, CELL_WIDTH, CELL_HEIGHT);
        };

        this.x = () => location.x;
        this.y = () => location.y;
    }
}