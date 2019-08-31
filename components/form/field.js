import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import {getIn, Field} from 'formik';
import {FormField as MineralFormField} from 'mineral-ui/Form';

const FormField = ({name, ...props}) => (
  <Field name={name}>
    {({field, form}) => {
      const values = {};
      const value = getIn(form.values, name);
      const touched = getIn(form.touched, name);
      const invalid = has(form.errors, name);
      const showError = touched && invalid;
      const error = showError ? getIn(form.errors, name) : undefined;
      const variant = showError ? 'danger' : undefined;

      if (props.type === 'checkbox') {
        values.checked = value;
      } else if (props.type === 'radio') {
        values.checked = props.value === value;
      } else {
        values.value = value;
      }

      return (
        <MineralFormField
          invalid={invalid}
          caption={error}
          variant={variant}
          {...props}
          {...field}
          {...values}
        />
      );
    }}
  </Field>
);

FormField.propTypes = {
  input: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

FormField.defaultProps = {
  type: undefined,
  value: undefined
};

export default FormField;
