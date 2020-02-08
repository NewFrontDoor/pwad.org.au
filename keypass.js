const {promises: fs} = require('fs');
const {Credentials, ProtectedValue, Kdbx} = require('kdbxweb');

async function loadKdbx({password, keypassFile}) {
  const data = await fs.readFile(keypassFile);
  const credentials = new Credentials(ProtectedValue.fromString(password));
  return Kdbx.load(data.buffer, credentials);
}

async function saveKdbx({db, keypassFile}) {
  const data = await db.save();
  await fs.writeFile(keypassFile, Buffer.from(data));
}

async function writeEntriesToKdbx(db) {
  const entry = db
    .getDefaultGroup()
    .groups.find(group => group.name === 'Organisations')
    .groups.find(group => group.name === 'PWAD Stage')
    .entries.find(entry => entry.fields.Title === 'PWAD dot env');

  console.log(entry.binaries);

  for await (const fileName of ['.env', '.env.build']) {
    const data = await fs.readFile(fileName);
    const newBinary = await db.createBinary(
      data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
    );
    entry.binaries[fileName] = newBinary;
    entry.pushHistory();
  }
}

async function readEntriesFromKdbx(db) {
  const {binaries} = db
    .getDefaultGroup()
    .groups.find(group => group.name === 'Organisations')
    .groups.find(group => group.name === 'PWAD Stage')
    .entries.find(entry => entry.fields.Title === 'PWAD dot env');

  for await (const [fileName, binary] of Object.entries(binaries)) {
    await fs.writeFile(fileName, Buffer.from(binary.value));
  }
}

module.exports = {
  loadKdbx,
  saveKdbx,
  writeEntriesToKdbx,
  readEntriesFromKdbx
};
