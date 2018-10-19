import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {FormField} from 'mineral-ui/Form';
import TextInput from 'mineral-ui/TextInput';
import Box from 'mineral-ui/Box';
import Button from 'mineral-ui/Button';
import Router from 'next/router';

import GoogleButton from './google-button';

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      name {
        first
        last
      }
    }
  }
`;

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(loginUser) {
    return async event => {
      event.preventDefault();
      const {email, password} = this.state;

      try {
        const {data} = await loginUser({
          variables: {
            email,
            password
          }
        });

        if (data && data.loginUser) {
          Router.replace('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  handleChange(name) {
    return event =>
      this.setState({
        [name]: event.target.value
      });
  }

  render() {
    const {redirectPath, location} = this.props;
    const {email, password} = this.state;

    return (
      <Box marginBottom="1em">
        <Box marginBottom="1em">
          <Mutation mutation={LOGIN_USER}>
            {(loginUser, {loading, error}) => (
              <form onSubmit={this.handleSignIn(loginUser)}>
                {loading && 'Loading...'}
                {error &&
                  error.graphQLErrors.map(({message}) => (
                    <p key={message}>{message}</p>
                  ))}
                <Box marginBottom="1em">
                  <FormField
                    input={TextInput}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={this.handleChange('email')}
                  />
                </Box>
                <Box marginBottom="1em">
                  <FormField
                    input={TextInput}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.handleChange('password')}
                  />
                </Box>
                <Button type="submit">Signin</Button>
              </form>
            )}
          </Mutation>
        </Box>
        <GoogleButton redirectPath={redirectPath} location={location}>
          Signin with Google
        </GoogleButton>
      </Box>
    );
  }
}

SignInForm.propTypes = {
  redirectPath: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

SignInForm.defaultProps = {
  redirectPath: undefined,
  location: undefined
};

export default SignInForm;
