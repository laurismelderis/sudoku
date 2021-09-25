let idCounter = 0;

class Pixel {
    constructor(ctx, size) {
        this.id = idCounter++;
        this.ctx = ctx;
        this.color = "#FFFFFF";
        this.size = size;
        this.location = { x:0, y:0}
        this.hovered = false;
        this.clicked = false;
    }

    /*
        Dark grey   #808080
        Grey        #C0C0C0
        Light grey  #E0E0E0
    */

    #drawRect(x, y, sizeX, sizeY, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "#000000";
        this.ctx.rect(x, y, sizeX, sizeY);
        this.ctx.fill();
        this.ctx.stroke();
    }

    draw() {
        this.#drawRect(this.location.x, this.location.y, this.size, this.size, this.color);
    }

    update() {
        if  (!this.hovered) this.color = "#FFFFFF"
        if (!this.clicked && this.hovered) this.color = "#E0E0E0";
        if (this.clicked) this.color = "#C0C0C0";
        
    }

    setColor(color) {
        this.color = color;
    }

    getId() {
        return this.id;
    }
}