import React from 'react';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import BlockContent from '@sanity/block-content-to-react';

import {fetchQuery} from '../../../lib/sanity';
import redirect from '../../../lib/redirect';
import checkLoggedIn from '../../../lib/check-logged-in';
import withApollo from '../../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../../lib/abilities';

import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import ShortListButton from '../../../components/shortlist-button';

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

function Song(props) {
  const {
    author,
    hymnNumber,
    content,
    scripture,
    title,
    tune,
    wordsCopyright
  } = props;

  const files = [];

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
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
                    <Link href={file.url} isInternal={false}>
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
            <ShortListButton hymn={props} />
            {hymnNumber}. {title}
          </Text>
          <BlockContent blocks={content} />
        </FlexItem>
      </Flex>
    </PageLayout>
  );
}

Song.getInitialProps = async function(context) {
  const {
    query: {id}
  } = context;

  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    const ability = defineAbilitiesFor(loggedInUser.user);

    if (ability.can('read', 'Hymn')) {
      return fetchQuery(
        ['*']
          .concat([
            `[_type == "hymn" && _id == $id][0]{
          author->{_id,name,dates},
          hymnNumber,
          content,
          scripture,
          title,
          tune->{title,metre->{metre},musicCopyright->{name},composer->{_id,name,dates}},
          wordsCopyright->{name},
        }`
          ])
          .join('|'),
        {
          id
        }
      );
    }

    redirect(context, '/my-account');
  }

  redirect(context, '/sign-in');
};

Song.propTypes = {
  author: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    dates: PropTypes.string
  }).isRequired,
  hymnNumber: PropTypes.number.isRequired,
  content: PropTypes.array.isRequired,
  scripture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tune: PropTypes.shape({
    title: PropTypes.string,
    metre: PropTypes.shape({
      metre: PropTypes.string
    }),
    musicCopyright: PropTypes.shape({
      name: PropTypes.string
    }),
    composer: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      dates: PropTypes.string
    }).isRequired
  }).isRequired,
  wordsCopyright: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default withApollo(Song);
