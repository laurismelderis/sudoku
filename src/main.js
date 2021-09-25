let game = new Game(500);

game.start();

$(document).keydown((e) => {
	if (e.keyCode == 37) game.stop(); // left
	if (e.keyCode == 38) game.stop(); // up
	if (e.keyCode == 39) game.start(); // right
	if (e.keyCode == 40) game.start(); // down
});
