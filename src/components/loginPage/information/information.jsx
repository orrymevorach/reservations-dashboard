import styles from './information.module.scss';

export default function Information() {
  return (
    <div className={styles.container}>
      <p>Welcome to the reservation platform config page.</p>
      <p>Here you are able to:</p>
      <ol className={styles.list}>
        <li>Book a cabin you would like to sleep in</li>
        <li>Reserve a specific bed in your cabin</li>
        <li>Make a reservation on behalf of your friends/partner</li>
        <li>Make changes to an existing reservation</li>
      </ol>
      <p>What you need to make a reservation:</p>
      <ol className={styles.list}>
        <li>Your email address</li>
        <li>
          Your password, which you have received in an email once you purchased
          a&nbsp;ticket.
        </li>
        <li>
          The email address(es) for each person you wish to reserve a spot for
          (optional)
        </li>
      </ol>
    </div>
  );
}
