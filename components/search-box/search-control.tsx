import React, {FC, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Grid, Box, Styled, Button} from 'theme-ui';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import {useTextSearchQuery} from '../queries';
import SearchResult from './search-result';

const initialState = {
  showSearchResults: false
};

type State = {
  showSearchResults: boolean;
};

type Action = {
  type: 'search';
  fields: any;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        ...action.fields,
        showSearchResults: true
      };
    default:
      throw new Error(`Action type ${String(action.type)} does not exist`);
  }
}

type TextSearchProps = {
  search: {
    search?: string;
  };
};

const TextSearch: FC<TextSearchProps> = ({search}) => {
  const {loading, error, data} = useTextSearchQuery({
    variables: search
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data.textSearch && data.textSearch.length > 0) {
    return (
      <>
        {data.textSearch.map(result => (
          <SearchResult key={result._id} {...result} />
        ))}
      </>
    );
  }

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

TextSearch.propTypes = {
  search: PropTypes.object.isRequired
};

const SearchBox: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showSearchResults, ...search} = state;

  return (
    <>
      <Styled.h3>Search</Styled.h3>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <Formik
        initialValues={{
          search: ''
        }}
        onSubmit={fields => dispatch({type: 'search', fields})}
      >
        <Form>
          <Grid marginBottom="1em" columns={[1, 'auto min-content']}>
            <Box marginEnd="auto">
              <TextField
                isLabelHidden
                label="Search"
                name="search"
                placeholder="Search..."
                type="search"
              />
            </Box>

            <Box marginStart="1em">
              <Button type="submit">Search</Button>
            </Box>
          </Grid>
        </Form>
      </Formik>
      {showSearchResults && <TextSearch search={search} />}
    </>
  );
};

export default SearchBox;
