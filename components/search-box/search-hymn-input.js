import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Select from 'react-select';

import {FIND_METRE} from '../queries';

function SearchInput({name, value, onChange}) {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    loading,
    error,
    data: {metreMany = []}
  } = useQuery(FIND_METRE, {
    variables: {metre: searchTerm}
  });

  let options = [];

  if (error) {
    options = [];
  } else {
    options = metreMany.map(({_id, metre}) => ({
      label: metre,
      value: _id
    }));
  }

  return (
    <Select
      isMulti
      isSearchable
      isLoading={loading}
      value={value}
      inputValue={searchTerm}
      options={options}
      onChange={onChange(name)}
      onInputChange={value => setSearchTerm(value)}
    />
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
