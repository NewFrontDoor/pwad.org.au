import React, {FC, useCallback} from 'react';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {Styled, Button, Grid, Box} from 'theme-ui';
import {Formik, Form, Field} from 'formik';
import {TextField} from '../form';
import {
  useAdvancedSearchLazyQuery,
  AdvancedSearchQueryVariables,
  EnumHymnBook
} from '../queries';
import Loading from '../loading';
import ServerError from '../server-error';
import SearchResult, {isSearchResult} from './search-result';
import SearchMetreInput from './search-metre-input';
import SearchTuneInput from './search-tune-input';
import SearchPassageInput from './search-passage-input';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';
import initialSelectValue from './initial-select-value';
import {prefetchOneHymn} from '../../prefetch';

type SearchFields = {
  title?: string;
  metres?: Array<{value: string}>;
  occasion?: {
    value: string;
  };
  keyword?: {
    value: string;
  };
  tune?: {
    value: string;
  };
  book?: {
    value: EnumHymnBook;
  };
};

const SearchBox: FC = () => {
  const router = useRouter();

  const [search, {loading, error, data, client}] = useAdvancedSearchLazyQuery();

  const handleSubmit = useCallback(
    ({occasion, keyword, title, metres, tune, book}: SearchFields) => {
      const variables: AdvancedSearchQueryVariables = {title};

      if (metres && metres.length > 0) {
        variables.metres = metres.map((metre) => metre.value);
      }

      if (book) {
        variables.book = book.value;
      }

      if (occasion) {
        variables.occasion = occasion.value;
      }

      if (tune) {
        variables.tune = tune.value;
      }

      if (keyword) {
        variables.keyword = keyword.value;
      }

      search({variables});
    },
    [search]
  );

  const handleListAll = useCallback(() => {
    search({variables: {title: ''}});
  }, [search]);

  const showSearchResults = !isEmpty(router.query);
  let initialValues: SearchFields = {
    metres: [],
    title: '',
    occasion: null,
    keyword: null,
    tune: null,
    book: null
  };

  if (showSearchResults) {
    initialValues = {
      ...router.query,
      metres: initialSelectValue(router.query.metres),
      occasion: initialSelectValue(router.query.occasion).shift(),
      keyword: initialSelectValue(router.query.keyword).shift(),
      tune: initialSelectValue(router.query.tune).shift(),
      book: initialSelectValue<EnumHymnBook>(router.query.book).shift()
    };
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onReset={handleListAll}
      >
        <Form>
          <Grid columns={[1, 2]}>
            <Box>
              <Box marginBottom="1em">
                <TextField label="Title" name="title" />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchMetreInput} label="Hymn Metre" name="metres" />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchTuneInput} label="Tune" name="tune" />
              </Box>
              <Box marginBottom="1em">
                <Field as={SearchPassageInput} label="Passage" name="book" />
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
                <Button type="submit" sx={{width: '100%'}}>
                  Search
                </Button>
              </Box>
              <Box marginBottom="1em">
                <Button type="reset" sx={{width: '100%'}}>
                  List all
                </Button>
              </Box>
            </Box>
          </Grid>
        </Form>
      </Formik>
      {loading && <Loading />}
      {error && <ServerError error={error} />}
      {data?.search?.length === 0 && (
        <Styled.p variant="prose">No results found...</Styled.p>
      )}
      {data?.search?.length > 0 && (
        <>
          {data.search.map((result) => {
            if (isSearchResult(result)) {
              return (
                <SearchResult
                  {...result}
                  key={result._id}
                  prefetch={() =>
                    prefetchOneHymn(client, {
                      id: result._id
                    })
                  }
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
