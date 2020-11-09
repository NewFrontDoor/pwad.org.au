import React, {FC, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Select from 'react-select';
import {Label} from 'theme-ui';
import {useField} from 'formik';
import {useFindKeywordQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
};

const SearchInput: FC<SearchInput> = ({label, ...props}) => {
  const [field, , helpers] = useField(props);
  const [searchTerm, setSearchTerm] = useState('');
  const {loading, error, data, fetchMore} = useFindKeywordQuery({
    variables: {title: searchTerm}
  });

  const fetchMoreKeywords = useCallback(() => {
    void fetchMore({
      variables: {
        skip: data?.keywordMany.length
      },
      updateQuery: (previous, {fetchMoreResult}) => {
        if (!fetchMoreResult) return previous;
        return {
          ...previous,
          keywordMany: [...previous.keywordMany, ...fetchMoreResult.keywordMany]
        };
      }
    });
  }, [fetchMore, data]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options =
      data?.keywordMany?.map(({_id, name}) => ({
        label: name,
        value: _id
      })) ?? [];
  }

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
        isLoading={loading}
        value={value}
        inputValue={searchTerm}
        options={options}
        onChange={(value) => helpers.setValue(value)}
        onMenuScrollToBottom={fetchMoreKeywords}
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
