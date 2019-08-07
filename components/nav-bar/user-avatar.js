import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {withTheme} from 'emotion-theming';
import Avatar from 'mineral-ui/Avatar';
import {User} from 'react-feather';

import {ME} from '../queries';

// HACK: mineral-ui to apply the background color
User.displayName = 'UserIcon';

const UserAvatar = ({theme}) => {
  const {
    data: {me}
  } = useQuery(ME);

  if (me) {
    const name = `${me.name.first} ${me.name.last}`;
    return (
      <Avatar size="small" background={theme.theme_color}>
        {me.profilePhoto ? (
          <img src={me.profilePhoto} alt={name} />
        ) : (
          <User title={name} role="img" />
        )}
      </Avatar>
    );
  }
};

UserAvatar.propTypes = {
  theme: PropTypes.shape({
    // eslint-disable-next-line camelcase
    theme_color: PropTypes.string
  }).isRequired
};

export default withTheme(UserAvatar);
