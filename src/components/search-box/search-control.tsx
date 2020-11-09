import React, {FC, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {Grid, Box, Styled, Button} from 'theme-ui';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import {useTextSearchQuery, TextSearchQueryVariables} from '../queries';
import Loading from '../loading';
import ServerError from '../server-error';
import SearchResult, {isSearchResult} from './search-result';
import {prefetchSearchResult} from '../../prefetch';

const TextSearch: FC<TextSearchQueryVariables> = (props) => {
  const {loading, error, data, client} = useTextSearchQuery({
    variables: props,
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  if (data.textSearch && data.textSearch.length > 0) {
    return (
      <>
        {data.textSearch.map((result) => {
          if (isSearchResult(result)) {
            return (
              <SearchResult
                {...result}
                key={result._id}
                prefetch={() => prefetchSearchResult(client, result)}
              />
            );
          }

          return null;
        })}
      </>
    );
  }

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

TextSearch.propTypes = {
  search: PropTypes.string.isRequired
};

const SearchBox: FC = () => {
  const router = useRouter();
  const handleSubmit = useCallback(
    (query: TextSearchQueryVariables) => {
      void router.push(
        {
          pathname: router.pathname,
          query
        },
        router.pathname,
        {shallow: true}
      );
    },
    [router]
  );

  const handleListAll = useCallback(() => {
    void router.push(
      {
        pathname: router.pathname,
        query: {search: ''}
      },
      router.pathname,
      {shallow: true}
    );
  }, [router]);

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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onReset={handleListAll}
      >
        <Form>
          <Grid
            marginBottom="1em"
            columns={[1, 'auto max-content max-content']}
          >
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
              <Button type="submit" sx={{width: '100%'}}>
                Search
              </Button>
            </Box>
            <Box marginStart="1em">
              <Button type="reset" sx={{width: '100%'}}>
                List all
              </Button>
            </Box>
          </Grid>
        </Form>
      </Formik>
      {showSearchResults && <TextSearch {...router.query} />}
    </>
  );
};

export default SearchBox;
