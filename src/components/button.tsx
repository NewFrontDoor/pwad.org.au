/** @jsx jsx */
import React, {FC, ReactNode, HTMLProps} from 'react';
import PropTypes from 'prop-types';
import {jsx, Button as BaseButton} from 'theme-ui';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  as?: any;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({children, iconStart, iconEnd, ...props}) => {
  let startIcon = null;
  let endIcon = null;

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
    <BaseButton {...props}>
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

          '& [role="img"]:first-child': {
            marginRight: 2
          },

          '& [role="img"]:last-child': {
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
  iconStart: PropTypes.element,
  iconEnd: PropTypes.element
};

Button.defaultProps = {
  children: undefined,
  iconStart: undefined,
  iconEnd: undefined
};

export default Button;
