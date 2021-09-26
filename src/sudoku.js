class Sudoku {
    constructor() {
        this.puzzles = new Puzzles();
        this.puzzle = null;
        this.loadPuzzle();
    }

    loadPuzzle() {
        this.puzzle = this.puzzles.test.unsolved;
    }
}