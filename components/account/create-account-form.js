import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {Mutation} from 'react-apollo';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {FormField} from 'mineral-ui/Form';

import {CREATE_USER, ME} from '../queries';

import GoogleButton from './google-button';

class CreateAccountForm extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleCreateUserUpdate = this.handleCreateUserUpdate.bind(this);
  }

  handleChange(name) {
    return event =>
      this.setState({
        [name]: event.target.value
      });
  }

  handleCreateUser(createAccount) {
    return event => {
      event.preventDefault();
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      } = this.state;

      createAccount({
        variables: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        }
      });
    };
  }

  handleCreateUserUpdate(cache, {data}) {
    const {createUser} = data;
    cache.writeQuery({
      query: ME,
      data: {
        me: createUser
      }
    });
  }

  render() {
    const {redirectPath, location} = this.props;

    return (
      <>
        <Box marginBottom="md">
          <GoogleButton redirectPath={redirectPath} location={location}>
            Signup with Google
          </GoogleButton>
        </Box>
        <Text appearance="prose">Or</Text>
        <Box marginBottom="md">
          <Mutation
            mutation={CREATE_USER}
            update={this.handleCreateUserUpdate}
            onCompleted={() => Router.replace('/manage-account')}
          >
            {createAccount => (
              <form onSubmit={this.handleCreateUser(createAccount)}>
                <Box marginBottom="md">
                  <FormField
                    required
                    label="First name"
                    input={TextInput}
                    name="firstName"
                    onChange={this.handleChange('firstName')}
                  />
                </Box>
                <Box marginBottom="md">
                  <FormField
                    required
                    label="Last name"
                    input={TextInput}
                    name="lastName"
                    onChange={this.handleChange('lastName')}
                  />
                </Box>
                <Box marginBottom="md">
                  <FormField
                    required
                    type="email"
                    label="Email"
                    input={TextInput}
                    name="email"
                    onChange={this.handleChange('email')}
                  />
                </Box>
                <Box marginBottom="md">
                  <FormField
                    required
                    type="password"
                    label="Password"
                    input={TextInput}
                    name="password"
                    onChange={this.handleChange('password')}
                  />
                </Box>
                <Box marginBottom="md">
                  <FormField
                    required
                    type="password"
                    label="Confirm password"
                    input={TextInput}
                    name="confirmPassword"
                    onChange={this.handleChange('confirmPassword')}
                  />
                </Box>
                <Box marginBottom="md">
                  <Button type="submit">Create Account</Button>
                </Box>
              </form>
            )}
          </Mutation>
        </Box>
      </>
    );
  }
}

CreateAccountForm.propTypes = {
  redirectPath: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

CreateAccountForm.defaultProps = {
  redirectPath: undefined,
  location: undefined
};

export default CreateAccountForm;
