import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Router from 'next/router';
import {Styled} from 'theme-ui';

import * as resourceQuery from '../../../queries/resource';
import {MenuItem} from '../../../queries/_types';

import {defineAbilitiesFor} from '../../../lib/abilities';

import useUser from '../../use-user';
import Loading from '../../components/loading';
import PageLayout from '../../components/page-layout';
import SongSearchControl from '../../components/search-box/song-search-control';

type RejoiceProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Rejoice: NextPage<RejoiceProps> = ({menuItems}) => {
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
    return <Loading />;
  }

  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Rejoice</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <SongSearchControl />
    </PageLayout>
  );
};

Rejoice.propTypes = {
  menuItems: PropTypes.array
};

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
}> = async function () {
  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems
    }
  };
};

export default Rejoice;
