import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Styled} from 'theme-ui';

import * as resourceQuery from '../../../queries/resource';
import {MenuItem} from '../../../queries/_types';

import protectedGetServerSideProps from '../../../lib/protected-get-server-side-props';
import {defineAbilitiesFor} from '../../../lib/abilities';

import PageLayout from '../../components/page-layout';
import SongSearchControl from '../../components/search-box/song-search-control';

type RejoiceProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Rejoice: NextPage<RejoiceProps> = ({menuItems}) => {
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
  menuItems: PropTypes.array.isRequired
};

export const getServerSideProps: GetServerSideProps<{
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

  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems
    }
  };
};

export default Rejoice;
