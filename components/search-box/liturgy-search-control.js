import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {useQuery} from '@apollo/react-hooks';
import Box from 'mineral-ui/Box';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {Formik, Form, FormField} from '../form';
import {ADVANCED_SEARCH} from '../queries';
import SearchResult from './search-result';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';

const initialState = {
  showSearchResults: false,
  showHowToSearch: false,
  showAdvancedSeach: false
};

function reducer(state, action) {
  let keywords;
  let occasion;

  switch (action.type) {
    case 'search':
      if (action.fields.occasion) {
        occasion = action.fields.occasion.value;
      }

      if (action.fields.keyword) {
        keywords = [action.fields.keyword.value];
      }

      return {
        ...pickBy(
          {
            ...state,
            ...action.fields,
            occasion,
            keywords
          },
          identity
        ),
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function AdvancedSearch({search}) {
  const {loading, error, data: {liturgyMany} = {}} = useQuery(ADVANCED_SEARCH, {
    variables: search
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const results = liturgyMany.sort((a, b) => b.score - a.score);

  if (results.length > 0) {
    return results.map(result => <SearchResult key={result._id} {...result} />);
  }

  return <Text appearance="prose">No results found...</Text>;
}

AdvancedSearch.propTypes = {
  search: PropTypes.object.isRequired
};

function SearchBox() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showSearchResults, ...search} = state;

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          occasion: null,
          keyword: null
        }}
        onSubmit={fields => dispatch({type: 'search', fields})}
      >
        <Form>
          <Flex>
            <FlexItem
              grow={1}
              width="50%"
              breakpoints={['medium']}
              direction={['column', 'row']}
            >
              <Box marginBottom="1em">
                <FormField input={TextInput} label="Title" name="title" />
              </Box>
              <Box marginBottom="1em">
                <FormField
                  input={SearchOccasionInput}
                  label="Occasion"
                  name="occasion"
                />
              </Box>
              <Box marginBottom="1em">
                <FormField
                  input={SearchKeywordInput}
                  label="Keyword"
                  name="keyword"
                />
              </Box>
              <Box marginBottom="1em">
                <Button fullWidth type="submit">
                  Search
                </Button>
              </Box>
            </FlexItem>
          </Flex>
        </Form>
      </Formik>
      {showSearchResults && <AdvancedSearch search={search} />}
    </>
  );
}

export default SearchBox;
