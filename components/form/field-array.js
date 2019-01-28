import React from 'react';
import PropTypes from 'prop-types';
import {getIn, FieldArray as FormikFieldArray} from 'formik';
import {FormField as MineralFormField} from 'mineral-ui/Form';
import {CheckboxGroup} from 'mineral-ui/Checkbox';

const FieldArray = ({name, input, ...props}) => (
  <FormikFieldArray name={name}>
    {({field, form, push, remove}) => {
      const values = {};
      const value = getIn(form.values, name);
      const touched = getIn(form.touched, name);
      const invalid = typeof getIn(form.errors, name) === 'string';
      const showError = touched && invalid;
      const error = showError ? getIn(form.errors, name) : undefined;
      const variant = showError ? 'danger' : undefined;

      if (input === CheckboxGroup) {
        values.checked = value;
        values.onChange = event => {
          if (event.target.checked) {
            push(event.target.value);
          } else {
            const index = value.indexOf(event.target.value);
            remove(index);
          }
        };
      } else {
        values.value = value;
      }

      return (
        <MineralFormField
          invalid={invalid}
          caption={error}
          variant={variant}
          input={input}
          name={name}
          {...props}
          {...field}
          {...values}
        />
      );
    }}
  </FormikFieldArray>
);

FieldArray.propTypes = {
  input: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

FieldArray.defaultProps = {
  type: undefined,
  value: undefined
};

export default FieldArray;
