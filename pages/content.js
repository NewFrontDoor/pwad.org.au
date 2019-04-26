import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import Markdown from '../components/markdown/markdown';
import {PAGE_CONTENT} from '../components/queries';

class Search extends React.Component {
  static async getInitialProps({apolloClient, query: {page}}) {
    const {data} = await apolloClient.query({
      query: PAGE_CONTENT,
      variables: {page}
    });

    if (data.pageContentOne) {
      return data.pageContentOne;
    }

    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  render() {
    const {
      name,
      content: {brief, extended}
    } = this.props;

    return (
      <>
        <Text as="h2">{name}</Text>
        {brief && <Markdown useBreaks>{brief.md}</Markdown>}
        {extended && <Markdown useBreaks>{extended.md}</Markdown>}
      </>
    );
  }
}

Search.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.shape({
    brief: PropTypes.shape({
      md: PropTypes.string.isRequired
    }).isRequired,
    extended: PropTypes.shape({
      md: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Search;
