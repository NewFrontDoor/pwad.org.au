import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import Select from 'react-select';

import {useTheme} from '../use-theme';

import {FIND_METRE} from '../queries';

function SearchInput({name, value, onChange}) {
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

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Query query={FIND_METRE} variables={{metre: searchTerm}}>
      {({loading, error, data}) => {
        let options = [];

        if (error) {
          options = [];
        } else {
          options = data.metreMany.map(({_id, metre}) => ({
            label: metre,
            value: _id
          }));
        }

        return (
          <Select
            isMulti
            isSearchable
            styles={styles}
            isLoading={loading}
            value={value}
            inputValue={searchTerm}
            options={options}
            onChange={onChange(name)}
            onInputChange={value => setSearchTerm(value)}
          />
        );
      }}
    </Query>
  );
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchInput;
