import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Button from 'mineral-ui/Button';
import {Star} from 'react-feather';
import {ME, ADD_SHORTLIST_ITEM, REMOVE_SHORTLIST_ITEM} from './queries';

function ShortListButton({hymn}) {
  const {
    data: {me}
  } = useQuery(ME);
  const [addShortlistItem] = useMutation(ADD_SHORTLIST_ITEM);
  const [removeShortlistItem] = useMutation(REMOVE_SHORTLIST_ITEM);

  const shortlisted = some(me.shortlist, {_id: hymn._id});
  const icon = <Star role="img" fill={shortlisted ? '#fad8af' : 'white'} />;

  return (
    <Button
      circular
      minimal
      iconStart={icon}
      aria-label={shortlisted ? 'Remove from Short List' : 'Add to Short List'}
      onClick={() => {
        // TODO: optomistic ui
        if (shortlisted) {
          removeShortlistItem({
            variables: {hymn: hymn._id}
          });
        } else {
          addShortlistItem({
            variables: {hymn: hymn._id}
          });
        }
      }}
    />
  );
}

ShortListButton.propTypes = {
  hymn: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default ShortListButton;
