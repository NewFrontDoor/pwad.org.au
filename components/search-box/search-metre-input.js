import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Select from 'react-select';

import {FIND_METRE} from '../queries';

function SearchInput({name, value, onChange}) {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    loading,
    error,
    data: {metreMany = []},
    fetchMore
  } = useQuery(FIND_METRE, {
    variables: {metre: searchTerm}
  });

  const fetchMoreMetres = useCallback(() => {
    fetchMore({
      variables: {
        skip: metreMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          metreMany: [...prev.metreMany, ...fetchMoreResult.metreMany]
        };
      }
    });
  }, [fetchMore, metreMany.length]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options = metreMany.map(({_id, metre, tunes}) => ({
      label: metre,
      value: _id,
      tunes: tunes.map(({_id}) => _id)
    }));
  }

  return (
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
