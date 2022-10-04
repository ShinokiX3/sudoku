export const createBaseField = (): number[][] => {
    let arr: Array<Array<number>> = Array.from(Array(9), () => new Array(9));

    let n: number = 1;
    for (let i = 0; i < arr.length; i++) {
        if (i === 3) n = 2;
        if (i === 6) n = 3;
        for (let j = 0; j < arr.length; j++) {
            if (n > 9) n = 1;
            arr[i][j] = n;
            n++;
        }
        if (n >= 9) n = 1;
        n += 3;
    }

    return arr;
}