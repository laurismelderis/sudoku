class Grid {
    constructor(canvas, canvasSize) {
        this.canvas = canvas;
        this.W = this.canvas.width = canvasSize;
        this.H = this.canvas.height = canvasSize;
        this.ctx = this.canvas.getContext("2d");
        this.pixels = [];

        this.gridSize = 9;
        this.pixelSize = this.W / this.gridSize;

        this.loadPixels();
        this.init();
    }

    init() {
        this.canvas.addEventListener("mousemove", (event) => {
            let x = event.offsetX;
            let y = event.offsetY;

            this.pixels.forEach((pixel) => {
                if (x > pixel.location.x && x < pixel.location.x + pixel.size && 
                    y > pixel.location.y && y < pixel.location.y + pixel.size) {
                    pixel.hovered = true;
                } else 
                    pixel.hovered = false;
    
            });
            
        });
        this.canvas.addEventListener("mouseleave", (event) => {
            this.pixels.forEach((pixel) => {
                pixel.hovered = false;
            });
        });

        this.canvas.addEventListener("click", (event) => {
            let x = event.offsetX;
            let y = event.offsetY;

            this.pixels.forEach((pixel) => {
                if (x > pixel.location.x && x < pixel.location.x + pixel.size && 
                    y > pixel.location.y && y < pixel.location.y + pixel.size &&
                    !pixel.clicked) {
                    pixel.clicked = true;
                } else 
                    pixel.clicked = false;
    
            });
        });

        document.addEventListener("keydown", (event) => {
            this.pixels.forEach((pixel) => {
                if (pixel.clicked) {
                    let key = event.key;
                    if(["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
                        pixel.value = key;
                    } else if (key === "Backspace" || key === "0") {
                        pixel.value = "";
                    }
                }
            });
        });
    }

    loadPixels() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let pixel = new Pixel(this.ctx, this.pixelSize);
                pixel.location.x = j * this.pixelSize;
                pixel.location.y = i * this.pixelSize;
                this.pixels.push(pixel);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.W, this.H);
        this.pixels.forEach((pixel) => {
            pixel.draw();
        });
    }

    update() {
        this.pixels.forEach((pixel) => {
            pixel.update();
        });
    }
}