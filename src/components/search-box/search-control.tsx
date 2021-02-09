import React, {FC, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {Grid, Box, Styled, Button} from 'theme-ui';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import {useTextSearchLazyQuery, TextSearchQueryVariables} from '../queries';
import Loading from '../loading';
import ServerError from '../server-error';
import SearchResult, {isSearchResult} from './search-result';
import {prefetchSearchResult} from '../../prefetch';

const SearchBox: FC = () => {
  const router = useRouter();

  const [search, {loading, error, data, client}] = useTextSearchLazyQuery();
  const textSearch = data?.textSearch ?? [];
  const handleSubmit = useCallback(
    (variables: TextSearchQueryVariables) => {
      search({variables});
    },
    [search]
  );

  const handleListAll = useCallback(() => {
    search({variables: {search: ''}});
  }, [search]);

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
      {loading && <Loading />}
      {error && <ServerError error={error} />}
      {textSearch.length === 0 && (
        <Styled.p variant="prose">No results found...</Styled.p>
      )}
      {textSearch.length > 0 && (
        <>
          {textSearch.map((result) => {
            if (isSearchResult(result)) {
              return (
                <SearchResult
                  {...result}
                  key={result._id}
                  prefetch={() => {
                    if (typeof client !== 'undefined') {
                      prefetchSearchResult(client, result);
                    }
                  }}
                />
              );
            }

            return null;
          })}
        </>
      )}
    </>
  );
};

export default SearchBox;
