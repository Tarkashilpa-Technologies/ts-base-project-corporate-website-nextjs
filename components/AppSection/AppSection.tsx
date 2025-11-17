import { ReactNode } from 'react';
import AppKeywordHighlighter from '../AppKeywordHighlighter/AppKeywordHighlighter';
import styles from './AppSection.module.scss';

export default function AppSection({
  title,
  subtitle,
  children,
  className = '',
  highlightWord,
}: Readonly<{
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  highlightWord?: string | string[];
}>) {
  return (
    <section className={`${className} ${styles.sectionPadding}`}>
      <div className="content-wrapper">
        {title && (
          <h2
            className={`mb-64px ${styles.titleFont}  ${className.includes('bg-light') ? 'text-black' : 'text-white'}`}
          >
            {highlightWord ? (
              <AppKeywordHighlighter text={title} keywords={highlightWord} />
            ) : (
              title
            )}
          </h2>
        )}
        {subtitle && (
          <p
            className={`mb-24px col-12 col-xl-8 ${className.includes('bg-light') ? 'text-black' : 'text-white'}`}
          >
            {subtitle}
          </p>
        )}
        <div className="">{children}</div>
      </div>
    </section>
  );
}
