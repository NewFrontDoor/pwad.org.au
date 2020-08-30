import React, {FC} from 'react';
import {Avatar, useThemeUI} from 'theme-ui';
import {User} from 'react-feather';

import useUser from '../../use-user';

const UserAvatar: FC = () => {
  const {theme} = useThemeUI();
  const {loggedInUser} = useUser();

  if (loggedInUser?.user?.picture) {
    const name = `${loggedInUser.user.name.first} ${loggedInUser.user.name.last}`;

    return (
      <Avatar
        src={loggedInUser.user.picture}
        alt={name}
        background={theme.theme_color}
      />
    );
  }

  if (loggedInUser?.user) {
    return <User role="img" />;
  }

  return null;
};

export default UserAvatar;
