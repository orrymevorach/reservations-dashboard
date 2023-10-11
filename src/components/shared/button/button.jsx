import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import styled from 'styled-components';

const ButtonContents = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
      ) : (
        children
      )}
    </>
  );
};

export default function Button({
  children,
  isLoading = false,
  isDisabled = false,
  href = null,
  handleClick = null,
  classNames = '',
  isLight = false,
  isAnchor = false,
  isSmall = false,
  isInverted = false,
}) {
  const primaryColour = '#2f2f2f';
  const classnames = clsx(
    styles.button,
    classNames,
    isLight && styles.light,
    isSmall && styles.small,
    isInverted && styles.inverted
  );

  const StyledButton = styled.button`
    background-color: ${primaryColour};
    border: 2px solid ${primaryColour};
    &.light,
    &:hover {
      color: ${primaryColour};
    }
  `;

  const NextLink = styled(Link)`
    background-color: ${primaryColour};
    border: 2px solid ${primaryColour};
    &.light,
    &:hover {
      color: ${primaryColour};
    }
  `;

  if (isAnchor) {
    return (
      <StyledButton as="a" href={href} className={classnames}>
        {children}
      </StyledButton>
    );
  }
  if (href) {
    return (
      <NextLink href={href} className={classnames}>
        {children}
      </NextLink>
    );
  }
  if (handleClick) {
    return (
      <StyledButton
        className={classnames}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </StyledButton>
    );
  }
  return (
    <StyledButton className={classnames} type="submit" disabled={isDisabled}>
      <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
    </StyledButton>
  );
}
