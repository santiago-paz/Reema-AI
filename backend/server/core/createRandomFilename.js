function createRandomFilename() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 15);
}

exports.createRandomFilename = createRandomFilename;
