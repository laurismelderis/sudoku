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

    // Init holds all the canvas events
    init() {
        // Add hover option for hovered pixel
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

        // Remove hover option for all pixels 
        this.canvas.addEventListener("mouseleave", (event) => {
            this.pixels.forEach((pixel) => {
                pixel.hovered = false;
            });
        });

        // Select hovered pixel
        this.canvas.addEventListener("click", (event) => {
            let x = event.offsetX;
            let y = event.offsetY;

            this.pixels.forEach((pixel) => {
                if (x > pixel.location.x && x < pixel.location.x + pixel.size && 
                    y > pixel.location.y && y < pixel.location.y + pixel.size &&
                    !pixel.selected) {
                    pixel.selected = true;
                } else 
                    pixel.selected = false;
    
            });
        });

        // Change value to selected pixel
        document.addEventListener("keydown", (event) => {
            this.pixels.forEach((pixel) => {
                if (pixel.selected) {
                    let key = event.key;
                    if(["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
                        pixel.value = key;
                    } else if (key === "Backspace" || key === "0") {
                        pixel.value = "";
                    }
                }
            });
        });

        // Move selected pixel with arrow keys
        document.addEventListener("keydown", (event) => {
            let found = false;
            let code = event.key;
            if (code === "ArrowLeft" || code === "a") {
                this.pixels.forEach((pixel, index) => {
                    if (pixel.selected && !found) {
                        pixel.selected = false;
                        if (pixel.id <= 0) {
                            this.pixels[this.pixels.length-1].setSelected(true);
                        } else {
                            this.pixels[index-1].setSelected(true);
                        }
                        found = true;
                    }
                });
            }
            if (code === "ArrowRight" || code === "d") {
                this.pixels.forEach((pixel, index) => {                   
                    if (pixel.selected && !found) {
                        pixel.selected = false;
                        if (index >= this.pixels.length-1) {
                            this.pixels[0].setSelected(true);
                        } else {
                            this.pixels[index+1].setSelected(true);
                        }
                        found = true;
                    }
                });
            }
            if (code === "ArrowUp" || code === "w") {
                this.pixels.forEach((pixel, index) => {                   
                    if (pixel.selected && !found) {
                        pixel.selected = false;
                        if (index === 9) {
                            this.pixels[0].setSelected(true);
                        } else if ((index-9) <= 0) {
                            this.pixels[this.pixels.length + index - 9].setSelected(true);
                        } else {
                            this.pixels[index-9].setSelected(true);
                        }
                        found = true;
                    }
                });
            }
            if (code === "ArrowDown" || code === "s") {
                this.pixels.forEach((pixel, index) => {                   
                    if (pixel.selected && !found) {
                        pixel.selected = false;
                        if (index >= this.pixels.length - 9) {
                            this.pixels[index-72].setSelected(true);
                        } else {
                            this.pixels[index+9].setSelected(true);
                        }
                        found = true;
                    }
                });
            }
                
        });
    }

    // Create a field of pixels
    loadPixels() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let pixel = new Pixel(this.ctx, this.pixelSize);
                pixel.location.x = j * this.pixelSize;
                pixel.location.y = i * this.pixelSize;
                pixel.hovered = false;
                pixel.selected = false;
                pixel.value = "";
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