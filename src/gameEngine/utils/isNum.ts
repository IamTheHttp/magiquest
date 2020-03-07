// Allowed 'any' as this is a runtime check
function isNum(num:any) {
  return typeof num === 'number';
}

export default isNum;