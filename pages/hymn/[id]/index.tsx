import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import {Styled, Flex, Box} from 'theme-ui';

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
      <Styled.p>
        <Link {...authorLinkProps(props)} />
      </Styled.p>
    );
  }

  return <Styled.p>No Composer</Styled.p>;
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
  const {author, hymnNumber, content, title, tune, copyright, scripture} =
    data?.hymnById ?? {};

  const files = [];

  return (
    <PageLayout>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Flex
        sx={{
          flexDirection: ['column-reverse', 'column-reverse', 'row'],
          // TODO: What should this value actually be?
          gap: '2em'
        }}
      >
        <Box>
          {files.length > 0 && (
            <>
              <Styled.h3>Files</Styled.h3>
              <Styled.ul>
                {files.map(({_id, file}) => (
                  <li key={_id}>
                    <Link href={file.url} isInternal={false}>
                      {file.filename}
                    </Link>{' '}
                    ({prettyBytes(file.size)})
                  </li>
                ))}
              </Styled.ul>
            </>
          )}

          {author && (
            <>
              <Styled.h3>Hymn Author</Styled.h3>
              <Styled.p>
                <Link {...authorLinkProps(author)} />
              </Styled.p>
            </>
          )}

          {scripture && (
            <>
              <Styled.h3>Scripture</Styled.h3>
              <Styled.p>{scripture}</Styled.p>
            </>
          )}

          {tune && (
            <>
              <Styled.h3>Tune Composer</Styled.h3>
              <Composer {...tune.composer} />
              {tune.metre && (
                <>
                  <Styled.h3>Metre</Styled.h3>
                  <Styled.p>{tune.metre.metre}</Styled.p>
                </>
              )}
            </>
          )}

          {copyright && (
            <>
              <Styled.h3>Copyright (words)</Styled.h3>
              <Styled.p>{copyright.name || '-'}</Styled.p>
            </>
          )}

          {tune?.musicCopyright && (
            <>
              <Styled.h3>Copyright (music)</Styled.h3>
              <Styled.p>{tune.musicCopyright.name || '-'}</Styled.p>
            </>
          )}
        </Box>
        <Box sx={{width: '100%'}}>
          <Styled.h2>
            <ShortListButton itemId={data?.hymnById._id} />
            {hymnNumber}. {title}
          </Styled.h2>
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
      redirect('/my-account', context);
    }
  } else {
    redirect('/api/login', context);
  }

  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Song);
