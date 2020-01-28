import React, {FC} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Label} from 'theme-ui';

import {useFindOccasionQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
  value: {
    label?: string;
    value?: string;
  };
  onChange: (name: string) => () => void;
};

const SearchInput: FC<SearchInput> = ({name, label, value, onChange}) => {
  const {loading, error, data} = useFindOccasionQuery();

  let options = [];

  if (error) {
    options = [];
  } else {
    options =
      data?.occasionManyGroupById?.map(({name, values}) => ({
        label: name,
        options: values.map(({_id, name}) => ({value: _id, label: name}))
      })) ?? [];
  }

  return (
    <Label sx={{flexDirection: 'column'}}>
      <span>{label}</span>
      <Select
        isClearable
        isSearchable
        isLoading={loading}
        value={value}
        options={options}
        onChange={onChange(name)}
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
