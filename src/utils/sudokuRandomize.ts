import { getRandomNumber } from './getRandomNumber';
import { swapColumnsArea } from './swapColumnsArea';
import { swapRowsArea } from './swapRowsArea';
import { swapColumnsSmall } from './swapColumnsSmall';
import { swapRowsSmall } from './swapRowsSmall';
import { transposing } from './transposing';

export const sudokuRandomize = (arr: number[][], num: number) => {
    const func: Function[] = [
        transposing,
        swapRowsSmall,
        swapColumnsSmall,
        swapRowsArea,
        swapColumnsArea
    ];

    for (let i = 0; i < num; i++) {
        const funcId = getRandomNumber(0, func.length - 1);
        func[funcId](arr);
    }

    return arr;
} 