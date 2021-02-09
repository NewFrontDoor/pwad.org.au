import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import dynamic from 'next/dynamic';
import {Styled, Flex, Box} from 'theme-ui';

import * as resourceQuery from '../../queries/resource';
import {MenuItem} from '../../queries/_types';
import PageLayout from '../components/page-layout';
import Logo from '../components/logo';
import Loading from '../components/loading';
import useUser from '../use-user';

const ManageAccountForm = dynamic(
  async () => import('../components/account/manage-account-form'),
  {
    ssr: false
  }
);

type MyAccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MyAccount: NextPage<MyAccountProps> = ({menuItems}) => {
  const {loggedInUser} = useUser({
    redirectTo: '/api/login'
  });

  if (!loggedInUser.user) {
    return <Loading />;
  }

  const {hasPaidAccount, hasFreeAccount, name} = loggedInUser.user;

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
      {loggedInUser?.user &&
        (hasPaidAccount || hasFreeAccount ? (
          <>
            <Styled.p variant="h1">Welcome back {name.first}!</Styled.p>
            <ManageAccountForm {...loggedInUser.user} />
          </>
        ) : (
          <>
            <Styled.p variant="h1">
              Welcome {name.first}, lets get you set up!
            </Styled.p>
            <Styled.p variant="h2">
              Which type of account would you like to create?
            </Styled.p>
            <ManageAccountForm {...loggedInUser.user} />
          </>
        ))}
    </PageLayout>
  );
};

MyAccount.propTypes = {
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

export default MyAccount;
