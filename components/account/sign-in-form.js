import React from 'react';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';
import {FormField} from 'mineral-ui/Form';
import TextInput from 'mineral-ui/TextInput';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import Router from 'next/router';

import {LOGIN_USER, ME} from '../queries';
import GoogleButton from './google-button';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignInUpdate = this.handleSignInUpdate.bind(this);
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

  handleSignInUpdate(cache, {data}) {
    const {loginUser} = data;
    cache.writeQuery({
      query: ME,
      data: {
        me: loginUser
      }
    });
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
      <>
        <Box marginBottom="md">
          <GoogleButton redirectPath={redirectPath} location={location}>
            Signin with Google
          </GoogleButton>
        </Box>
        <Text appearance="prose">Or</Text>
        <Box marginBottom="md">
          <Mutation mutation={LOGIN_USER} update={this.handleSignInUpdate}>
            {(loginUser, {loading, error}) => (
              <form onSubmit={this.handleSignIn(loginUser)}>
                {loading && 'Loading...'}
                {error &&
                  error.graphQLErrors.map(({message}) => (
                    <p key={message}>{message}</p>
                  ))}
                <Box marginBottom="md">
                  <FormField
                    required
                    input={TextInput}
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange('email')}
                  />
                </Box>
                <Box marginBottom="md">
                  <FormField
                    required
                    input={TextInput}
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange('password')}
                  />
                </Box>
                <Button type="submit">Signin</Button>
              </form>
            )}
          </Mutation>
        </Box>
      </>
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
