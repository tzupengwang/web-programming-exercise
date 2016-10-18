const counter = function counter() {
  let count = 0;
  const getCount = function getCount() {
    return count;
  };
  const increase = function increase() {
    count += 1;
  };
  const decrease = function decrease() {
    count -= 1;
  };
  return { getCount, increase, decrease };
};

module.exports = counter;
