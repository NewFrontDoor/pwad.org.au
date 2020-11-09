/** @jsx jsx */
import {useEffect} from 'react';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Router from 'next/router';
import PropTypes from 'prop-types';
import {jsx, Styled, Flex, Box} from 'theme-ui';

import * as hymnQuery from '../../../../queries/hymn';
import * as resourceQuery from '../../../../queries/resource';
import {Hymn, HymnPropTypes, MenuItem} from '../../../../queries/_types';

import useUser from '../../../use-user';
import {defineAbilitiesFor} from '../../../../lib/abilities';
import Loading from '../../../components/loading';
import BlockContent from '../../../components/block-content';
import PageLayout from '../../../components/page-layout';
import ShortListButton from '../../../components/shortlist-button';

import Sidebar, {
  SidebarAuthor,
  SidebarCopyright,
  SidebarFiles,
  SidebarMusicCopyright,
  SidebarScripture,
  SidebarTuneComposer,
  SidebarTune,
  SidebarAlternateTunes
} from '../../../components/sidebar';

type SongProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Song: NextPage<SongProps> = ({hymn, menuItems}) => {
  const redirectTo = '/api/login';
  const {loggedInUser} = useUser({
    redirectTo
  });

  useEffect(() => {
    const ability = defineAbilitiesFor(loggedInUser.user);

    if (ability.cannot('read', 'Hymn')) {
      void Router.push('/my-account');
    }
  }, [loggedInUser.user]);

  if (!loggedInUser.user) {
    return <Loading />
  }

  const {
    author,
    hymnNumber,
    content,
    title,
    tune,
    alternateTunes,
    copyright,
    scripture
  } = hymn;

  let files = hymn.files || [];
  files = files.filter(Boolean);

  return (
    <PageLayout menuItems={menuItems}>
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
          <>
            {tune && <SidebarTune {...tune} />}
            {alternateTunes?.length > 0 && (
              <SidebarAlternateTunes tunes={alternateTunes} />
            )}
            {author && <SidebarAuthor {...author} />}
            {scripture && <SidebarScripture scripture={scripture} />}
            {tune && <SidebarTuneComposer {...tune} />}
            {copyright && <SidebarCopyright {...copyright} />}
            {tune?.musicCopyright && (
              <SidebarMusicCopyright {...tune.musicCopyright} />
            )}
            {files.length > 0 && <SidebarFiles files={files} />}
          </>
        </Sidebar>

        <Box>
          <Styled.h2>
            <ShortListButton item={hymn} />
            {hymnNumber}. {title}
          </Styled.h2>
          <BlockContent blocks={content} />
        </Box>
      </Flex>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  hymn: Hymn;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  const menuItems = await resourceQuery.menuItems();
  const hymn = await hymnQuery.getById(id);

  return {
    props: {
      hymn,
      menuItems
    }
  };
};

Song.propTypes = {
  hymn: HymnPropTypes.isRequired,
  menuItems: PropTypes.array
};

export default Song;
