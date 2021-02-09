function initialSelectValue<T>(input: T | T[]): Array<{value: T}> {
  const inputArray = Array.isArray(input) ? input : [input];
  return inputArray.filter(Boolean).map((value) => ({value}));
}

export default initialSelectValue;
