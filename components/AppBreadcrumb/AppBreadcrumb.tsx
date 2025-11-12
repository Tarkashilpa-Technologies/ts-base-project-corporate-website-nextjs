import { Link } from '@/i18n/navigation';
import styles from './AppBreadcrumb.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function AppBreadcrumb({
  items,
  className = '',
}: Readonly<{
  items: BreadcrumbItem[];
  className?: string;
}>) {
  const isBlackText = className.includes('text-black');

  return (
    <nav aria-label="breadcrumb" className={`${styles.breadcrumb} ${className}`}>
      <ol className={`${styles.list} ${isBlackText ? styles.blackVariant : styles.whiteVariant}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={'crumb' + index} className={styles.listItem}>
              {!isLast && item.href ? (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                  <span className={styles.separator}>&gt;</span>
                </>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
