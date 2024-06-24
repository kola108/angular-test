const glob = require('glob');
const fs = require('fs');

const mergedDir = './coverage/merged';

glob('./coverage/**/coverage-final.json', null, function (err, files) {
  if (!fs.existsSync(mergedDir)) {
    fs.mkdirSync(mergedDir);
  }

  let count = 1;

  for (const file of files) {
    const destFileName = file.split('/')
      .pop()
      .replace('.json', `-${ count }.json`);
    const dest = `${ mergedDir }/${ destFileName }`;

    fs.copyFileSync(file, dest);

    count++;
  }
});
