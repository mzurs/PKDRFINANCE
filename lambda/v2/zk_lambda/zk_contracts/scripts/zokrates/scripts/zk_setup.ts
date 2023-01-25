import { initialize } from 'zokrates-js';
const fs = require("fs");
const path = require("path");
const main = async () => {
  const zokratesProvider = await initialize();
  const keypair = zokratesProvider.setup(
    fs.readFileSync(path.join(__dirname, "..", "generated", "out"))
  );
  // fs.writeFileSync(
  //   path.join(__dirname,"..","..","..","..","zkConstant", "generated", "zk_setup.json"),
  //   JSON.stringify(keypair)
  // );
  // console.log(keypair)
  fs.writeFileSync(
    path.join(__dirname,"..","generated", "zk_setup.json"),
    JSON.stringify(keypair)
  );
};

main();
