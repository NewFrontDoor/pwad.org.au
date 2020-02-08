import React from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {Text} from 'theme-ui';

import withApollo from '../../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';
import Link, {
  hymnLinkProps,
  prayerLinkProps,
  liturgyLinkProps
} from '../../../components/link';
import {useFindOneKeywordQuery} from '../../../components/queries';

type KeywordProps = {
  id: string;
};

const Keyword: NextPage<KeywordProps> = ({id}) => {
  const {loading, error, data} = useFindOneKeywordQuery({
    variables: {id}
  });

  const {name, hymns, prayers, liturgies} = data?.keywordById ?? {};

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ContentWrap>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {data?.keywordById && (
          <>
            <Text as="h2">{name}</Text>
            {hymns?.length > 0 && (
              <>
                <Text as="h3">Hymns</Text>
                <Text as="ul">
                  {hymns.map(hymn => (
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
                  {prayers.map(prayer => (
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
                  {liturgies.map(liturgy => (
                    <li key={liturgy._id}>
                      <Link {...liturgyLinkProps(liturgy)} />
                    </li>
                  ))}
                </Text>
              </>
            )}
          </>
        )}
      </ContentWrap>
    </PageLayout>
  );
};

Keyword.getInitialProps = ({query: {id}}) => {
  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Keyword.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Keyword);
