export type Field = {
    value: number;
    marks: number[];
    type: 'initial' | 'user';
    view: 'selected' | 'error' | 'marked' | 'empty' | 'matches';
}