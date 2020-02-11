export default <T = string>(input: string | string[]): Array<{value: T}> =>
  []
    .concat(input)
    .filter(Boolean)
    .map(value => ({value}));
