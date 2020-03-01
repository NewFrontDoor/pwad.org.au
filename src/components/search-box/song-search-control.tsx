import React, {FC, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {useResponsiveValue} from '@theme-ui/match-media';
import {Styled, Button, Grid, Box} from 'theme-ui';
import {Formik, Form, Field} from 'formik';
import {TextField} from '../form';
import {
  useAdvancedSearchQuery,
  AdvancedSearchQueryVariables,
  EnumHymnBook
} from '../queries';
import Loading from '../loading';
import ServerError from '../server-error';
import SearchResult from './search-result';
import SearchMetreInput from './search-metre-input';
import SearchTuneInput from './search-tune-input';
import SearchPassageInput from './search-passage-input';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';
import initialSelectValue from './initial-select-value';
import {prefetchOneHymn} from '../../prefetch';

type AdvancedSearchProps = {
  search: AdvancedSearchQueryVariables;
};
const AdvancedSearch: FC<AdvancedSearchProps> = ({search}) => {
  const {loading, error, data, client} = useAdvancedSearchQuery({
    variables: search
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  if (data?.search?.length > 0) {
    return (
      <>
        {data.search.map(result => (
          <SearchResult
            {...result}
            key={result._id}
            prefetch={() =>
              prefetchOneHymn(client, {
                id: result._id
              })
            }
          />
        ))}
      </>
    );
  }

  return <Styled.p variant="prose">No results found...</Styled.p>;
};

AdvancedSearch.propTypes = {
  search: PropTypes.any.isRequired
};

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
  const isMedium = useResponsiveValue([false, true]);
  const router = useRouter();
  const handleSubmit = useCallback(
    ({occasion, keyword, title, metres, tune, book}: SearchFields) => {
      const query: AdvancedSearchQueryVariables = {title};

      if (metres && metres.length > 0) {
        query.metres = metres.map(metre => metre.value);
      }

      if (book) {
        query.book = book.value;
      }

      if (occasion) {
        query.occasion = occasion.value;
      }

      if (tune) {
        query.tune = tune.value;
      }

      if (keyword) {
        query.keyword = keyword.value;
      }

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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                <Button isFullWidth type="submit">
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
      {showSearchResults && <AdvancedSearch search={router.query} />}
    </>
  );
};

export default SearchBox;
