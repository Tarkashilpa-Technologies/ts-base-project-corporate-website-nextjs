import { ReactNode } from 'react';
import styles from './AppSection.module.scss';

export default function AppSection({
  title,
  subtitle,
  children,
  className = '',
}: Readonly<{
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <section className={`${className} ${styles.sectionPadding}`}>
      <div className="content-wrapper">
        {title && <h2 className={`mb-64px ${styles.titleFont}`}>{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        <div className="">{children}</div>
      </div>
    </section>
  );
}
