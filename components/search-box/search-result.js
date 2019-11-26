/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {kebabCase} from 'lodash';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Button from 'mineral-ui/Button';
import Link, {keywordLinkProps} from '../link';
import Markdown from '../markdown/markdown';
import ShortListButton from '../shortlist-button';

const noList = css`
  list-style: none;
`;

const SearchResult = props => {
  let prefix;

  const {_id, _type, title, lyrics, keywords, content} = props;

  if (_type === 'hymn') {
    prefix = 'rejoice';
  }

  if (_type === 'prayer') {
    prefix = 'pray';
  }

  if (_type === 'liturgy') {
    prefix = 'worship';
  }

  return (
    <Box marginBottom="md">
      <Text as="h4">
        <ShortListButton hymn={props} />
        <Link
          css={css`
            vertical-align: middle;
          `}
          as={`/${prefix}/${_id}/${kebabCase(title)}`}
          href={`/${prefix}/[id]/[name]`}
        >
          {title}
        </Link>{' '}
      </Text>
      {lyrics && <Markdown>{lyrics.md}</Markdown>}
      {content && <Markdown>{content.md}</Markdown>}
      <Flex
        as="ul"
        padding="0"
        gutterWidth="md"
        css={noList}
        breakpoints={['narrow', 'medium']}
        direction={['column', 'column', 'row']}
      >
        {keywords.map(keyword => {
          const {as, href, children} = keywordLinkProps(keyword);
          return (
            <FlexItem key={keyword._id}>
              <Text noMargins appearance="prose">
                <NextLink passHref as={as} href={href}>
                  <Button as="a" size="small">
                    {children}
                  </Button>
                </NextLink>
              </Text>
            </FlexItem>
          );
        })}
      </Flex>
      <hr />
    </Box>
  );
};

SearchResult.propTypes = {
  _id: PropTypes.string.isRequired,
  _type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.shape({
    md: PropTypes.string.isRequired
  }),
  content: PropTypes.shape({
    md: PropTypes.string.isRequired
  }),
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      _key: PropTypes.string.isRequired
    })
  )
};

SearchResult.defaultProps = {
  keywords: [],
  lyrics: null,
  content: null
};

export default SearchResult;
