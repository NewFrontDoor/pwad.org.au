import React from "react";
import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled } from "theme-ui";

import * as resourceQuery from "../../../queries/resource";
import { MenuItem } from "../../../queries/_types";

import PageLayout from "../../components/page-layout";
import PraySearchControl from "../../components/search-box/pray-search-control";

type PrayProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Pray: NextPage<PrayProps> = ({ menuItems }) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Pray</Styled.h2>
      <Styled.p variant="prose">
        Search here for prayers for different aspects of the service or
        occasions.
      </Styled.p>
      <PraySearchControl />
    </PageLayout>
  );
};

export default Pray;

Pray.propTypes = {
  menuItems: PropTypes.array.isRequired,
};

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
}> = async function () {
  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems,
    },
  };
};
