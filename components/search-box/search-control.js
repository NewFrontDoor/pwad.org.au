import React, {useReducer} from 'react';
import {isEmpty, pickBy, identity} from 'lodash';
import {Query} from 'react-apollo';
import Box from 'mineral-ui/Box';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import Media from '../media';
import {Formik, Form, FormField} from '../form';
import {LIST_ALL} from '../queries';
import SearchResult from './search-result';
import SearchInput from './search-input';

const initialState = {
  showHowToSearch: false,
  showAdvancedSeach: true
};

function reducer(state, action) {
  let hymnMetres;

  switch (action.type) {
    case 'toggle-how-to-search':
      return {...state, showHowToSearch: !state.showHowToSearch};
    case 'toggle-advanced-search':
      return {...state, showAdvancedSeach: !state.showAdvancedSeach};
    case 'search':
      if (action.fields.hymnMetres.length > 0) {
        hymnMetres = action.fields.hymnMetres.map(({value}) => value);
      }

      return {
        ...state,
        ...pickBy(
          {
            ...action.fields,
            hymnMetres
          },
          identity
        )
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function SearchBox() {
  const [
    {showHowToSearch, showAdvancedSeach, ...search},
    dispatch
  ] = useReducer(reducer, initialState);
  const showSearchResults = !isEmpty(search);

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
          hymnMetres: [],
          search: '',
          title: '',
          tune: '',
          passage: ''
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
            {showAdvancedSeach && (
              <FlexItem marginStart="1em">
                <Button type="submit">Search</Button>
              </FlexItem>
            )}
          </Flex>
          <Flex justifyContent="between" marginBottom="1em">
            <Media query="medium">
              <FlexItem>
                <Button
                  minimal
                  size="medium"
                  onClick={() => dispatch({type: 'toggle-how-to-search'})}
                >
                  How to search
                </Button>
              </FlexItem>
            </Media>
            <FlexItem>
              <Button
                minimal
                size="medium"
                onClick={() => dispatch({type: 'toggle-advanced-search'})}
              >
                Advanced Search
              </Button>
            </FlexItem>
          </Flex>
          {showHowToSearch && (
            <Text>
              Search Instructions to help people to search. Lorem ipsum dolor
              sit amet, affert theophrastus in sea, at aeterno invidunt platonem
              has. Habeo inimicus rationibus mel ex, nisl fabellas nec ei, quo
              et quot putant legendos. Prompta definitiones nam an, quidam
              scaevola per te. Eum at purto vocibus mnesarchum, diam falli an
              nam. Dicunt perfecto deserunt mel in, mundi moderatius eu eam.
            </Text>
          )}
          {showAdvancedSeach && (
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
                    name="hymnMetres"
                    input={SearchInput}
                    label="Hymn Metre"
                  />
                </Box>
                <Box marginBottom="1em">
                  <FormField input={TextInput} label="Tune" name="tune" />
                </Box>
                <Box marginBottom="1em">
                  <FormField input={TextInput} label="Passage" name="passage" />
                </Box>
              </FlexItem>
              <Media query="medium">
                <FlexItem grow={1} width="50%">
                  <Text>
                    Search Instructions to help people to search. Lorem ipsum
                    dolor sit amet, affert theophrastus in sea, at aeterno
                    invidunt platonem has. Habeo inimicus rationibus mel ex,
                    nisl fabellas nec ei, quo et quot putant legendos. Prompta
                    definitiones nam an, quidam scaevola per te. Eum at purto
                    vocibus mnesarchum, diam falli an nam. Dicunt perfecto
                    deserunt mel in, mundi moderatius eu eam.
                  </Text>
                </FlexItem>
              </Media>
            </Flex>
          )}
        </Form>
      </Formik>
      {showSearchResults && (
        <Query query={LIST_ALL} variables={search}>
          {({loading, error, data}) => {
            console.log(search);
            if (loading) {
              return 'Loading...';
            }

            if (error) {
              return `Error! ${error.message}`;
            }

            return data.hymnMany.map(hymn => (
              <SearchResult key={hymn._id} {...hymn} />
            ));
          }}
        </Query>
      )}
    </>
  );
}

export default SearchBox;
