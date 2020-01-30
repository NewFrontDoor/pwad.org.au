import React, {FC, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
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
    fetchMore({
      variables: {
        skip: data?.keywordMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          keywordMany: [...prev.keywordMany, ...fetchMoreResult.keywordMany]
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

  return (
    <Label sx={{flexDirection: 'column'}}>
      <span>{label}</span>
      <Select
        isClearable
        isSearchable
        isLoading={loading}
        value={field.value}
        inputValue={searchTerm}
        options={options}
        onChange={value => helpers.setValue(value)}
        onMenuScrollToBottom={fetchMoreKeywords}
        onInputChange={value => {
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
