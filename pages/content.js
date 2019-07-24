import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import ContentWrap from '../components/content-wrap';
import Markdown from '../components/markdown/markdown';
import {PAGE_CONTENT} from '../components/queries';

class Search extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.shape({
      md: PropTypes.string.isRequired
    }).isRequired
  };

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
    const {name, content} = this.props;

    return (
      <ContentWrap>
        <Text as="h2">{name}</Text>
        {content.md && <Markdown>{content.md}</Markdown>}
      </ContentWrap>
    );
  }
}

export default Search;
