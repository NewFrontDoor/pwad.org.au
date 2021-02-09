import {useCallback, useEffect, ReactNode, FC} from 'react';
import ReactDOM from 'react-dom';
import usePortal from '../use-portal';

type NavOverlayProps = {
  children?: ReactNode;
  onClickOutside: () => void;
};

const NavOverlay: FC<NavOverlayProps> = ({children, onClickOutside}) => {
  const target = usePortal('modal');

  const handleClick = useCallback(
    (event) => {
      if (target?.contains(event.target)) {
        return;
      }

      onClickOutside();
    },
    [onClickOutside, target]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  if (target) {
    return ReactDOM.createPortal(children, target);
  }

  return null;
};

export default NavOverlay;
