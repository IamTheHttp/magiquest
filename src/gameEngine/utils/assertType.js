/* eslint no-console: "off" */
function assertType(expectedType, name, type) {
  if (typeof expectedType === 'boolean') {
    console.assert(
      expectedType === type,
      `Error, expected ${name} to be ${type} but ${expectedType} received instead`
    );
  } else {
    console.assert(
      typeof expectedType === type,
      `Error, expected ${name} to be ${type} but ${typeof expectedType} received instead`
    );
  }
}

export default assertType;