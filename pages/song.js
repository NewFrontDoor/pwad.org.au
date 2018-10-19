import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'react-emotion';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';

import NavBar from '../components/nav-bar/nav-bar';
import Markdown from '../components/markdown/markdown';

const Footer = styled('footer')`
  padding: 15vh 1rem;
`;

const FIND_ONE = gql`
  query findOne($id: MongoID!) {
    hymnById(_id: $id) {
      title
      bookId
      wordsCopyright
      lyrics {
        md
      }
    }
  }
`;

class Song extends React.Component {
  static getInitialProps({query: {id}}) {
    return {id};
  }

  render() {
    const {id} = this.props;

    return (
      <>
        <NavBar onMenuClick={this.handleMenuClick} />
        <Box width={3 / 4} marginVertical={0} marginHorizontal="auto">
          <Text element="h1" fontWeight="extraBold">
            Public Worship and Aids to Devotion Committee Website
          </Text>
          <Query query={FIND_ONE} variables={{id}}>
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
                  <Text element="h2">{title}</Text>
                  <Text>{wordsCopyright}</Text>
                  <Markdown useBreaks>{lyrics.md}</Markdown>
                </>
              );
            }}
          </Query>
        </Box>
        <Footer>
          <hr />
          <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
        </Footer>
      </>
    );
  }
}

Song.propTypes = {
  id: PropTypes.string.isRequired
};

export default Song;
