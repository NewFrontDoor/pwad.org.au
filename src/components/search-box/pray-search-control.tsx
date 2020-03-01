import React, {FC, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import {Styled, Box, Flex, Button} from 'theme-ui';
import {Formik, Form, Field} from 'formik';
import {TextField} from '../form';
import {usePrayerSearchQuery, PrayerSearchQueryVariables} from '../queries';
import Loading from '../loading';
import ServerError from '../server-error';
import SearchResult from './search-result';
import SearchOccasionInput from './search-occasion-input';
import SearchKeywordInput from './search-keyword-input';
import initialSelectValue from './initial-select-value';
import {prefetchOnePrayer} from '../../prefetch';

type AdvancedSearchProps = {
  search: PrayerSearchQueryVariables;
};

const AdvancedSearch: FC<AdvancedSearchProps> = ({search}) => {
  const {loading, error, data, client} = usePrayerSearchQuery({
    variables: search
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  if (data?.prayerSearch?.length > 0) {
    return (
      <>
        {data.prayerSearch.map(result => (
          <SearchResult
            {...result}
            key={result._id}
            prefetch={() =>
              prefetchOnePrayer(client, {
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
  search: PropTypes.object.isRequired
};

type SearchFields = {
  title?: string;
  occasion?: {
    value: string;
  };
  keyword?: {
    value: string;
  };
};

const SearchBox: FC = () => {
  const router = useRouter();
  const handleSubmit = useCallback(
    ({occasion, keyword, title}: SearchFields) => {
      const query: PrayerSearchQueryVariables = {title};

      if (occasion) {
        query.occasion = occasion.value;
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
    title: '',
    occasion: null,
    keyword: null
  };

  if (showSearchResults) {
    initialValues = {
      ...router.query,
      occasion: initialSelectValue(router.query.occasion).shift(),
      keyword: initialSelectValue(router.query.keyword).shift()
    };
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Flex>
            <Box grow={1} sx={{flexDirection: ['column', 'row'], width: '50%'}}>
              <Box marginBottom="1em">
                <TextField label="Title" name="title" />
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
          </Flex>
        </Form>
      </Formik>
      {showSearchResults && <AdvancedSearch search={router.query} />}
    </>
  );
};

export default SearchBox;
