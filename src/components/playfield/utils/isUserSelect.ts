import styles from '../playField.module.scss';

export const isUserSelect = (type: string): string => {
    switch(type) {
        case 'user': return styles.selectedByUser;
        default: return '';
    }
}
