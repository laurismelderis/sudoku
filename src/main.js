let game = new Game(500);

game.start();

$(document).keydown((e) => {
	if (e.keyCode == 27) game.stop(); // ESC
});
