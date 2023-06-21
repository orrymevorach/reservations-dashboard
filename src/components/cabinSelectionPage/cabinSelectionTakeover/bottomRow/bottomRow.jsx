import { useState } from 'react';
import Button from '@/components/shared/button/button';
import styles from './bottomRow.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import Loader from '@/components/shared/loader/loader';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';

export default function BottomRow() {
  const { selectedCabin } = useCabinSelection();

  const [isLoading, setIsLoading] = useState(false);

  // const reserveCabinForVerifiedUsers = async () => {
  //   setIsLoading(true);
  //   for (let i = 0; i < verifiedUsers.length; i++) {
  //     const user = verifiedUsers[i];
  //     const response = await reserveSpotInCabin({
  //       cabinId: selectedCabin.id,
  //       attendeeId: user.id,
  //     });
  //   }
  //   setIsLoading(false);
  // };

  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push({
        pathname: ROUTES.RESERVE,
        query: { cabin: selectedCabin.name },
      });
    }, 500);
  };

  if (isLoading) {
    return (
      <div className={styles.overlay}>
        <Loader isDotted />
      </div>
    );
  }

  return (
    <div className={styles.bottomRow}>
      <Button handleClick={handleClick} classNames={styles.nextButton}>
        Continue
      </Button>
    </div>
  );
}