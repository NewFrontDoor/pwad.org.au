import React, {FC, useState} from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {Label} from 'theme-ui';
import {useField} from 'formik';
import Select from 'react-select';
import options from '../../../lib/books';

type SearchInput = {
  name: string;
  label: string;
};

const SearchInput: FC<SearchInput> = ({label, ...props}) => {
  const [field, , helpers] = useField(props);
  const [searchTerm, setSearchTerm] = useState('');

  let {value} = field;

  if (value) {
    value = find(options, value);
  }

  return (
    <Label sx={{flexDirection: 'column'}}>
      <span>{label}</span>
      <Select
        isClearable
        isSearchable
        value={value}
        inputValue={searchTerm}
        options={options}
        onChange={(value) => {
          helpers.setValue(value);
        }}
        onInputChange={(value) => {
          setSearchTerm(value);
        }}
      />
    </Label>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default SearchInput;
