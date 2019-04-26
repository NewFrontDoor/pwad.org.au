import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import {withTheme} from 'emotion-theming';
import Avatar from 'mineral-ui/Avatar';
import {User} from 'react-feather';

import {ME} from '../queries';

// HACK: mineral-ui to apply the background color
User.displayName = 'UserIcon';

const UserAvatar = ({theme}) => (
  <Query query={ME}>
    {({data}) => {
      if (data.me) {
        const name = `${data.me.name.first} ${data.me.name.last}`;
        return (
          <Avatar size="small" background={theme.theme_color}>
            {data.me.profilePhoto ? (
              <img src={data.me.profilePhoto} alt={name} />
            ) : (
              <User title={name} role="img" />
            )}
          </Avatar>
        );
      }
    }}
  </Query>
);

UserAvatar.propTypes = {
  theme: PropTypes.shape({
    // eslint-disable-next-line camelcase
    theme_color: PropTypes.string
  }).isRequired
};

export default withTheme(UserAvatar);
