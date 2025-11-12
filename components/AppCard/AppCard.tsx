import Image from 'next/image';
import * as Icons from '@phosphor-icons/react';
import AppLink from '../AppLink/AppLink';
import styles from './AppCard.module.scss';

export default function AppCard({
  type,
  title,
  backgroundImage,
  linkText,
  link,
  iconAfter = 'ArrowRight',
}: Readonly<{
  type?: string;
  title: string;
  backgroundImage: string;
  key: string;
  linkText: string;
  link?: string;
  iconAfter?: keyof typeof Icons;
}>) {
  return (
    // <div className="col col-12 col-md-6 col-lg-4">
    <div className={styles.card}>
      <div className="overlay-wrapper">
        <Image
          src={`/images/${backgroundImage}`}
          alt={title}
          width={350}
          height={460}
          className={styles.cardImage}
        />
      </div>
      <div className={`${styles.cardContentWrapper} d-flex align-items-end`}>
        <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
          <div>
            {type && <span>{type}</span>}
            <h3 className="mt-2">{title}</h3>
          </div>
          <AppLink text={linkText} link={link} variant="primaryLink" iconAfter={iconAfter} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
