import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import dynamic from 'next/dynamic';
import {Styled, Flex, Box} from 'theme-ui';

import protectedGetServerSideProps from '../../lib/protected-get-server-side-props';
import * as resourceQuery from '../../queries/resource';
import {MenuItem} from '../../queries/_types';
import PageLayout from '../components/page-layout';
import Logo from '../components/logo';
import Loading from '../components/loading';
import {useMeQuery} from '../components/queries';

const ManageAccountForm = dynamic(
  async () => import('../components/account/manage-account-form'),
  {
    ssr: false
  }
);

type MyAccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MyAccount: NextPage<MyAccountProps> = ({menuItems}) => {
  const {loading, data} = useMeQuery();

  return (
    <PageLayout menuItems={menuItems}>
      <Flex marginBottom={3}>
        <Box sx={{width: '75px'}}>
          <Logo />
        </Box>
        <Box>
          <Styled.h1>Public Worship and Aids to Devotion</Styled.h1>
          <Styled.h2>My Account</Styled.h2>
        </Box>
      </Flex>
      {loading && <Loading />}
      {data?.me &&
        (data.me.hasPaidAccount || data.me.hasFreeAccount ? (
          <>
            <Styled.p variant="h1">
              Welcome back {data.me.name?.first}!
            </Styled.p>
            <ManageAccountForm {...data.me} />
          </>
        ) : (
          <>
            <Styled.p variant="h1">
              Welcome {data.me.name?.first}, lets get you set up!
            </Styled.p>
            <Styled.p variant="h2">
              Which type of account would you like to create?
            </Styled.p>
            <ManageAccountForm {...data.me} />
          </>
        ))}
    </PageLayout>
  );
};

MyAccount.propTypes = {
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

  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems
    }
  };
};

export default MyAccount;
