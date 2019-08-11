import React, {useReducer} from 'react';
import {pickBy, identity} from 'lodash';
import {useQuery} from '@apollo/react-hooks';
import Box from 'mineral-ui/Box';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {useMediumMedia} from '../use-media';
import {Formik, Form, FormField} from '../form';
import {LIST_ALL} from '../queries';
import SearchResult from './search-result';
import SearchHymnInput from './search-hymn-input';
import SearchTuneInput from './search-tune-input';
import SearchPassageInput from './search-passage-input';

const initialState = {
  showSearchResults: false,
  showHowToSearch: false,
  showAdvancedSeach: true
};

function reducer(state, action) {
  let book;
  let tune;
  let hymnMetres;

  switch (action.type) {
    case 'toggle-how-to-search':
      return {...state, showHowToSearch: !state.showHowToSearch};
    case 'toggle-advanced-search':
      return {...state, showAdvancedSeach: !state.showAdvancedSeach};
    case 'search':
      if (action.fields.hymnMetres && action.fields.hymnMetres.length > 0) {
        hymnMetres = action.fields.hymnMetres.map(({value}) => value);
      }

      if (action.fields.passage) {
        book = action.fields.passage.value;
      }

      if (action.fields.tune) {
        tune = action.fields.tune.value;
      }

      return {
        ...state,
        ...pickBy(
          {
            ...action.fields,
            hymnMetres,
            book,
            tune
          },
          identity
        ),
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function SearchResults({search}) {
  const {
    loading,
    error,
    data: {hymnMany}
  } = useQuery(LIST_ALL, {
    variables: search
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  if (hymnMany.length > 0) {
    return hymnMany.map(hymn => <SearchResult key={hymn._id} {...hymn} />);
  }

  return <Text appearance="prose">No results found...</Text>;
}

function SearchBox() {
  const isMedium = useMediumMedia();
  const [
    {showHowToSearch, showAdvancedSeach, showSearchResults, ...search},
    dispatch
  ] = useReducer(reducer, initialState);

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
          tune: null,
          passage: null
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
            {isMedium && (
              <FlexItem>
                <Button
                  minimal
                  size="medium"
                  onClick={() => dispatch({type: 'toggle-how-to-search'})}
                >
                  How to search
                </Button>
              </FlexItem>
            )}
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
                    input={SearchHymnInput}
                    label="Hymn Metre"
                    name="hymnMetres"
                  />
                </Box>
                <Box marginBottom="1em">
                  <FormField input={SearchTuneInput} label="Tune" name="tune" />
                </Box>
                <Box marginBottom="1em">
                  <FormField
                    input={SearchPassageInput}
                    label="Passage"
                    name="passage"
                  />
                </Box>
              </FlexItem>
              {isMedium && (
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
              )}
            </Flex>
          )}
        </Form>
      </Formik>
      {showSearchResults && <SearchResults search={search} />}
    </>
  );
}

export default SearchBox;
