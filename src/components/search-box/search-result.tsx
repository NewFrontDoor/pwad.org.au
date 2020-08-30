/** @jsx jsx */
import {FC} from 'react';
import {jsx, Flex, Box, Styled, Button} from 'theme-ui';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {SearchResult} from '../../../queries/_types';
import Link, {linkProps, keywordLinkProps} from '../link';
import ShortListButton from '../shortlist-button';

type SearchResultListProps = SearchResult & {
  prefetch: () => void;
};

export function isSearchResult(result: unknown): result is SearchResult {
  return ['hymn', 'prayer', 'liturgy', 'scripture'].includes(
    (result as Partial<SearchResult>)._type
  );
}

const SearchResultList: FC<SearchResultListProps> = (props) => {
  const {keywords, prefetch} = props;

  const content = props.content.slice(0, 1);

  return (
    <Box marginBottom={3}>
      <Styled.h4>
        <ShortListButton item={props} />
        <Link
          sx={{
            verticalAlign: 'middle'
          }}
          {...linkProps(props)}
          onMouseOver={prefetch}
        />{' '}
      </Styled.h4>
      {content && (
        <Styled.div
          sx={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {content
            .map((item: any) => item.children)
            .flat()
            .map((child: any) => (child ? child.text : ''))
            .join(' ')}
        </Styled.div>
      )}
      <Flex
        as="ul"
        sx={{
          padding: 0,
          flexWrap: 'wrap',
          listStyle: 'none'
        }}
      >
        {keywords?.map((keyword) => {
          const {as, href, children} = keywordLinkProps(keyword);
          return (
            <Box
              key={keyword._id}
              as="li"
              sx={{
                marginRight: 2,
                marginBottom: 2,
                '&:last-child': {
                  marginRight: 0
                }
              }}
            >
              <NextLink passHref as={as} href={href}>
                <Button as="a" sx={{fontSize: 0}}>
                  {children}
                </Button>
              </NextLink>
            </Box>
          );
        })}
      </Flex>
      <hr />
    </Box>
  );
};

SearchResultList.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any,
  keywords: PropTypes.any,
  prefetch: PropTypes.func.isRequired
};

SearchResultList.defaultProps = {
  content: null,
  keywords: []
};

export default SearchResultList;
