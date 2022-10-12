export type Field = {
    value: number;
    marks: number[];
    type: 'initial' | 'user';
    specialStyles: 'red' | 'none';
    view: 'selected' | 'error' | 'marked' | 'empty' | 'matches';
}