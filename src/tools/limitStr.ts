const limitString = (
  str: string,
  maxLength: number,
  truncate: string
): string => {
  return str.length > maxLength ? str.substring(0, maxLength) + truncate : str;
};

export default limitString;
