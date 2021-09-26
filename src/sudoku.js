class Sudoku {
    constructor() {
        this.puzzles = new Puzzles();
        this.puzzle = null;
        this.loadPuzzle();
    }

    loadPuzzle() {
        // this.puzzle = this.puzzles.test.unsolved;
        this.puzzle = this.puzzles.test.solved;
    }

    checkPuzzle(currentPuzzle) {
        for (let i = 0; i < 9; i++) {
            let row = this.#getPuzzleRow(currentPuzzle, i);
            let col = this.#getPuzzleCol(currentPuzzle, i);
            let subgrid = this.#getPuzzleSubgrid(currentPuzzle, i);
            if (!this.#uniquePart(row) || !this.#uniquePart(col) || !this.#uniquePart(subgrid)) {
                return false;
            }
        }
        return true;
    }

    #uniquePart(part) {
        let checkSet = new Set();
        part.forEach((num) => {
            if (num.value) checkSet.add(num.value);
        });
        return checkSet.size === part.length;
    }

    #getPuzzleRow(puzzle, index) {
        return puzzle.slice(index*9, index*9+9);
    }

    #getPuzzleCol(puzzle, index) {
        let colInc = 0;
        return puzzle.filter((num, i) => {
            let el = i === index+colInc;
            if (el) colInc += 9;
            return el;
        });
    }

    #getPuzzleSubgrid(puzzle, index) {
        let inc = index*3;
        if (index >= 3 && index <= 5) {
            inc = 18 + index*3;
        } else if (index >= 6 && index <= 8) {
            inc = 36 + index*3;
        }
        return puzzle.filter((num, i) => {
           return (i >= 0+inc && i < 3+inc) || (i > 8+inc && i < 12+inc) || (i > 17+inc && i < 21+inc);
        });
    }
}