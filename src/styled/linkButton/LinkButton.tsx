import React from 'react';
import { Link } from 'react-router-dom';
import { TLink } from '../../components/header/types';
import styles from './link.module.scss';

const LinkButton: React.FC<TLink> = ({title, path}) => {
    return (
        <Link to={path} className={styles.link}>{title}</Link>
    );
};

export default LinkButton;