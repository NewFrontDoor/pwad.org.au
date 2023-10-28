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
import LiturgySearchControl from "../../components/search-box/liturgy-search-control";

type LiturgyProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Liturgy: NextPage<LiturgyProps> = ({ menuItems }) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Worship</Styled.h2>
      <Styled.p variant="prose">
        Search here for orders-of-service; for example 'Marriage: Simple Order'
        or 'Commissioning: Home Missionary' etc or for Scriptures related to
        specific occasions or aspects of the public worship service; for example
        'Christmas Eve' or 'Close of Worship' etc
      </Styled.p>
      <LiturgySearchControl />
    </PageLayout>
  );
};

export default Liturgy;

Liturgy.propTypes = {
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
