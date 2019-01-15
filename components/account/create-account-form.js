import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {Mutation} from 'react-apollo';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {string, object} from 'yup';
import {Formik, Form, FormField} from '../form';

import {CREATE_USER, ME} from '../queries';

import GoogleButton from './google-button';

const validationSchema = object().shape({
  firstName: string()
    .label('First name')
    .required(),
  lastName: string()
    .label('Last name')
    .required(),
  email: string()
    .label('Email')
    .email()
    .required(),
  password: string()
    .label('Password')
    .required(),
  confirmPassword: string()
    .label('Confirm password')
    .required()
});

class CreateAccountForm extends React.Component {
  handleCreateUser = createAccount => {
    return ({firstName, lastName, email, password, confirmPassword}) => {
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
  };

  handleCreateUserUpdate = (cache, {data}) => {
    const {createUser} = data;
    cache.writeQuery({
      query: ME,
      data: {
        me: createUser
      }
    });
  };

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
              <Formik
                validationSchema={validationSchema}
                onSubmit={this.handleCreateUser(createAccount)}
              >
                <Form>
                  <Box marginBottom="md">
                    <FormField
                      required
                      label="First name"
                      input={TextInput}
                      name="firstName"
                    />
                  </Box>
                  <Box marginBottom="md">
                    <FormField
                      required
                      label="Last name"
                      input={TextInput}
                      name="lastName"
                    />
                  </Box>
                  <Box marginBottom="md">
                    <FormField
                      required
                      type="email"
                      label="Email"
                      input={TextInput}
                      name="email"
                    />
                  </Box>
                  <Box marginBottom="md">
                    <FormField
                      required
                      type="password"
                      label="Password"
                      input={TextInput}
                      name="password"
                    />
                  </Box>
                  <Box marginBottom="md">
                    <FormField
                      required
                      type="password"
                      label="Confirm password"
                      input={TextInput}
                      name="confirmPassword"
                    />
                  </Box>
                  <Box marginBottom="md">
                    <Button type="submit">Create Account</Button>
                  </Box>
                </Form>
              </Formik>
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
