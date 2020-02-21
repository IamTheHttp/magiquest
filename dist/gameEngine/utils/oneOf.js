function oneOf(arr) {
    var len = arr.length;
    return arr[Math.floor(Math.random() * len)];
}
export default oneOf;
