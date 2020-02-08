import React, {FC, useReducer} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {useQuery} from '@apollo/react-hooks';
import {Styled, Box, Flex, Button} from 'theme-ui';
import {Formik, Form, Field} from 'formik';
import {TextField} from '../form';
import {usePrayerSearchQuery, PrayerSearchQueryVariables} from '../queries';
import SearchResult from './search-result';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';

const initialState = {
  showSearchResults: false
};

function reducer(state, action) {
  let keyword;
  let occasion;

  switch (action.type) {
    case 'search':
      if (action.fields.occasion) {
        occasion = action.fields.occasion.value;
      }

      if (action.fields.keyword) {
        keyword = action.fields.keyword.value;
      }

      return {
        ...pickBy(
          {
            ...state,
            ...action.fields,
            occasion,
            keyword
          },
          identity
        ),
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

type AdvancedSearchProps = {
  search: PrayerSearchQueryVariables;
};

const AdvancedSearch: FC<AdvancedSearchProps> = ({search}) => {
  const {loading, error, data} = usePrayerSearchQuery({
    variables: search
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  if (data?.prayerSearch?.length > 0) {
    return data.prayerSearch.map(result => (
      <SearchResult key={result._id} {...result} />
    ));
  }

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

AdvancedSearch.propTypes = {
  search: PropTypes.object.isRequired
};

const SearchBox: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showSearchResults, ...search} = state;

  return (
    <>
      <Formik
        initialValues={{
          search: '',
          title: '',
          occasion: '',
          keyword: ''
        }}
        onSubmit={fields => dispatch({type: 'search', fields})}
      >
        <Form>
          <Flex>
            <Box grow={1} sx={{flexDirection: ['column', 'row'], width: '50%'}}>
              <Box marginBottom="1em">
                <TextField label="Title" name="title" />
              </Box>
              <Box marginBottom="1em">
                <Field
                  as={SearchOccasionInput}
                  label="Occasion"
                  name="occasion"
                />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchKeywordInput} label="Keyword" name="keyword" />
              </Box>
              <Box marginBottom="1em">
                <Button fullWidth type="submit">
                  Search
                </Button>
              </Box>
            </Box>
          </Flex>
        </Form>
      </Formik>
      {showSearchResults && <AdvancedSearch search={search} />}
    </>
  );
};

export default SearchBox;
