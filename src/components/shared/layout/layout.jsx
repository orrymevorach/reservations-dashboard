import styles from './layout.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import Nav from '../nav/nav';

export const Logo = ({ classNames = '', url, height, width, quality }) => {
  return (
    <Image
      src={url}
      className={clsx(styles.image, classNames)}
      alt="Logo"
      height={height}
      width={width}
      quality={quality || 60}
    />
  );
};

export default function Layout({ children }) {
  const router = useRouter();
  const { user, dispatch } = useUser();

  const handleLogout = () => {
    Cookies.remove(COOKIES.USER_RECORD);
    dispatch({ type: 'LOG_OUT' });
    window.location = '/';
  };

  return (
    <div className={styles.container}>
      {user && (
        <Nav
          navData={[
            {
              label: 'Log Out',
              isButton: true,
              handleClick: handleLogout,
            },
          ]}
        />
      )}

      {/* <Logo {...config.logo[0]} className={styles.image} alt="" quality={50} /> */}

      {children}
    </div>
  );
}
