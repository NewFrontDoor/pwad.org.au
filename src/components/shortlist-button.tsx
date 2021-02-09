import React, {FC} from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import {Button} from 'theme-ui';
import {Star} from 'react-feather';
import useUser from '../use-user';

import {
  useRemoveShortListItemMutation,
  useAddShortListItemMutation,
  MeDocument,
  MeQuery
} from './queries';

import {ShortList} from '../../queries/_types';

function capitalise(value: ShortList['_type']): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

type ShortListButtonProps = {
  item: ShortList;
};

export function isShortListItem(result: unknown): result is ShortList {
  return ['hymn', 'prayer', 'liturgy', 'scripture'].includes(
    (result as Partial<ShortList>)._type ?? ''
  );
}

const ShortListButton: FC<ShortListButtonProps> = ({item}) => {
  const {loggedInUser, loading} = useUser();
  const shortlist = loggedInUser?.user?.shortlist ?? [];

  const [addShortlistItem] = useAddShortListItemMutation({
    optimisticResponse: {
      __typename: 'Mutation',
      addShortListItem: [
        ...shortlist,
        {
          ...item,
          __typename: capitalise(item._type) as
            | 'Hymn'
            | 'Prayer'
            | 'Liturgy'
            | 'Scripture'
        }
      ]
    },
    update(cache, result) {
      const query = cache.readQuery<MeQuery>({query: MeDocument});

      cache.writeQuery({
        query: MeDocument,
        data: {
          me: {
            ...query?.me,
            shortlist: result.data?.addShortListItem
          }
        }
      });
    }
  });

  const [removeShortlistItem] = useRemoveShortListItemMutation({
    optimisticResponse: {
      __typename: 'Mutation',
      removeShortListItem: shortlist.filter(({_id}) => _id !== item?._id)
    },
    update(cache, result) {
      const query = cache.readQuery<MeQuery>({query: MeDocument});
      cache.writeQuery({
        query: MeDocument,
        data: {
          me: {
            ...query?.me,
            shortlist: result.data?.removeShortListItem
          }
        }
      });
    }
  });

  if (loading) {
    return null;
  }

  if (loggedInUser?.user) {
    const shortlisted = some(shortlist, {_id: item?._id});
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
            void removeShortlistItem({
              variables: {item: item._id}
            });
          } else {
            void addShortlistItem({
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
