function initialSelectValue<T = string>(
  input: string | string[]
): Array<{value: T}> {
  return []
    .concat(input)
    .filter(Boolean)
    .map((value) => ({value}));
}

export default initialSelectValue;
