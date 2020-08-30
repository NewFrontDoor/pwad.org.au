import PropTypes from 'prop-types';

export default function is<T extends string>(value: T): PropTypes.Validator<T> {
  return function (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
  ): Error {
    if (props[propName] !== value) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
  };
}
