export const solve = (arr: number[][]) => {
    const newArr = arr.map(el => [...el]);
    
    const size = newArr.length;
    const boxSize = Math.sqrt(size);

    const validate = (num: number, pos: number[], newArr:number[][]) => {
        const [r, c] = pos;

        // Check rows
        for (let i = 0; i < size; i++) {
            if (newArr[i][c] === num && i !== r) return false;
        }

        // Check columns
        for (let i = 0; i < size; i++) {
            if (newArr[r][i] === num && i !== c) return false;
        }

        // Check box
        const boxRow = Math.floor(r / boxSize) * boxSize;
        const boxCol = Math.floor(c / boxSize) * boxSize;

        for (let i = boxRow; i < boxRow + boxSize; i++) {
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if (newArr[i][j] === num && i !== r && j !== c) return false;
            }
        }

        return true;
    }

    const findNulls = (newArr: number[][]) => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (newArr[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    const findSolution = () => {
        const pos = findNulls(newArr);

        if (pos === null) return true;

        for (let i = 1; i < size + 1; i++) {
            const isValid = validate(i, pos, newArr);

            if (isValid) {
                const [x, y] = pos;
                newArr[x][y] = i;

                if (findSolution()) return true;
                newArr[x][y] = 0;
            }
        }

        return false;
    }

    findSolution();
    return newArr;
}