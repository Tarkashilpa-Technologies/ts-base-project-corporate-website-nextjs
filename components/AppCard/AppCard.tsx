import Image from 'next/image';
import AppLink from '../AppLink/AppLink';
import styles from './AppCard.module.scss';

export default function AppCard({
  type,
  title,
  backgroundImage,
}: Readonly<{ type?: string; title: string; backgroundImage: string; key: string }>) {
  return (
    <div className="col col-12 col-md-6 col-lg-4">
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
            <AppLink text="Read More" variant="primaryLink" iconAfter="ArrowRight" />
          </div>
        </div>
      </div>
    </div>
  );
}
