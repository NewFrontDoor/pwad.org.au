import React from 'react';
import PropTypes from 'prop-types';
import {get, has} from 'lodash';
import {Field} from 'formik';
import {FormField as MineralFormField} from 'mineral-ui/Form';

const FormField = ({name, ...props}) => (
  <Field name={name}>
    {({field, form}) => {
      const touched = get(form.touched, name);
      const invalid = has(form.errors, name);
      const showError = touched && invalid;
      const error = showError ? get(form.errors, name) : undefined;
      const variant = showError ? 'danger' : undefined;
      return (
        <MineralFormField
          invalid={invalid}
          caption={error}
          variant={variant}
          {...props}
          {...field}
        />
      );
    }}
  </Field>
);

FormField.propTypes = {
  input: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FormField;
