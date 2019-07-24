import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
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

    return (
      <>
        <Text as="h1" fontWeight="extraBold">
          Public Worship and Aids to Devotion Committee Website
        </Text>
        <Query query={FIND_ONE_AUTHOR} variables={{id}}>
          {({loading, error, data}) => {
            if (loading) {
              return 'Loading...';
            }

            if (error) {
              return `Error! ${error.message}`;
            }

            const {name, dates, hymns} = data.authorById;

            return (
              <>
                <Text as="h3">Author</Text>
                <Text>
                  {name.first} {name.last} {dates && `(${dates})`}
                </Text>
                <Text as="h3">Hymns</Text>
                <Text as="ul">
                  {hymns.map(({_id, hymnNumber, title}) => (
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
            );
          }}
        </Query>
      </>
    );
  }
}

export default Author;
