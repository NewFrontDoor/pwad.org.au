import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Styled} from 'theme-ui';

import * as resourceQuery from '../../../queries/resource';
import {MenuItem} from '../../../queries/_types';

import PageLayout from '../../components/page-layout';
import PraySearchControl from '../../components/search-box/pray-search-control';

type PrayProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Pray: NextPage<PrayProps> = ({menuItems}) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Pray</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <PraySearchControl />
    </PageLayout>
  );
};

export default Pray;

Pray.propTypes = {
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
