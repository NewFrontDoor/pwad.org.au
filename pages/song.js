import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import Text from 'mineral-ui/Text';

import Markdown from '../components/markdown/markdown';
import {FIND_ONE_HYMN} from '../components/queries';

class Song extends React.Component {
  static getInitialProps({query: {id}}) {
    return {id};
  }

  render() {
    const {id} = this.props;

    return (
      <>
        <Text as="h1" fontWeight="extraBold">
          Public Worship and Aids to Devotion Committee Website
        </Text>
        <Query query={FIND_ONE_HYMN} variables={{id}}>
          {({loading, error, data}) => {
            if (loading) {
              return 'Loading...';
            }

            if (error) {
              return `Error! ${error.message}`;
            }

            const {title, lyrics, wordsCopyright} = data.hymnById;

            return (
              <>
                <Text as="h2">{title}</Text>
                <Text>{wordsCopyright}</Text>
                <Markdown>{lyrics.md}</Markdown>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default Song;
