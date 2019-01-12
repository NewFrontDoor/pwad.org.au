import React from 'react';
import Text from 'mineral-ui/Text';
import SearchControl from '../components/search-box/search-control';

export default class Search extends React.Component {
  render() {
    return (
      <>
        <Text element="h1" fontWeight="extraBold">
          Public Worship and Aids to Devotion Committee Website
        </Text>
        <Text element="h2">Search</Text>
        <Text appearance="prose">
          Search for hymns, worship resources, prayer resources and worship aids
          using the search box below. Advanced search will allow you to refine
          your criteria on data available in the resource.
        </Text>
        <SearchControl />
      </>
    );
  }
}
