import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Link from '../components/link';
import Markdown from '../components/markdown/markdown';
import {FIND_PRAYER_CONTENTS, FIND_ONE_PRAYER} from '../components/queries';

function Pray({id}) {
  const {
    loading,
    error,
    data: {prayerMany}
  } = useQuery(FIND_PRAYER_CONTENTS, {
    variables: {id}
  });
  const [{_id: firstId}] = prayerMany;
  const {
    data: {prayerById}
  } = useQuery(FIND_ONE_PRAYER, {
    variables: {id: id || firstId}
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  return (
    <>
      <ul>
        {prayerMany.map(({_id, title}) => (
          <li key={_id}>
            <Link as={`/pray/${_id}`} href={`/pray?id=${_id}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Markdown>{prayerById.content.md}</Markdown>
    </>
  );
}

Pray.propTypes = {
  id: PropTypes.string
};

Pray.defaultProps = {
  id: undefined
};

Pray.getInitialProps = function({query: {id}}) {
  return {id};
};

export default Pray;
