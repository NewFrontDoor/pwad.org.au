/** @jsx jsx */
import {Except} from 'type-fest';
import React, {FC, ReactNode, HTMLProps} from 'react';
import PropTypes from 'prop-types';
import {jsx, Button as BaseButton} from 'theme-ui';

type ButtonProps = {
  isPrimary?: boolean;
  isFullWidth?: boolean;
  as?: any;
  size?: string;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  children?: ReactNode;
} & Except<HTMLProps<HTMLButtonElement>, 'size'>;

const Button: FC<ButtonProps> = ({
  children,
  iconEnd,
  iconStart,
  isFullWidth,
  isPrimary,
  size,
  ...props
}) => {
  let width = 'initial';
  let variant = '';
  let startIcon = null;
  let endIcon = null;

  if (isPrimary) {
    variant = 'primary';
  }

  if (isFullWidth) {
    width = '100%';
  }

  if (iconStart) {
    startIcon = React.cloneElement(iconStart, {
      key: 'iconStart',
      width: '1em',
      height: '1em'
    });
  }

  if (iconEnd) {
    endIcon = React.cloneElement(iconEnd, {
      key: 'iconEnd',
      width: '1em',
      height: '1em'
    });
  }

  return (
    <BaseButton
      {...props}
      sx={{
        variant,
        width
      }}
    >
      <span
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          justifyContent: 'center',
          maxHeight: '100%',
          pointerEvents: 'none',
          width: '100%',

          '& [role="img"]': {
            boxSizing: 'content-box',
            display: 'block',
            flexShrink: 0
          },

          '& [role="img"]:first-of-type': {
            marginRight: 2
          },

          '& [role="img"]:last-of-type': {
            marginLeft: 2
          },

          '& [role="img"]:only-child': {
            margin: 0
          }
        }}
      >
        {startIcon}
        {children && <span>{children}</span>}
        {endIcon}
      </span>
    </BaseButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  iconEnd: PropTypes.element,
  iconStart: PropTypes.element,
  isFullWidth: PropTypes.bool,
  isPrimary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'jumbo'])
};

Button.defaultProps = {
  children: undefined,
  iconEnd: undefined,
  iconStart: undefined,
  isFullWidth: false,
  isPrimary: false,
  size: 'large'
};

export default Button;
