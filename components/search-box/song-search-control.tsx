import React, {FC, useReducer} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {useQuery} from '@apollo/react-hooks';
import {Styled, Button, Flex, Box} from 'theme-ui';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import {ADVANCED_SEARCH} from '../queries';
import SearchResult from './search-result';
import SearchMetreInput from './search-metre-input';
import SearchTuneInput from './search-tune-input';
import SearchPassageInput from './search-passage-input';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';

const initialState = {
  showSearchResults: false,
  showHowToSearch: false,
  showAdvancedSeach: false
};

function reducer(state, action) {
  let keywords;
  let tunes;
  let book;
  let occasion;

  switch (action.type) {
    case 'search':
      if (action.fields.hymnMetres && action.fields.hymnMetres.length > 0) {
        tunes = action.fields.hymnMetres.flatMap(({tunes}) => tunes);
      }

      if (action.fields.passage) {
        book = action.fields.passage.value;
      }

      if (action.fields.occasion) {
        occasion = action.fields.occasion.value;
      }

      if (action.fields.tune) {
        if (tunes) {
          tunes.push(action.fields.tune.value);
        } else {
          tunes = [action.fields.tune.value];
        }
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
            book,
            tunes,
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

type AdvancedSearchProps = {
  search: string;
};

const AdvancedSearch: FC<AdvancedSearchProps> = ({search}) => {
  const {
    loading,
    error,
    data: {hymnMany, prayerMany, liturgyMany} = {}
  } = useQuery(ADVANCED_SEARCH, {
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

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

AdvancedSearch.propTypes = {
  search: PropTypes.object.isRequired
};

function SearchBox() {
  const isMedium = useMediumMedia();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showSearchResults, ...search} = state;

  return (
    <>
      <Formik
        initialValues={{
          hymnMetres: [],
          search: '',
          title: '',
          occasion: null,
          keyword: null,
          tune: null,
          passage: null
        }}
        onSubmit={fields => dispatch({type: 'search', fields})}
      >
        <Form>
          <Flex>
            <Box grow={1} width="50%" sx={{flexDirection: ['column', 'row']}}>
              <Box marginBottom="1em">
                <TextField label="Title" name="title" />
              </Box>
              <Box marginBottom="1em">
                <TextField
                  input={SearchMetreInput}
                  label="Hymn Metre"
                  name="hymnMetres"
                />
              </Box>
              <Box marginBottom="1em">
                <TextField input={SearchTuneInput} label="Tune" name="tune" />
              </Box>
              <Box marginBottom="1em">
                <TextField
                  input={SearchPassageInput}
                  label="Passage"
                  name="passage"
                />
              </Box>
              <Box marginBottom="1em">
                <TextField
                  input={SearchOccasionInput}
                  label="Occasion"
                  name="occasion"
                />
              </Box>
              <Box marginBottom="1em">
                <TextField
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
            </Box>
            {isMedium && (
              <Box grow={1} width="50%">
                <Styled.p>
                  Search Instructions to help people to search. Lorem ipsum
                  dolor sit amet, affert theophrastus in sea, at aeterno
                  invidunt platonem has. Habeo inimicus rationibus mel ex, nisl
                  fabellas nec ei, quo et quot putant legendos. Prompta
                  definitiones nam an, quidam scaevola per te. Eum at purto
                  vocibus mnesarchum, diam falli an nam. Dicunt perfecto
                  deserunt mel in, mundi moderatius eu eam.
                </Styled.p>
              </Box>
            )}
          </Flex>
        </Form>
      </Formik>
      {showSearchResults && <AdvancedSearch search={search} />}
    </>
  );
}

export default SearchBox;
