import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import {kebabCase} from 'lodash';
import Link from '../link/link';
import Markdown from '../markdown/markdown';

const SearchResult = ({_id, title, lyrics}) => (
  <div>
    <Text>
      {title}
    </Text>
    <Markdown>
      {lyrics.md}
    </Markdown>
    <Link as={`/song/${_id}/${kebabCase(title)}`} href={`/song?id=${_id}`}>
      View full details
    </Link>
  </div>
);

SearchResult.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.shape({
    md: PropTypes.string.isRequired
  }).isRequired
};

export default SearchResult;
