import styles from '../playField.module.scss';

export const getRequireStyle = (viev: string): string => {
    switch(viev) {
        case 'selected': return styles.selected;
        case 'marked': return styles.marked;
        case 'matches': return styles.matches;
        case 'error': return styles.error;
        case 'red': return styles.red;
        case 'empty': return '';
        default: return '';
    }
}