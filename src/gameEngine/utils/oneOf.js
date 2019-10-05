function oneOf(arr) {
  let len = arr.length;
  return arr[Math.floor(Math.random() * len)];
}

export default oneOf;