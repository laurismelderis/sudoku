class Game {	
	constructor(canvasSize) {
		this.solvedEl = document.getElementById("puzzleSolved")
		this.canvas = document.getElementById("sudokuGrid");
		this.grid = new Grid(this.canvas, canvasSize, this.solvedEl);
		this.isRunning = false;
		this.gameLoop = null;
	}

	start() {
		if (this.isRunning) return;
		console.log("Game started");

		this.isRunning = true;
		this.gameLoop = setInterval(() => {
			this.grid.update();
			this.grid.draw();
		}, 1000/144);
	}

	stop() {
		if (!this.isRunning) return;
		console.log("Game stopped");

		this.isRunning = false;
		clearInterval(this.gameLoop);
	}
}