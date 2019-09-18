import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {Formik, Form, FormField} from '../form';
import {TEXT_SEARCH} from '../queries';
import SearchResult from './search-result';

const initialState = {
  showSearchResults: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        ...action.fields,
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function TextSearch({search}) {
  const {
    loading,
    error,
    data: {hymnMany, prayerMany, liturgyMany} = {}
  } = useQuery(TEXT_SEARCH, {
    variables: search
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const results = [...hymnMany, ...prayerMany, ...liturgyMany].sort(
    (a, b) => b.score - a.score
  );

  if (results.length > 0) {
    return results.map(result => <SearchResult key={result._id} {...result} />);
  }

  return <Text appearance="prose">No results found...</Text>;
}

TextSearch.propTypes = {
  search: PropTypes.object.isRequired
};

function SearchBox() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showSearchResults, ...search} = state;

  return (
    <>
      <Text as="h3">Search</Text>
      <Text appearance="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Text>
      <Formik
        initialValues={{
          search: ''
        }}
        onSubmit={fields => dispatch({type: 'search', fields})}
      >
        <Form>
          <Flex marginBottom="1em">
            <FlexItem grow={1} marginEnd="auto">
              <FormField
                hideLabel
                input={TextInput}
                label="Search"
                name="search"
                placeholder="Search..."
                type="search"
              />
            </FlexItem>

            <FlexItem marginStart="1em">
              <Button type="submit">Search</Button>
            </FlexItem>
          </Flex>
        </Form>
      </Formik>
      {showSearchResults && <TextSearch search={search} />}
    </>
  );
}

export default SearchBox;
