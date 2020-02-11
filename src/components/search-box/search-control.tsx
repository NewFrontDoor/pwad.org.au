import React, {FC, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {Grid, Box, Styled, Button} from 'theme-ui';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import {useTextSearchQuery, TextSearchQueryVariables} from '../queries';
import Loading from '../loading';
import SearchResult from './search-result';

type TextSearchProps = {
  search: TextSearchQueryVariables;
};

const TextSearch: FC<TextSearchProps> = ({search}) => {
  const {loading, error, data} = useTextSearchQuery({
    variables: search
  });

  if (loading) {
    return <Loading />;
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
  const router = useRouter();
  const handleSubmit = useCallback(
    (query: TextSearchQueryVariables) => {
      router.push(
        {
          pathname: router.pathname,
          query
        },
        router.pathname
      );
    },
    [router]
  );

  const showSearchResults = !isEmpty(router.query);
  let initialValues: TextSearchQueryVariables = {search: ''};

  if (showSearchResults) {
    initialValues = router.query;
  }

  return (
    <>
      <Styled.h3>Search</Styled.h3>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
      {showSearchResults && <TextSearch search={router.query} />}
    </>
  );
};

export default SearchBox;
