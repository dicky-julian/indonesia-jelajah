const randomAlphaNumeric = (digits, length) => {
  const references = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result = '';
  for (let digit = digits; digit > 0; --digit) {
    for (let row = length; row > 0; --row) {
      result += references[Math.floor(Math.random() * references.length)];
    }
    if (digit > 1) {
      result += '-'
    }
  }

  return result;
}

export {
  randomAlphaNumeric
}