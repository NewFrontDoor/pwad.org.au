import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {string, object} from 'yup';
import {Formik, Form, FormField} from '../form';

import {CREATE_USER} from '../queries';
import redirect from '../../lib/redirect';
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

function handleCreateUser(createAccount) {
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
}

function handleCreateUserUpdate(cache) {
  // Force a reload of all the current queries now that the user is
  // logged in
  cache.reset().then(() => {
    redirect({}, '/my-account');
  });
}

function CreateAccountForm({redirectPath, location}) {
  const [createAccount, {loading, error}] = useMutation(CREATE_USER, {
    update: handleCreateUserUpdate
  });

  return (
    <>
      <Box marginBottom="md">
        <GoogleButton redirectPath={redirectPath} location={location}>
          Signup with Google
        </GoogleButton>
      </Box>
      <Text appearance="prose">Or</Text>
      <Box marginBottom="md">
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleCreateUser(createAccount)}
        >
          <Form
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
          >
            {loading && 'Loading...'}
            {error &&
              error.graphQLErrors.map(({message}) => (
                <p key={message}>{message}</p>
              ))}
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
      </Box>
    </>
  );
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
