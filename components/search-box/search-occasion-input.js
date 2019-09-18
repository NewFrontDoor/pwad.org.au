import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Select from 'react-select';

import {FIND_OCCASION} from '../queries';

function SearchInput({name, value, onChange}) {
  const {loading, error, data: {occasionManyGroupById = []} = {}} = useQuery(
    FIND_OCCASION
  );

  let options = [];

  if (error) {
    options = [];
  } else {
    options = occasionManyGroupById.map(({name, values}) => ({
      label: name,
      options: values.map(({_id, name}) => ({value: _id, label: name}))
    }));
  }

  return (
    <Select
      isClearable
      isSearchable
      isLoading={loading}
      value={value}
      options={options}
      onChange={onChange(name)}
    />
  );
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
  value: undefined
};

export default SearchInput;
