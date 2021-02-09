import React from 'react';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import PropTypes from 'prop-types';
import {Text} from 'theme-ui';

import is from '../../../is';
import * as authorQuery from '../../../../queries/author';
import * as resourceQuery from '../../../../queries/resource';
import {Author, MenuItem} from '../../../../queries/_types';
import PageLayout from '../../../components/page-layout';
import Link, {hymnLinkProps, liturgyLinkProps} from '../../../components/link';

type AuthorPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const AuthorPage: NextPage<AuthorPageProps> = ({author, menuItems}) => {
  const {name, dates, hymns, liturgies} = author;

  return (
    <PageLayout menuItems={menuItems}>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Text as="h3">Author</Text>
      <Text>
        {name} {dates && `(${dates})`}
      </Text>
      {hymns?.length > 0 && (
        <>
          <Text as="h3">Hymns</Text>
          <Text as="ul">
            {hymns.map((hymn) => (
              <li key={hymn._id}>
                <Link {...hymnLinkProps(hymn)} />
              </li>
            ))}
          </Text>
        </>
      )}
      {liturgies?.length > 0 && (
        <>
          <Text as="h3">Liturgies</Text>
          <Text as="ul">
            {liturgies.map((liturgy) => (
              <li key={liturgy._id}>
                <Link {...liturgyLinkProps(liturgy)} />
              </li>
            ))}
          </Text>
        </>
      )}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  author: Author;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params?.id;
  if (Array.isArray(id)) {
    [id] = id;
  }

  if (typeof id === 'undefined') {
    return {
      notFound: true
    };
  }

  const author = await authorQuery.getById(id);
  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      author,
      menuItems
    }
  };
};

AuthorPage.propTypes = {
  author: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is('author'),
    name: PropTypes.string.isRequired,
    dates: PropTypes.string.isRequired,
    hymns: PropTypes.array.isRequired,
    liturgies: PropTypes.array.isRequired
  }).isRequired,
  menuItems: PropTypes.array.isRequired
};

export default AuthorPage;
