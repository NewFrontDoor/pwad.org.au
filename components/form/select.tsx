import React, {FC} from 'react';
import Select, {Props} from 'react-select';

import {useThemeUI} from 'theme-ui';

const SearchInput: FC<Props> = props => {
  const {theme} = useThemeUI();

  const styles = {
    control(provided: Record<string, object>, {isActive, isFocused}) {
      const activeBoxShadow = `0 0 0 1px ${theme.boxShadow_focusInner}, 0 0 0 2px ${theme.borderColor_theme_active}`;

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
    menu(provided: Record<string, string>) {
      return {
        ...provided,
        zIndex: theme.zIndex_100
      };
    }
  };

  return <Select styles={styles} {...props} />;
};

export default SearchInput;
