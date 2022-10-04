import { swapRowsArea } from './swapRowsArea';
import { transposing } from './transposing';

export const swapColumnsArea = (arr: number[][]): number[][] => {
    return transposing(swapRowsArea(transposing(arr)));
}