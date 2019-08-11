import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Select from '../form/select';
import options from '../../lib/books';

function SearchInput({name, value, onChange}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Select
      isClearable
      isSearchable
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
