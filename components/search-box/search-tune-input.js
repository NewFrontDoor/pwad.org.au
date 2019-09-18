import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Select from 'react-select';

import {FIND_TUNE} from '../queries';

function SearchInput({name, value, onChange}) {
  const [searchTerm, setSearchTerm] = useState('');
  const {loading, error, data: {tuneMany = []} = {}, fetchMore} = useQuery(
    FIND_TUNE,
    {
      variables: {title: searchTerm}
    }
  );

  const fetchMoreTunes = useCallback(() => {
    fetchMore({
      variables: {
        skip: tuneMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          tuneMany: [...prev.tuneMany, ...fetchMoreResult.tuneMany]
        };
      }
    });
  }, [fetchMore, tuneMany.length]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options = tuneMany.map(({_id, title}) => ({
      label: title,
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
      onMenuScrollToBottom={fetchMoreTunes}
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
