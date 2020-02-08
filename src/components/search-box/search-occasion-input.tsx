import React, {FC} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Label} from 'theme-ui';
import {useField} from 'formik';
import {useFindOccasionQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
};

const SearchInput: FC<SearchInput> = ({label, ...props}) => {
  const [field, , helpers] = useField(props);
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
        value={field.value}
        options={options}
        onChange={value => helpers.setValue(value)}
      />
    </Label>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default SearchInput;
