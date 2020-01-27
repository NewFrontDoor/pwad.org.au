import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import {Text, Flex, Box} from 'theme-ui';

import redirect from '../../../lib/redirect';
import checkLoggedIn from '../../../lib/check-logged-in';
import withApollo, {
  WithApolloPageContext
} from '../../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../../lib/abilities';

import BlockContent from '../../../components/block-content';
import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import ShortListButton from '../../../components/shortlist-button';
import {Author, useFindOneHymnQuery} from '../../../components/queries';

const Composer: FC<Author> = props => {
  if (props.name) {
    return (
      <Text>
        <Link {...authorLinkProps(props)} />
      </Text>
    );
  }

  return <Text>No Composer</Text>;
};

Composer.propTypes = {
  name: PropTypes.string
};

Composer.defaultProps = {
  name: undefined
};

type SongProps = {
  id: string;
};

const Song: NextPage<SongProps> = ({id}) => {
  const {data} = useFindOneHymnQuery({variables: {id}});
  const {author, hymnNumber, content, title, tune, copyright} = data?.hymnById;

  const files = [];

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Flex
        gutterWidth="xxl"
        sx={{flexDirection: ['column-reverse', 'column-reverse', 'row']}}
      >
        <Box>
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

          {copyright && (
            <>
              <Text as="h3">Copyright (words)</Text>
              <Text>{copyright.name || '-'}</Text>
            </>
          )}

          {tune?.musicCopyright && (
            <>
              <Text as="h3">Copyright (music)</Text>
              <Text>{tune.musicCopyright.name || '-'}</Text>
            </>
          )}
        </Box>
        <Box width="100%">
          <Text as="h2">
            <ShortListButton hymn={props} />
            {hymnNumber}. {title}
          </Text>
          <BlockContent blocks={content} />
        </Box>
      </Flex>
    </PageLayout>
  );
};

Song.getInitialProps = async (context: WithApolloPageContext) => {
  const {
    query: {id}
  } = context;

  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    const ability = defineAbilitiesFor(loggedInUser.user);

    if (ability.cannot('read', 'Hymn')) {
      redirect(context, '/my-account');
    }
  } else {
    redirect(context, '/sign-in');
  }

  return {id};
};

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Song);
