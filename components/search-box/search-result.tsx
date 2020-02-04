/** @jsx jsx */
import {FC} from 'react';
import {jsx, Flex, Box, Styled, Button} from 'theme-ui';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import kebabCase from 'lodash/kebabCase';
import {SearchResult} from '../queries';
import Link, {keywordLinkProps} from '../link';
import ShortListButton from '../shortlist-button';

const SearchResultList: FC<SearchResult> = props => {
  const {_id, _type, title, keywords, content} = props;

  return (
    <Box marginBottom={3}>
      <Styled.h4>
        <ShortListButton itemId={_id} />
        <Link
          sx={{
            verticalAlign: 'middle'
          }}
          as={`/${_type}/${_id}/${String(kebabCase(title))}`}
          href={`/${_type}/[id]/[name]`}
        >
          {title}
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
        padding="0"
        sx={{
          flexWrap: 'wrap',
          listStyle: 'none'
        }}
      >
        {keywords?.map(keyword => {
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
  keywords: PropTypes.any
};

SearchResultList.defaultProps = {
  content: null,
  keywords: []
};

export default SearchResultList;
