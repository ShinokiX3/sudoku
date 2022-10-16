import { TCell } from "../types";

export const createFieldCopy = (field: TCell[][]): TCell[][] => {
    return field.map(arr => arr.map(obj => Object.assign({}, obj)));
}