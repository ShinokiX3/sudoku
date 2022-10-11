import styles from './footer.module.scss';
import facebook from '../../assets/svg/facebook.svg';
import InfoButton from '../../styled/infoButton/InfoButton';

type Link = {
    title: string;
    url: string;
}

const links: Link[] = [
    {title: 'Terms', url: '/terms'},
    {title: 'Coockie Policy', url: '/coockie'},
    {title: 'Privacy', url: '/privacy'},
    {title: 'Get in Touch', url: '/getintouch'},
]

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.main}>
                    <div className={styles.brand}>
                        <p>Easybrain</p>
                        <span className={styles.rights}>©2018-2022 Easybrain. All Rights Reserved.</span>
                    </div>
                    <div className={styles.links}>
                        {links.map(({ title, url }: Link) => <InfoButton key={title} title={title} url={url} />)}
                    </div>
                    <div className={styles.socials}>
                        <img src={facebook} alt="facebook" />
                    </div>
                </div>
                <div className={styles.info}>
                    Apple, the Apple logo, and iPad are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc.
                </div>
            </div>
        </div>
    );
};

export default Footer;