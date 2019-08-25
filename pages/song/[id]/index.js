import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {kebabCase} from 'lodash';
import prettyBytes from 'pretty-bytes';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';

import Link from '../../../components/link';
import Markdown from '../../../components/markdown/markdown';
import {FIND_ONE_HYMN} from '../../../components/queries';

function Author({_id, name, dates}) {
  const fullName = `${name.first} ${name.last}`;
  return (
    <Text>
      <Link
        as={`/author/${_id}/${kebabCase(fullName)}`}
        href={`/author?id=${_id}`}
      >
        {fullName} {dates && `(${dates})`}
      </Link>
    </Text>
  );
}

Author.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string
  }),
  dates: PropTypes.string
};

Author.defaultProps = {
  name: {},
  dates: undefined
};

function Composer(props) {
  if (props.name) {
    return <Author {...props} />;
  }

  return <Text>No Composer</Text>;
}

Composer.propTypes = {
  name: PropTypes.object
};

Composer.defaultProps = {
  name: undefined
};

function Song({id}) {
  const {
    loading,
    error,
    data: {hymnById}
  } = useQuery(FIND_ONE_HYMN, {
    variables: {id}
  });

  const {
    author,
    files,
    hymnNumber,
    lyrics,
    scripture,
    title,
    tune,
    wordsCopyright
  } = hymnById || {};

  return (
    <>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {hymnById && (
        <Flex
          gutterWidth="xxl"
          breakpoints={['narrow', 'medium']}
          direction={['column-reverse', 'column-reverse', 'row']}
        >
          <FlexItem>
            {files.length > 0 && (
              <>
                <Text as="h3">Files</Text>
                <Text as="ul">
                  {files.map(({_id, file}) => (
                    <li key={_id}>
                      <Link href={file.url}>{file.filename}</Link> (
                      {prettyBytes(file.size)})
                    </li>
                  ))}
                </Text>
              </>
            )}

            {author && (
              <>
                <Text as="h3">Hymn Author</Text>
                <Author {...author} />
              </>
            )}

            {scripture && (
              <>
                <Text as="h3">Scripture</Text>
                <Text>{scripture}</Text>
              </>
            )}

            {tune && (
              <>
                <Text as="h3">Tune Composer</Text>
                <Composer {...tune.composer} />
                {tune.metre && (
                  <>
                    <Text as="h3">Metre</Text>
                    <Text>{tune.metre.metre}</Text>
                  </>
                )}
              </>
            )}

            {wordsCopyright && (
              <>
                <Text as="h3">Copyright (words)</Text>
                <Text>{wordsCopyright.name || '-'}</Text>
              </>
            )}

            {tune && tune.musicCopyright && (
              <>
                <Text as="h3">Copyright (music)</Text>
                <Text>{tune.musicCopyright.name || '-'}</Text>
              </>
            )}
          </FlexItem>
          <FlexItem width="100%">
            <Text as="h2">
              {hymnNumber}. {title}
            </Text>
            <Markdown>{lyrics.md}</Markdown>
          </FlexItem>
        </Flex>
      )}
    </>
  );
}

Song.getInitialProps = function({query: {id}}) {
  return {id};
};

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default Song;
