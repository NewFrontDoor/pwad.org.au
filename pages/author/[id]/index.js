import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

import withApollo from '../../../lib/with-apollo-client';

import {fetchQuery} from '../../../lib/sanity';
import PageLayout from '../../../components/page-layout';
import Link, {hymnLinkProps, liturgyLinkProps} from '../../../components/link';

function Author({author, menuItems}) {
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
      {hymns && hymns.length > 0 && (
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
      {liturgies && liturgies.length > 0 && (
        <>
          <Text as="h3">Liturgies</Text>
          <Text as="ul">
            {liturgies.map(liturgy => (
              <li key={liturgy._id}>
                <Link {...liturgyLinkProps(liturgy)} />
              </li>
            ))}
          </Text>
        </>
      )}
    </PageLayout>
  );
}

Author.getInitialProps = ({query: {id}}) => {
  const authorQuery = ['*']
    .concat(
      `[_type=="author" && _id==$id][0]{
        name,
        dates,
      	"hymns": *[_type == "hymn" && author._ref==$id],
        "liturgies": *[_type == "liturgy" && author._ref==$id]
      }`
    )
    .join('|');

  const menuItemsQuery =
    '*[_type == "main"][!(_id in path("drafts.**"))][0].menuitems';

  return fetchQuery(
    `{
        "author": ${authorQuery},
        "menuItems": ${menuItemsQuery}
    }`,
    {id}
  );
};

Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dates: PropTypes.string.isRequired,
    hymns: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string
      })
    ).isRequired,
    liturgies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  menuItems: PropTypes.array.isRequired
};

export default withApollo(Author);
