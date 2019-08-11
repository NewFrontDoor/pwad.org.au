import React from 'react';
import Select from 'react-select';

import {useTheme} from '../use-theme';

function SearchInput(props) {
  const theme = useTheme();

  const styles = {
    control(provided, {isActive, isFocused}) {
      const activeBoxShadow = `0 0 0 1px ${
        theme.boxShadow_focusInner
      }, 0 0 0 2px ${theme.borderColor_theme_active}`;

      return {
        ...provided,
        borderRadius: theme.borderRadius_1,
        borderColor: isFocused
          ? theme.borderColor_theme_hover
          : theme.borderColor,
        boxShadow: isActive ? activeBoxShadow : null,
        '&:active': {
          boxShadow: activeBoxShadow
        },
        '&:hover': {
          ...provided['&:hover'],
          borderColor: theme.borderColor_theme_hover
        }
      };
    },
    menu(provided) {
      return {
        ...provided,
        zIndex: theme.zIndex_100
      };
    }
  };

  return <Select styles={styles} {...props} />;
}

export default SearchInput;
