import styles from './loginPage.module.scss';
import Login from '@/components/loginPage/login';
// import Information from '@/components/loginPage/information';

export default function LoginPageContainer() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.column}>{/* <Information /> */}</div>
      <div className={styles.column}>
        <Login />
      </div>
    </main>
  );
}
