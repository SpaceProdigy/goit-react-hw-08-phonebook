import { Suspense } from 'react';
import css from './Home.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Outlet, useLocation } from 'react-router-dom';
import Spiner from 'components/Spiner/Spiner';
import backgroundImageMain from '../../images/bgr-book.jpg';
import ScrollDialog from 'components/Dialog/Dialog';

const Home = () => {
  const { pathname } = useLocation();

  return (
    <>
      <section
        style={
          pathname !== '/contacts'
            ? { backgroundImage: `url(${backgroundImageMain})` }
            : { backgroundImage: `none`, height: '100%' }
        }
        className={css.home}
      >
        {pathname === '/' && (
          <>
            <div className={css.titleWrapper}>
              <h1 className={css.title}>PhoneBook_Pro</h1>
              <div className={css.dialog}>
                <ScrollDialog />
              </div>
            </div>
          </>
        )}
        {pathname !== '/contacts' && (
          <div className={css.footer}>
            <GitHubIcon />
            <a
              className={css.link}
              href="https://github.com/SpaceProdigy"
              rel="noopener noreferrer"
            >
              Creator
            </a>
          </div>
        )}
      </section>
      <Suspense fallback={<Spiner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Home;
