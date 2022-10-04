import React from 'react';
import { Link } from 'react-router-dom';
import styles from './link.module.scss';

type LinkButtonProps = {
    title: string
    path: string;
}

const LinkButton = ({title, path}: LinkButtonProps) => {
    return (
        <Link to={path} className={styles.link}>{title}</Link>
    );
};

export default LinkButton;