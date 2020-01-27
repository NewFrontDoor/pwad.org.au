import React, {FC} from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import {Button} from 'theme-ui';
import {Star} from 'react-feather';

import {
  useMeQuery,
  useRemoveShortListItemMutation,
  useAddShortListItemMutation,
  MeDocument,
  ShortList
} from './queries';

type ShortListButtonProps = {
  hymn: ShortList;
};

const ShortListButton: FC<ShortListButtonProps> = ({hymn}) => {
  const {loading, data} = useMeQuery();

  const [addShortlistItem] = useAddShortListItemMutation({
    update(cache, result) {
      const {addShortListItem} = result.data;
      const {me} = cache.readQuery({query: MeDocument});
      cache.writeQuery({
        query: MeDocument,
        data: {
          me: {
            ...me,
            shortlist: addShortListItem
          }
        }
      });
    }
  });

  const [removeShortlistItem] = useRemoveShortListItemMutation({
    update(cache, result) {
      const {removeShortListItem} = result.data;
      const {me} = cache.readQuery({query: MeDocument});
      cache.writeQuery({
        query: MeDocument,
        data: {
          me: {
            ...me,
            shortlist: removeShortListItem
          }
        }
      });
    }
  });

  if (loading) {
    return null;
  }

  if (data?.me) {
    const shortlisted = some(data.me.shortlist, {_id: hymn._id});
    const label = shortlisted ? 'Remove from Short List' : 'Add to Short List';

    return (
      <Button
        circular
        variant="transparent"
        aria-label={label}
        sx={{
          fontSize: 1
        }}
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
      >
        <Star role="img" fill={shortlisted ? '#fad8af' : 'white'} />
      </Button>
    );
  }

  return null;
};

ShortListButton.propTypes = {
  hymn: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default ShortListButton;
