/**
 * Pick one from an array
 */
function oneOf(arr: any[]) {
  const len = arr.length;
  return arr[Math.floor(Math.random() * len)];
}

export default oneOf;
