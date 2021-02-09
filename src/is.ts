import PropTypes from 'prop-types';

export default function is<T extends string>(value: T): PropTypes.Validator<T> {
  return (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
  ): Error | null => {
    if (props[propName] !== value) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }

    return null;
  };
}
