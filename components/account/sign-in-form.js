import React from 'react';
import PropTypes from 'prop-types';

import GoogleButton from './google-button';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
  }

  render() {
    const {redirectPath, location} = this.props;

    return (
      <>
        <form onSubmit={this.handleSignIn} />
        <GoogleButton redirectPath={redirectPath} location={location}>
          Signin with Google
        </GoogleButton>
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
