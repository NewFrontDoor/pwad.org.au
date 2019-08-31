import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import {kebabCase} from 'lodash';
import Link from '../link';
import Markdown from '../markdown/markdown';

const SearchResult = ({_id, __typename, title, lyrics, content}) => {
  let prefix;

  if (__typename === 'Hymn') {
    prefix = 'song';
  }

  if (__typename === 'Prayer') {
    prefix = 'pray';
  }

  if (__typename === 'Liturgy') {
    prefix = 'rejoice';
  }

  return (
    <div>
      <Text>{title}</Text>
      {lyrics && <Markdown>{lyrics.md}</Markdown>}
      {content && <Markdown>{content.md}</Markdown>}
      {prefix && (
        <Link
          as={`/${prefix}/${_id}/${kebabCase(title)}`}
          href={`/${prefix}/[id]/[name]`}
        >
          View full details
        </Link>
      )}
    </div>
  );
};

SearchResult.propTypes = {
  _id: PropTypes.string.isRequired,
  __typename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.shape({
    md: PropTypes.string.isRequired
  }),
  content: PropTypes.shape({
    md: PropTypes.string.isRequired
  })
};

SearchResult.defaultProps = {
  lyrics: null,
  content: null
};

export default SearchResult;
