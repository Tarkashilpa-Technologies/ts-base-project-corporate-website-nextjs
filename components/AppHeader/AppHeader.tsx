import { Link } from '../../i18n/navigation';
import Image from 'next/image';
import styles from './AppHeader.module.scss';
import { getTranslations } from 'next-intl/server';

export default async function AppHeader() {
  const t = await getTranslations('HEADER');
  const links = [
    {
      title: t('ABOUT'),
      url: '/about',
    },
    {
      title: t('COMPANY'),
      url: '/company',
    },
    {
      title: t('NEWS'),
      url: '/news',
    },
    {
      title: t('SUSTAINABILITY'),
      url: '/sustainability',
    },
    {
      title: t('COUNTRY'),
      url: '/country',
    },
  ];
  return (
    <header className="position-fixed w-100" style={{ zIndex: 1 }}>
      <nav className="navbar navbar-expand-lg p-0">
        <div className={`${styles.header} container-fluid`}>
          <Link href="/" className="navbar-brand p-0">
            <Image
              src="/images/header_logo.svg"
              alt="NTT logo"
              width={144}
              height={0}
              className="h-100"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {links.map((link, index) => (
                <li className="nav-item" key={'link' + index}>
                  <Link href={link.url} className={`${styles.headerFont} nav-link`}>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={'/about'} locale="ms" className={`${styles.headerFont} nav-link`}>
                  {t('MALAY')}
                </Link>
              </li>
              <li>
                <Link href={'/about'} locale="en" className={`${styles.headerFont} nav-link`}>
                  {t('ENGLISH')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
