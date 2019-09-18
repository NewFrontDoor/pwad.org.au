import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import prettyBytes from 'pretty-bytes';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import Markdown from '../../../components/markdown/markdown';
import ShortListButton from '../../../components/shortlist-button';
import {FIND_ONE_LITURGY} from '../../../components/queries';

function Composer(props) {
  if (props.name) {
    return (
      <Text>
        <Link {...authorLinkProps(props)} />
      </Text>
    );
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
  const {loading, error, data: {liturgyById} = {}} = useQuery(
    FIND_ONE_LITURGY,
    {
      variables: {id}
    }
  );

  const {author, files, content, title, copyright} = liturgyById || {};

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {liturgyById && (
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
                      <Link href={file.url} internal={false}>
                        {file.filename}
                      </Link>{' '}
                      ({prettyBytes(file.size)})
                    </li>
                  ))}
                </Text>
              </>
            )}

            {author && (
              <>
                <Text as="h3">Hymn Author</Text>
                <Text>
                  <Link {...authorLinkProps(author)} />
                </Text>
              </>
            )}

            {copyright && (
              <>
                <Text as="h3">Copyright</Text>
                <Text>{copyright.name || '-'}</Text>
              </>
            )}
          </FlexItem>
          <FlexItem width="100%">
            <Text as="h2">
              <ShortListButton hymn={liturgyById} />
              {title}
            </Text>
            <Markdown>{content.md}</Markdown>
          </FlexItem>
        </Flex>
      )}
    </PageLayout>
  );
}

Song.getInitialProps = async function(context) {
  const {
    query: {id}
  } = context;

  return {id};
};

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Song);
