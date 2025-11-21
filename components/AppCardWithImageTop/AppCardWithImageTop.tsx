import Image from 'next/image';
import * as Icons from '@phosphor-icons/react';
import AppLink from '../AppLink/AppLink';
import styles from './AppCardWithImageTop.module.scss';

export default function AppCardWithImageTop({
  title,
  description,
  image,
  linkText,
  link,
  linkType = 'primaryLink',
  iconAfter = 'ArrowRight',
  className = '',
}: Readonly<{
  title: string;
  description: string;
  image: string;
  linkText: string;
  link: string;
  linkType?: 'primaryLink' | 'secondaryLink' | 'tertiaryLink' | 'buttonLink';
  iconAfter?: keyof typeof Icons;
  className?: string;
}>) {
  // Check if image is a full URL or a relative path
  const imageSrc = image.startsWith('http') || image.startsWith('/') ? image : `/images/${image}`;

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={330}
          className={styles.cardImage}
          unoptimized={image.startsWith('http')}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div>
          <h3 className={`fs-responsive-md my-16px`}>{title}</h3>
          <p className="five-line-truncate mb-24px">{description}</p>
        </div>
        <div className="mb-24px">
          <AppLink text={linkText} link={link} variant={linkType} iconAfter={iconAfter} />
        </div>
      </div>
    </div>
  );
}
