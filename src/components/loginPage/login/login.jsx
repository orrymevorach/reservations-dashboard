import { getUserByEmail } from '@/lib/airtable';
import { useEffect, useState } from 'react';
import styles from './login.module.scss';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Loader from '../../shared/loader/loader';
import { COOKIES, ROUTES } from '@/utils/constants';
import Button from '../../shared/button/button';
import { TextField } from '@mui/material';

const useLoginExistingUserOnPageLoad = () => {
  const router = useRouter();
  useEffect(() => {
    const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);
    if (userRecordCookie) {
      router.push({
        pathname: ROUTES.CABIN_SELECTION,
      });
    }
  }, [router]);
};

const errors = {
  USER_NOT_FOUND:
    'We do not have a record of this email. Please buy a ticket, or contact info@highlandsmusicfestival.ca',
  INCORRECT_PASSWORD:
    'The order confirmation number does not match the one we have on file for this email. Please double check your spelling, or contact info@highlandsmusicfestival.ca',
  GENERIC:
    "We're sorry, an unknown error has occured. Please contact info@highlandsmusicfestival.ca.",
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useLoginExistingUserOnPageLoad();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const user = await getUserByEmail({ email });

    const userNotFound = !user?.id;
    const passwordDoesNotMatch = user?.id && user?.paymentIntent !== password;
    const userExistsAndPasswordMatches =
      user?.id && user?.paymentIntent === password;
    if (userExistsAndPasswordMatches) {
      Cookies.set(COOKIES.USER_RECORD, user.id);
      router.push({
        pathname: ROUTES.CABIN_SELECTION,
      });
      return;
    } else if (passwordDoesNotMatch) {
      setIsLoading(false);
      setError(errors.INCORRECT_PASSWORD);
      return;
    } else if (userNotFound) {
      setError(errors.USER_NOT_FOUND);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      setError(errors.GENERIC);
    }
  };

  const handleChange = (e, setInput) => {
    setError('');
    setInput(e.target.value);
  };

  if (isLoading) return <Loader isDotted classNames={styles.loader} />;

  return (
    <form action="#" onSubmit={e => handleSubmit(e)} className={styles.login}>
      <label htmlFor="email">Email</label>
      {error && <p className={styles.error}>{error}</p>}
      <TextField
        type="email"
        id="email"
        name="email"
        onChange={e => handleChange(e, setEmail)}
        value={email}
        className={styles.input}
        size="small"
      />
      <label htmlFor="password">Order Confirmation Number</label>
      <TextField
        type="password"
        id="password"
        name="password"
        onChange={e => handleChange(e, setPassword)}
        className={styles.input}
        size="small"
      />
      <Button classNames={styles.submit}>Log in</Button>
    </form>
  );
}
