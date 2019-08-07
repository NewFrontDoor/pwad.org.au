import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {kebabCase} from 'lodash';
import Text from 'mineral-ui/Text';

import Link from '../components/link';
import {FIND_ONE_AUTHOR} from '../components/queries';

class Author extends React.Component {
  static getInitialProps({query: {id}}) {
    return {id};
  }

  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render() {
    const {id} = this.props;
    const {
      loading,
      error,
      data: {authorById}
    } = useQuery(FIND_ONE_AUTHOR, {
      variables: {id}
    });

    return (
      <>
        <Text as="h1" fontWeight="extraBold">
          Public Worship and Aids to Devotion Committee Website
        </Text>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {authorById && (
          <>
            <Text as="h3">Author</Text>
            <Text>
              {authorById.name.first} {authorById.name.last}{' '}
              {authorById.dates && `(${authorById.dates})`}
            </Text>
            <Text as="h3">Hymns</Text>
            <Text as="ul">
              {authorById.hymns.map(({_id, hymnNumber, title}) => (
                <li key={_id}>
                  <Link
                    as={`/song/${_id}/${kebabCase(title)}`}
                    href={`/song?id=${_id}`}
                  >
                    {hymnNumber}. {title}
                  </Link>
                </li>
              ))}
            </Text>
          </>
        )}
      </>
    );
  }
}

export default Author;
