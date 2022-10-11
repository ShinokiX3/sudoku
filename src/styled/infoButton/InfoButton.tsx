import React from 'react';
import { Link } from 'react-router-dom';
import styles from './infobutton.module.scss';

type TInfoButton = {
    title: string;
    url: string;
}

const InfoButton: React.FC<TInfoButton> = ({ title, url }) => {
    return (
        <Link className={styles.main} to={url}>{title}</Link>
    );
};

export default InfoButton;