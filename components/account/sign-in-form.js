import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';
import TextInput from 'mineral-ui/TextInput';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import {string, object} from 'yup';
import {Formik, Form, FormField} from '../form';

import {LOGIN_USER} from '../queries';
import redirect from '../../lib/redirect';
import GoogleButton from './google-button';

const validationSchema = object().shape({
  email: string()
    .label('Email')
    .email()
    .required(),
  password: string()
    .label('Password')
    .required()
});

function handleSignInUpdate(cache) {
  // Force a reload of all the current queries now that the user is
  // logged in
  cache.reset().then(() => {
    redirect({}, '/');
  });
}

function handleSignIn(loginUser) {
  return ({email, password}) => {
    loginUser({
      variables: {
        email,
        password
      }
    });
  };
}

function SignInForm({redirectPath, location}) {
  const [loginUser, {loading, error}] = useMutation(LOGIN_USER, {
    update: handleSignInUpdate
  });

  return (
    <>
      <Box marginBottom="md">
        <GoogleButton redirectPath={redirectPath} location={location}>
          Signin with Google
        </GoogleButton>
      </Box>
      <Text appearance="prose">Or</Text>
      <Box marginBottom="md">
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={handleSignIn(loginUser)}
        >
          <Form>
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
              />
            </Box>
            <Box marginBottom="md">
              <FormField
                required
                input={TextInput}
                label="Password"
                type="password"
                name="password"
              />
            </Box>
            <Button type="submit">Signin</Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
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
