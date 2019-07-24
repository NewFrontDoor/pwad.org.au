import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import Link from '../components/link';
import Markdown from '../components/markdown/markdown';
import {FIND_PRAYER_CONTENTS, FIND_ONE_PRAYER} from '../components/queries';

class Pray extends React.Component {
  static propTypes = {
    id: PropTypes.string
  };

  static defaultProps = {
    id: undefined
  };

  static getInitialProps({query: {id}}) {
    return {id};
  }

  render() {
    const {id} = this.props;

    return (
      <Query query={FIND_PRAYER_CONTENTS} variables={{id}}>
        {({loading, error, data}) => {
          if (loading) {
            return 'Loading...';
          }

          if (error) {
            return `Error! ${error.message}`;
          }

          const prayers = data.prayerMany;

          const [{_id: firstId}] = prayers;

          return (
            <>
              <ul>
                {prayers.map(({_id, title}) => (
                  <li key={_id}>
                    <Link as={`/pray/${_id}`} href={`/pray?id=${_id}`}>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Query query={FIND_ONE_PRAYER} variables={{id: id || firstId}}>
                {({loading, error, data}) => {
                  if (loading) {
                    return 'Loading...';
                  }

                  if (error) {
                    return `Error! ${error.message}`;
                  }

                  const {content} = data.prayerById;

                  return <Markdown>{content.md}</Markdown>;
                }}
              </Query>
            </>
          );
        }}
      </Query>
    );
  }
}

export default Pray;
