import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Text, Styled} from 'theme-ui';

import * as resourceQuery from '../../queries/resource';
import {MenuItem} from '../../queries/_types';
import useUser from '../use-user';
import PageLayout from '../components/page-layout';
import ContentWrap from '../components/content-wrap';
import Link, {linkProps} from '../components/link';
import ShortListButton, {isShortListItem} from '../components/shortlist-button';

import {prefetchSearchResult} from '../prefetch';

type ShortListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ShortList: NextPage<ShortListProps> = ({menuItems}) => {
  const {loggedInUser, client} = useUser();

  return (
    <PageLayout menuItems={menuItems}>
      <ContentWrap>
        <Styled.h1>Public Worship and Aids to Devotion</Styled.h1>
        <Styled.h2>My Short List</Styled.h2>

        {loggedInUser?.user && (
          <Text variant="listNone" as="ul">
            {loggedInUser.user.shortlist?.map((item) => {
              if (isShortListItem(item)) {
                return (
                  <li key={item._id}>
                    <ShortListButton item={item} />{' '}
                    <Link
                      {...linkProps(item)}
                      onMouseOver={() => {
                        prefetchSearchResult(client, item);
                      }}
                    />
                  </li>
                );
              }

              return null;
            })}
          </Text>
        )}
      </ContentWrap>
    </PageLayout>
  );
};

ShortList.propTypes = {
  menuItems: PropTypes.array.isRequired
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

export default ShortList;
