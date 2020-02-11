import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Label, Input} from 'theme-ui';
import {useField} from 'formik';

type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  value?: string;
  placeholder?: string;
  isLabelHidden?: boolean;
};

const FormField: FC<FormFieldProps> = ({label, isLabelHidden, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <Label sx={{flexDirection: 'column'}}>
      {!isLabelHidden && <span>{label}</span>}
      <Input {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Label>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  isLabelHidden: PropTypes.bool
};

FormField.defaultProps = {
  isLabelHidden: false
};

export default FormField;
