import React from 'react';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';
import TextInput from 'mineral-ui/TextInput';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import Router from 'next/router';
import {string, object} from 'yup';
import {Formik, Form, FormField} from '../form';

import {LOGIN_USER, ME} from '../queries';
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

class SignInForm extends React.Component {
  handleSignIn = loginUser => {
    return async ({email, password}) => {
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
  };

  handleSignInUpdate = (cache, {data}) => {
    const {loginUser} = data;
    cache.writeQuery({
      query: ME,
      data: {
        me: loginUser
      }
    });
  };

  render() {
    const {redirectPath, location} = this.props;

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
              <Formik
                validationSchema={validationSchema}
                initialValues={{email: '', password: ''}}
                onSubmit={this.handleSignIn(loginUser)}
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
