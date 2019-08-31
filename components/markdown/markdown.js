/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import PropTypes from 'prop-types';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import {themed} from 'mineral-ui/themes';
import {palette} from 'mineral-ui-tokens';
import BiblePassage from '@newfrontdoor/bible';
import ContentWrap from '../content-wrap';
import Link from '../link';
import MDXRenderer from './render';

const BIBLE =
  'https://8dk9jr13id.execute-api.us-west-2.amazonaws.com/dev/bible';

const Code = themed(Text)(({theme}) => ({
  fontFamily: theme.fontFamily_monospace
}));

function Blockquote({children}) {
  return (
    <blockquote
      css={css`
        max-width: 30rem;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
        quotes: '“' '”' '‘' '’';

        &::before {
          content: open-quote;
          font-size: 4em;
          line-height: 0.1em;
          margin-right: 0.25em;
          vertical-align: -0.4em;
        }

        & p {
          display: inline;
        }
      `}
    >
      {children}
    </blockquote>
  );
}

Blockquote.propTypes = {
  children: PropTypes.node.isRequired
};

function Background({colour, children}) {
  const paletteColour = (colour || 'blue').toLowerCase();
  const backgroundColor = palette[`${paletteColour}_20`];

  return (
    <Box
      width="100vw"
      marginLeft="-50vw"
      marginRight="-50vw"
      css={css`
        position: relative;
        left: 50%;
        right: 50%;
        background-color: ${backgroundColor};
      `}
    >
      <ContentWrap paddingVertical="lg" paddingHorizontal="md">
        {children}
      </ContentWrap>
    </Box>
  );
}

Background.propTypes = {
  colour: PropTypes.string,
  children: PropTypes.node.isRequired
};

Background.defaultProps = {
  colour: 'blue'
};

function Bible(props) {
  const {passage} = props;
  return (
    <Blockquote>
      <BiblePassage {...props} url={BIBLE} />
      <Text
        appearance="prose"
        align="end"
        as="i"
        css={css`
          margin-top: 1rem;
          display: block;
        `}
      >
        {' '}
        – {passage}
      </Text>
    </Blockquote>
  );
}

Bible.propTypes = {
  passage: PropTypes.string.isRequired
};

const pages = {
  author: '/author/[id]/[name]',
  content: '/content/[page]',
  pray: '/pray/[id]/[name]',
  song: '/song/[id]/[name]'
};

function parseLink({href, ...rest}) {
  const result = href.match(/^\/(author|content|pray|song)\/.+/);
  const [, page] = result || [];
  return {
    ...rest,
    as: href,
    href: pages[page] || href,
    internal: Boolean(result)
  };
}

const components = {
  Background,
  Bible,
  p: props => <Text appearance="prose" {...props} />,
  h1: props => <Text as="h1" {...props} />,
  h2: props => <Text as="h2" {...props} />,
  h3: props => <Text as="h3" {...props} />,
  h4: props => <Text as="h4" {...props} />,
  h5: props => <Text as="h5" {...props} />,
  h6: props => <Text as="h6" {...props} />,
  a: props => <Link {...parseLink(props)} />,
  blockquote: Blockquote,
  img: props => (
    <img
      {...props}
      css={css`
        max-width: 100%;
        height: auto;
      `}
    />
  ),
  code: props => (
    <Box
      padding="md"
      css={css`
        background-color: ${palette.gray_20};
        border-radius: 0.5rem;
        overflow: hidden;
      `}
    >
      <Code as="code" css={css``} {...props} />
    </Box>
  )
};

const Markdown = ({children}) => (
  <MDXRenderer components={components}>{children}</MDXRenderer>
);

Markdown.propTypes = {
  children: PropTypes.node.isRequired
};

export default Markdown;
