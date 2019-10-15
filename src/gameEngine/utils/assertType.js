function assertType(v, name, type) {
  console.assert(typeof v === type, `Error, expected ${name} to be ${type} but ${typeof v} recieved instead`);
}

export default assertType;