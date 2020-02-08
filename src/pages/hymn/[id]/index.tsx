/** @jsx jsx */
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {jsx, Styled, Flex, Box} from 'theme-ui';

import redirect from '../../../../lib/redirect';
import withApollo, {
  WithApolloPageContext
} from '../../../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../../../lib/abilities';

import checkLoggedIn from '../../../check-logged-in';
import BlockContent from '../../../components/block-content';
import PageLayout from '../../../components/page-layout';
import ShortListButton from '../../../components/shortlist-button';
import {useFindOneHymnQuery} from '../../../components/queries';
import Sidebar, {
  SidebarAuthor,
  SidebarCopyright,
  SidebarFiles,
  SidebarMusicCopyright,
  SidebarScripture,
  SidebarTune
} from '../../../components/sidebar';

type SongProps = {
  id: string;
};

const Song: NextPage<SongProps> = ({id}) => {
  const {data} = useFindOneHymnQuery({variables: {id}});
  const {
    author,
    hymnNumber,
    content,
    title,
    tune,
    alternateTunes,
    copyright,
    scripture
  } = data?.hymnById ?? {};

  let files = data?.hymnById?.files || [];

  if (tune?.file) {
    files = files.concat(tune.file);
  }

  if (alternateTunes) {
    files = files.concat(alternateTunes.map(x => x.file));
  }

  files = files.filter(Boolean);

  return (
    <PageLayout>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Flex
        sx={{
          flexDirection: ['column-reverse', 'column-reverse', 'row'],
          // TODO: What should this value actually be?
          justifyContent: 'flex-start'
        }}
      >
        <Sidebar>
          {data?.hymnById && (
            <>
              {files.length > 0 && <SidebarFiles files={files} />}
              {author && <SidebarAuthor {...author} />}
              {scripture && <SidebarScripture scripture={scripture} />}
              {tune && <SidebarTune {...tune} />}
              {copyright && <SidebarCopyright {...copyright} />}
              {tune?.musicCopyright && <SidebarMusicCopyright {...tune} />}
            </>
          )}
        </Sidebar>

        <Box>
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
