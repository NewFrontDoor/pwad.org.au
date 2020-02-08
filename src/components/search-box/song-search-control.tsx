import React, {FC, useReducer} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {useResponsiveValue} from '@theme-ui/match-media';
import {Styled, Button, Grid, Box} from 'theme-ui';
import {Formik, Form, Field} from 'formik';
import {TextField} from '../form';
import {useAdvancedSearchQuery, AdvancedSearchQueryVariables} from '../queries';
import Loading from '../loading';
import SearchResult from './search-result';
import SearchMetreInput from './search-metre-input';
import SearchTuneInput from './search-tune-input';
import SearchPassageInput from './search-passage-input';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';

type AdvancedSearchProps = {
  search: AdvancedSearchQueryVariables;
};

type State = AdvancedSearchProps['search'] & {
  showSearchResults?: boolean;
  showHowToSearch?: boolean;
  showAdvancedSeach?: boolean;
};

type Action = {
  type: 'search';
  fields: {
    hymnMetres?: Array<{value: string}>;
    passage?: {value: string};
    occasion?: {value: string};
    tune?: {value: string};
    keyword?: {value: string};
  };
};

const initialState = {
  showSearchResults: false,
  showHowToSearch: false,
  showAdvancedSeach: false
};

function reducer(state: State, action: Action): State {
  let keyword: string;
  let metres: string[];
  let tune: string;
  let book: string;
  let occasion: string;

  switch (action.type) {
    case 'search':
      if (action.fields.hymnMetres && action.fields.hymnMetres.length > 0) {
        metres = action.fields.hymnMetres.map(metre => metre.value);
      }

      if (action.fields.passage) {
        book = action.fields.passage.value;
      }

      if (action.fields.occasion) {
        occasion = action.fields.occasion.value;
      }

      if (action.fields.tune) {
        tune = action.fields.tune.value;
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
            book,
            tune,
            metres,
            keyword
          },
          identity
        ),
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${String(action.type)} does not exist`);
  }
}

const AdvancedSearch: FC<AdvancedSearchProps> = ({search}) => {
  const {loading, error, data} = useAdvancedSearchQuery({
    variables: search
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  if (data?.search?.length > 0) {
    return data.search.map(result => (
      <SearchResult key={result._id} {...result} />
    ));
  }

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

AdvancedSearch.propTypes = {
  search: PropTypes.any.isRequired
};

const SearchBox: FC = () => {
  const isMedium = useResponsiveValue([false, true]);
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
          <Grid columns={[1, 2]}>
            <Box>
              <Box marginBottom="1em">
                <TextField label="Title" name="title" />
              </Box>
              <Box marginBottom="1em">
                <Field
                  as={SearchMetreInput}
                  label="Hymn Metre"
                  name="hymnMetres"
                />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchTuneInput} label="Tune" name="tune" />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchPassageInput} label="Passage" name="passage" />
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
            {isMedium && (
              <Box>
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
          </Grid>
        </Form>
      </Formik>
      {showSearchResults && <AdvancedSearch search={search} />}
    </>
  );
};

export default SearchBox;
