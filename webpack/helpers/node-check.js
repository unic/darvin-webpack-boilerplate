const fs = require('fs-extra');
const path = require('path');

let nvmRcVersion = fs.readFileSync(path.join(process.cwd(), '.nvmrc'), 'utf8').replace(/[^0-9.]/g, "");
let nodeProcessVersion = process.version.replace(/[^0-9.]/g, "");

if(nodeProcessVersion != nvmRcVersion) {
  console.error(`DV#> make sure node is running under v${nvmRcVersion}`);
  process.exit();
}
