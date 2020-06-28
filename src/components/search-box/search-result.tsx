/** @jsx jsx */
import {FC} from 'react';
import {jsx, Flex, Box, Styled, Button} from 'theme-ui';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import kebabCase from 'lodash/kebabCase';
import {Hymn, SearchResult} from '../queries';
import Link, {keywordLinkProps} from '../link';
import ShortListButton from '../shortlist-button';

function isHymn(result: SearchResult): result is Hymn {
  return result._type === 'hymn';
}

type SearchResultListProps = SearchResult & {
  prefetch: () => void;
};

const SearchResultList: FC<SearchResultListProps> = (props) => {
  const {_id, _type, title, keywords, prefetch} = props;

  const content = props.content.slice(0, 1);

  return (
    <Box marginBottom={3}>
      <Styled.h4>
        <ShortListButton item={props} />
        <Link
          sx={{
            verticalAlign: 'middle'
          }}
          as={`/${_type}/${_id}/${String(kebabCase(title))}`}
          href={`/${_type}/[id]/[name]`}
          onMouseOver={prefetch}
        >
          {isHymn(props) ? `${props.hymnNumber}. ${title}` : title}
        </Link>{' '}
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
  _type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any,
  keywords: PropTypes.any,
  hymnNumber: PropTypes.number,
  prefetch: PropTypes.func.isRequired
};

SearchResultList.defaultProps = {
  content: null,
  keywords: [],
  hymnNumber: undefined
};

export default SearchResultList;
