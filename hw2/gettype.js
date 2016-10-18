const getType = function getType(arg) {
  if (Number.isNaN(arg)) return 'NaN';
  else if (arg === null) return 'null';
  else if (arg instanceof Array) return 'array';
  return (typeof arg);
};

module.exports = getType;
