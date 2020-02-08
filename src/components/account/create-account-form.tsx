import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Styled} from 'theme-ui';
import {string, object} from 'yup';
import {Formik, Form} from 'formik';
import {TextField} from '../form';

import {useCreateUserMutation} from '../queries';
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

type CreateAccountFormProps = {
  redirectPath?: string;
};

const CreateAccountForm: FC<CreateAccountFormProps> = ({redirectPath}) => {
  const [createAccount, {loading, error}] = useCreateUserMutation({
    update(/* cache */) {
      // Force a reload of all the current queries now that the user is
      // logged in
      // cache.reset().then(() => {
      // redirect('/my-account');
      // });
      redirect('/my-account');
    }
  });

  return (
    <>
      <Box marginBottom={3}>
        <GoogleButton redirectPath={redirectPath}>
          Signup with Google
        </GoogleButton>
      </Box>
      <Styled.p variant="prose">Or</Styled.p>
      <Box marginBottom={3}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={handleCreateUser(createAccount)}
        >
          <Form noValidate>
            {loading && 'Loading...'}
            {error?.graphQLErrors.map(({message}) => (
              <p key={message}>{message}</p>
            ))}
            <Box marginBottom={3}>
              <TextField required label="First name" name="firstName" />
            </Box>
            <Box marginBottom={3}>
              <TextField required label="Last name" name="lastName" />
            </Box>
            <Box marginBottom={3}>
              <TextField required type="email" label="Email" name="email" />
            </Box>
            <Box marginBottom={3}>
              <TextField
                required
                type="password"
                label="Password"
                name="password"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                required
                type="password"
                label="Confirm password"
                name="confirmPassword"
              />
            </Box>
            <Box marginBottom={3}>
              <Button type="submit">Create Account</Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

CreateAccountForm.propTypes = {
  redirectPath: PropTypes.string
};

CreateAccountForm.defaultProps = {
  redirectPath: undefined
};

export default CreateAccountForm;
