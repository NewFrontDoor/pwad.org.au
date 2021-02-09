import React, {FC, useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Select from 'react-select';
import {Label} from 'theme-ui';
import {useField} from 'formik';
import {useFindTuneQuery} from '../queries';

type SearchInput = {
  name: string;
  label: string;
};

const SearchInput: FC<SearchInput> = ({label, ...props}) => {
  const [field, , helpers] = useField(props);
  const [searchTerm, setSearchTerm] = useState('');
  const {loading, error, data, fetchMore} = useFindTuneQuery({
    variables: {title: searchTerm}
  });

  const tuneMany = useMemo(() => data?.tuneMany ?? [], [data?.tuneMany]);

  const fetchMoreTunes = useCallback(() => {
    void fetchMore({
      variables: {
        skip: tuneMany.length
      },
      updateQuery: (previous, {fetchMoreResult}) => {
        if (!fetchMoreResult) return previous;
        return {
          ...previous,
          tuneMany: [
            ...(previous.tuneMany ?? []),
            ...(fetchMoreResult.tuneMany ?? [])
          ]
        };
      }
    });
  }, [fetchMore, tuneMany]);

  const options = error
    ? []
    : data?.tuneMany?.map(({_id, title}) => ({
        label: title,
        value: _id
      })) ?? [];

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
        onChange={(value) => {
          helpers.setValue(value);
        }}
        onMenuScrollToBottom={fetchMoreTunes}
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
