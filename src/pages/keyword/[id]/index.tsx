import React from 'react';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import PropTypes from 'prop-types';
import {Text} from 'theme-ui';

import * as keywordQuery from '../../../../queries/keyword';
import * as resourceQuery from '../../../../queries/resource';
import {Keyword, MenuItem, KeyWordPropTypes} from '../../../../queries/_types';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';
import Link, {
  hymnLinkProps,
  prayerLinkProps,
  liturgyLinkProps
} from '../../../components/link';

type KeywordProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const KeywordPage: NextPage<KeywordProps> = ({keyword, menuItems}) => {
  const {name, hymns, prayers, liturgies} = keyword;

  return (
    <PageLayout menuItems={menuItems}>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ContentWrap>
        <Text as="h2">{name}</Text>
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
        {prayers?.length > 0 && (
          <>
            <Text as="h3">Prayers</Text>
            <Text as="ul">
              {prayers.map((prayer) => (
                <li key={prayer._id}>
                  <Link {...prayerLinkProps(prayer)} />
                </li>
              ))}
            </Text>
          </>
        )}
        {liturgies?.length > 0 && (
          <>
            <Text as="h3">Liturgy</Text>
            <Text as="ul">
              {liturgies.map((liturgy) => (
                <li key={liturgy._id}>
                  <Link {...liturgyLinkProps(liturgy)} />
                </li>
              ))}
            </Text>
          </>
        )}
      </ContentWrap>
    </PageLayout>
  );
};

KeywordPage.propTypes = {
  keyword: KeyWordPropTypes,
  menuItems: PropTypes.array
};

export default KeywordPage;

export const getServerSideProps: GetServerSideProps<{
  keyword: Keyword;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  const menuItems = await resourceQuery.menuItems();
  const keyword = await keywordQuery.getById(id);

  return {
    props: {
      keyword,
      menuItems
    }
  };
};
