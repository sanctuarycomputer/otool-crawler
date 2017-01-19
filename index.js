const ENTRY       = '/usr/local/bin/mtp-detect';
const spawnSync   = require('child_process').spawnSync;
const fs          = require('fs');
const DEP_PATTERN = /\s+(.+)\s+\(.+\)/;
const ALL_DEPS    = [];

const getDeps = path => {
  const otool = spawnSync('otool', [path, '-L']);
  let log = otool.stdout.toString();
  let logLines = log.split("\n");
  for (let index = 0; index < logLines.length; index++) {
    let line = logLines[index];
    if (line.match(DEP_PATTERN)) {
      let pathToDep = line.match(DEP_PATTERN)[1];
      if (!ALL_DEPS.includes(pathToDep)) {
        ALL_DEPS.push(pathToDep);
        getDeps(pathToDep);
      }
    }
  }
}

getDeps(ENTRY);

ALL_DEPS.forEach(pathToDep => {
  let splat = pathToDep.split('/');
  let filename = splat[splat.length - 1];

  fs.createReadStream(pathToDep).pipe(fs.createWriteStream(`./deps/${filename}`));
  console.log(`Copied ${filename}`);
});

console.log('DONE!');
