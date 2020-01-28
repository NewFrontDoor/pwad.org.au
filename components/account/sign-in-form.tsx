import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Styled, Box, Button} from 'theme-ui';
import {string, object} from 'yup';
import {Formik, Form} from 'formik';
import {TextField} from '../form';

import {useLoginUserMutation} from '../queries';
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

type SignInForm = {
  redirectPath: string;
};

const SignInForm: FC<SignInForm> = ({redirectPath}) => {
  const [loginUser, {loading, error}] = useLoginUserMutation({
    update(_cache) {
      // Force a reload of all the current queries now that the user is
      // logged in
      // cache.reset().then(() => {
      //   redirect('/');
      // });

      redirect('/');
    }
  });

  return (
    <>
      <Box marginBottom={3}>
        <GoogleButton redirectPath={redirectPath}>
          Signin with Google
        </GoogleButton>
      </Box>
      <Styled.p variant="prose">Or</Styled.p>
      <Box marginBottom={3}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={handleSignIn(loginUser)}
        >
          <Form>
            {loading && 'Loading...'}
            {error?.graphQLErrors.map(({message}) => (
              <p key={message}>{message}</p>
            ))}
            <Box marginBottom={3}>
              <TextField required label="Email" type="email" name="email" />
            </Box>
            <Box marginBottom={3}>
              <TextField
                required
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
};

SignInForm.propTypes = {
  redirectPath: PropTypes.string
};

SignInForm.defaultProps = {
  redirectPath: undefined
};

export default SignInForm;
