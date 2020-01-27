import React, {FC} from 'react';
import {Avatar, useThemeUI} from 'theme-ui';
import {User} from 'react-feather';

import {useMeQuery} from '../queries';

// HACK: mineral-ui to apply the background color
User.displayName = 'UserIcon';

const UserAvatar: FC = () => {
  const {theme} = useThemeUI();
  const {data} = useMeQuery();

  if (data.me) {
    const name = `${data.me.name.first} ${data.me.name.last}`;

    return data.me.picture ? (
      <Avatar src={data.me.picture} alt={name} background={theme.theme_color} />
    ) : (
      // @ts-ignore
      <User title={name} role="img" />
    );
  }
};

export default UserAvatar;
