const canvas = document.getElementById("sudokuGrid")
const W = canvas.width = 500;
const H = canvas.height = 500;
const ctx = canvas.getContext("2d");

/*
	Dark grey   #808080
	Grey        #C0C0C0
	Light grey  #E0E0E0
*/

const gridSize = 9
const pixelSize = 500/gridSize

let counter = 0;

for (let i = 0; i < gridSize; i++) {
	for (let j = 0; j < gridSize; j++) {
		if (counter % 2 == 0) {
			ctx.fillStyle = "#C0C0C0";
		} else {
			ctx.fillStyle = "#808080";
		}
		ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
		counter++;
	}
}

