import React, {FC, useState} from 'react';
import PropTypes from 'prop-types';
import {Label} from 'theme-ui';
import Select from '../form/select';
import options from '../../lib/books';

type SearchInput = {
  name: string;
  label: string;
  value?: {
    label: string;
    value: string;
  };
  onChange: (name: string) => () => void;
};

const SearchInput: FC<SearchInput> = ({name, label, value, onChange}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Label sx={{flexDirection: 'column'}}>
      <span>{label}</span>
      <Select
        isClearable
        isSearchable
        value={value}
        inputValue={searchTerm}
        options={options}
        onChange={onChange(name)}
        onInputChange={value => setSearchTerm(value)}
      />
    </Label>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
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
