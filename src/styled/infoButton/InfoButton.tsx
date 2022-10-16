import React from 'react';
import { Link } from 'react-router-dom';
import { TLink } from '../../components/header/types';
import styles from './infobutton.module.scss';

const InfoButton: React.FC<TLink> = ({ title, path }) => {
    return (
        <Link className={styles.main} to={path}>{title}</Link>
    );
};

export default InfoButton;