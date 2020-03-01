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
  item: ShortList;
};

const ShortListButton: FC<ShortListButtonProps> = ({item}) => {
  const {loading, data} = useMeQuery();

  const [addShortlistItem] = useAddShortListItemMutation({
    optimisticResponse: {
      __typename: 'Mutation',
      addShortListItem: [...data?.me.shortlist, item]
    },
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
    optimisticResponse: {
      __typename: 'Mutation',
      removeShortListItem: data?.me.shortlist.filter(
        ({_id}) => _id !== item._id
      )
    },
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
    const shortlisted = some(data.me.shortlist, {_id: item._id});
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
          if (shortlisted) {
            removeShortlistItem({
              variables: {item: item._id}
            });
          } else {
            addShortlistItem({
              variables: {item: item._id}
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
  item: PropTypes.any
};

export default ShortListButton;
