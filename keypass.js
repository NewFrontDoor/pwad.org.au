const File = require('vinyl');
const through = require('through2');
const readPkgUp = require('read-pkg-up');
const PluginError = require('plugin-error');
const {Credentials, ProtectedValue, Kdbx} = require('kdbxweb');

async function getProjectName() {
  const {packageJson} = await readPkgUp();
  return packageJson.name;
}

function loadKdbx(password) {
  const credentials = new Credentials(ProtectedValue.fromString(password));

  return through.obj(async function (file, _, cb) {
    try {
      if (file.isBuffer()) {
        file.db = await Kdbx.load(file.contents.buffer, credentials);
      }

      cb(null, file);
    } catch (error) {
      cb(error);
    }
  });
}

async function saveKdbx() {
  return through.obj(async function (file, _, cb) {
    try {
      if (file.db) {
        const data = await file.db.save();
        file.contents = Buffer.from(data);
      } else {
        this.emit(
          'error',
          new PluginError('save-kdbx', 'kdbx database was not loaded')
        );
      }

      cb(null, file);
    } catch (error) {
      cb(error);
    }
  });
}

async function readEnvEntries() {
  const projectName = await getProjectName();

  return through.obj(function (file, _, cb) {
    try {
      if (file.db) {
        const {entries} = file.db
          .getDefaultGroup()
          .groups.find((group) => group.name === 'Organisations')
          .groups.find((group) => group.name === projectName);

        for (const {fields} of entries) {
          this.push(
            new File({
              path: fields.Title,
              contents: Buffer.from(
                [fields.Title, fields.Password.getText()].join('=')
              )
            })
          );
        }

        cb();
      } else {
        this.emit(
          'error',
          new PluginError('save-kdbx', 'kdbx database was not loaded')
        );
      }
    } catch (error) {
      cb(error);
    }
  });
}

module.exports = {
  loadKdbx,
  saveKdbx,
  readEnvEntries
};
