function assertType(v, name, type) {
  if (typeof v === 'boolean') {
    console.assert(v === type, `Error, expected ${name} to be ${type} but ${v} recieved instead`);
  } else {
    console.assert(typeof v === type, `Error, expected ${name} to be ${type} but ${typeof v} recieved instead`);
  }
}

export default assertType;