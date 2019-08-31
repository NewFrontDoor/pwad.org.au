import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Button from 'mineral-ui/Button';

import {ME, ADD_SHORTLIST_ITEM, REMOVE_SHORTLIST_ITEM} from './queries';

function ShortListButton({hymn}) {
  const {
    data: {me}
  } = useQuery(ME);
  const [addShortlistItem] = useMutation(ADD_SHORTLIST_ITEM);
  const [removeShortlistItem] = useMutation(REMOVE_SHORTLIST_ITEM);

  const shortlisted = some(me.shortlist, hymn);
  const manageShortList = shortlisted ? removeShortlistItem : addShortlistItem;

  return (
    <Button
      size="small"
      onClick={() => {
        manageShortList({
          variables: {hymn: hymn._id}
        });
      }}
    >
      {shortlisted ? 'Remove from Short List' : 'Add to Short List'}
    </Button>
  );
}

ShortListButton.propTypes = {
  hymn: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default ShortListButton;
