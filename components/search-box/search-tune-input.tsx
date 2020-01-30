import React, {FC, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Label} from 'theme-ui';
import {useField} from 'formik';
import {useFindTuneQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
};

const SearchInput: FC<SearchInput> = ({label, ...props}) => {
  const [field, _, helpers] = useField(props);
  const [searchTerm, setSearchTerm] = useState('');
  const {loading, error, data, fetchMore} = useFindTuneQuery({
    variables: {title: searchTerm}
  });

  const fetchMoreTunes = useCallback(() => {
    fetchMore({
      variables: {
        skip: data?.tuneMany.length
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          tuneMany: [...prev.tuneMany, ...fetchMoreResult.tuneMany]
        };
      }
    });
  }, [fetchMore, data]);

  let options = [];

  if (error) {
    options = [];
  } else {
    options =
      data?.tuneMany?.map(({_id, title}) => ({
        label: title,
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
        onMenuScrollToBottom={fetchMoreTunes}
        onInputChange={value => setSearchTerm(value)}
      />
    </Label>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

SearchInput.defaultProps = {
  value: undefined
};

export default SearchInput;
