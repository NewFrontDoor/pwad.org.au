import React, {FC, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Label} from 'theme-ui';

import {useFindMetreQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
  value: Array<{
    label?: string;
    value?: string;
  }>;
  onChange: (name: string) => () => void;
};

const SearchInput: FC<SearchInput> = ({name, label, value, onChange}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {loading, error, data, fetchMore} = useFindMetreQuery({
    variables: {metre: searchTerm}
  });

  const fetchMoreMetres = useCallback(() => {
    fetchMore({
      variables: {
        skip: data?.metreMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          metreMany: [...prev.metreMany, ...fetchMoreResult.metreMany]
        };
      }
    });
  }, [data, fetchMore]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options =
      data?.metreMany?.map(({_id, metre, tunes}) => ({
        label: metre,
        value: _id,
        tunes: tunes.map(({_id}) => _id)
      })) ?? [];
  }

  return (
    <Label sx={{flexDirection: 'column'}}>
      <span>{label}</span>
      <Select
        isMulti
        isClearable
        isSearchable
        isLoading={loading}
        value={value}
        inputValue={searchTerm}
        options={options}
        onChange={onChange(name)}
        onMenuScrollToBottom={fetchMoreMetres}
        onInputChange={value => setSearchTerm(value)}
      />
    </Label>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchInput;
