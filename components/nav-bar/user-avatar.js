import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Avatar from 'mineral-ui/Avatar';

const ME = gql`
  {
    me {
      profilePhoto
      name {
        first
        last
      }
    }
  }
`;

const UserAvatar = () => (
  <Query query={ME}>
    {({data}) => {
      if (data.me) {
        const name = `${data.me.name.first} ${data.me.name.last}`;
        return (
          <Avatar size="small">
            <img src={data.me.profilePhoto} alt={name} />
          </Avatar>
        );
      }
    }}
  </Query>
);

export default UserAvatar;
