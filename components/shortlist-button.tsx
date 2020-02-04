import React, {FC} from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import {Button} from 'theme-ui';
import {Star} from 'react-feather';

import {
  useMeQuery,
  useRemoveShortListItemMutation,
  useAddShortListItemMutation,
  MeDocument
} from './queries';

type ShortListButtonProps = {
  itemId: string;
};

const ShortListButton: FC<ShortListButtonProps> = ({itemId}) => {
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
    const shortlisted = some(data.me.shortlist, {_id: itemId});
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
              variables: {item: itemId}
            });
          } else {
            addShortlistItem({
              variables: {item: itemId}
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
  itemId: PropTypes.string.isRequired
};

export default ShortListButton;
