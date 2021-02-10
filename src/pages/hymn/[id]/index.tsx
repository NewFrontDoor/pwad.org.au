/** @jsx jsx */
import {useEffect} from 'react';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Router from 'next/router';
import PropTypes from 'prop-types';
import {jsx, Styled, Flex, Box} from 'theme-ui';

import is from '../../../is';
import produceSlide from '../../../../lib/ppt';
import * as hymnQuery from '../../../../queries/hymn';
import * as resourceQuery from '../../../../queries/resource';
import {Hymn, MenuItem} from '../../../../queries/_types';

import useUser from '../../../use-user';
import protectedGetServerSideProps from '../../../../lib/protected-get-server-side-props';
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
  const {loggedInUser} = useUser({
    redirectTo: '/api/login'
  });

  if (!loggedInUser.user) {
    return <Loading />;
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

  function generatePPT() {
    const {font, background, ratio} =
      loggedInUser.user?.presentationOptions ?? {};

    produceSlide({
      title,
      content,
      hymnNumber,
      font: font ?? 'arial',
      background: background ?? 'pca',
      ratio: ratio ?? 'LAYOUT_16x9'
    });
  }

  let files = hymn.files ?? [];
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
            {alternateTunes && alternateTunes.length > 0 && (
              <SidebarAlternateTunes tunes={alternateTunes} />
            )}
            {author && <SidebarAuthor {...author} />}
            {scripture && <SidebarScripture scripture={scripture} />}
            {tune && <SidebarTuneComposer {...tune} />}
            {copyright && <SidebarCopyright {...copyright} />}
            {tune?.musicCopyright && (
              <SidebarMusicCopyright {...tune.musicCopyright} />
            )}
            <SidebarFiles files={files} generatePPT={generatePPT} />
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
  const result = await protectedGetServerSideProps(context);

  if (result.isErr()) {
    return {
      redirect: result.error
    };
  }

  const ability = defineAbilitiesFor(result.value);

  if (ability.cannot('read', 'Hymn')) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/my-account'
      }
    };
  }

  let id = context.params?.id;

  if (Array.isArray(id)) {
    [id] = id;
  }

  if (typeof id === 'undefined') {
    return {
      notFound: true
    };
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
  hymn: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is('hymn'),
    content: PropTypes.array.isRequired,
    author: PropTypes.any,
    tune: PropTypes.any,
    alternateTunes: PropTypes.array.isRequired,
    copyright: PropTypes.any,
    scripture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hymnNumber: PropTypes.number.isRequired,
    files: PropTypes.array.isRequired,
    book: PropTypes.string.isRequired,
    chapter: PropTypes.number.isRequired,
    chapterVerse: PropTypes.string.isRequired,
    keywords: PropTypes.array.isRequired,
    occasions: PropTypes.array.isRequired,
    verses: PropTypes.string.isRequired
  }).isRequired,
  menuItems: PropTypes.array.isRequired
};

export default Song;
