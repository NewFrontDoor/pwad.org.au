import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Select from 'react-select';

import {FIND_KEYWORD} from '../queries';

function SearchInput({name, value, onChange}) {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    loading,
    error,
    data: {keywordMany = []},
    fetchMore
  } = useQuery(FIND_KEYWORD, {
    variables: {title: searchTerm}
  });

  const fetchMoreKeywords = useCallback(() => {
    fetchMore({
      variables: {
        skip: keywordMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          keywordMany: [...prev.keywordMany, ...fetchMoreResult.keywordMany]
        };
      }
    });
  }, [fetchMore, keywordMany.length]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options = keywordMany.map(({_id, name}) => ({
      label: name,
      value: _id
    }));
  }

  return (
    <Select
      isClearable
      isSearchable
      isLoading={loading}
      value={value}
      inputValue={searchTerm}
      options={options}
      onChange={onChange(name)}
      onMenuScrollToBottom={fetchMoreKeywords}
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
