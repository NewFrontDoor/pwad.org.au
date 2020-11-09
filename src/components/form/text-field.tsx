/** @jsx jsx */
import {FC} from 'react';
import PropTypes from 'prop-types';
import {jsx, Label, Input} from 'theme-ui';
import {useField} from 'formik';
import VisuallyHidden from '@reach/visually-hidden';
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
      {isLabelHidden ? (
        <VisuallyHidden>{label}</VisuallyHidden>
      ) : (
        <span>{label}</span>
      )}
      <Input {...field} {...props} />
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
