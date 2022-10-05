import { Field } from "../types";

export const createFieldCopy = (field: Field[][]): Field[][] => {
    return field.map(arr => arr.map(obj => Object.assign({}, obj)));
}