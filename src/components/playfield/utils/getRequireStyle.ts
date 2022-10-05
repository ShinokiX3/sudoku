import styles from '../playField.module.scss';

export const getRequireStyle = (viev: string): string => {
    switch(viev) {
        case 'selected': return styles.selected;
        case 'marked': return styles.marked;
        case 'matches': return styles.matches;
        case 'empty': return '';
        case 'error': return '';
        default: return '';
    }
}