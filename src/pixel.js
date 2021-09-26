let idCounter = 0;

class Pixel {
    constructor(ctx, size) {
        this.id = idCounter++;
        this.ctx = ctx;
        this.color = "#FFFFFF";
        this.size = size;
        this.location = { x:0, y:0}
        this.hovered = false;
        this.selected = false;
        this.value = 0;
        this.changable = true;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#000000";
        this.ctx.rect(this.location.x, this.location.y, this.size, this.size);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.font = "36px arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#111111";
        if (this.value === 0)
            this.ctx.fillText("", this.location.x+(this.size/2), this.location.y+(this.size/2));
        else
            this.ctx.fillText(this.value, this.location.x+(this.size/2), this.location.y+(this.size/2));
    }

    update() {
        if (!this.hovered) this.color = "#FFFFFF" // White
        if (!this.selected && this.hovered) this.color = "#E0E0E0"; // Light gray
        if (this.selected) this.color = "#C0C0C0"; // Gray
    }

    setColor(color) {
        this.color = color;
    }

    setSelected(selected) {
        this.selected = selected;
    }

    getId() {
        return this.id;
    }
}