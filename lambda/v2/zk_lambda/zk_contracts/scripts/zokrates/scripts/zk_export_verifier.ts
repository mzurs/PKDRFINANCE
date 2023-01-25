import { initialize } from "zokrates-js";

const fs = require("fs");
const path = require("path");
const keypair = require("../generated/zk_setup.json");
const main = async () => {
  const MIT_LICENSE = `// SPDX-License-Identifier: MIT \n //`;
  const zokratesProvider = await initialize();
  //  console.log(keypair)
  const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
  fs.writeFileSync(
    path.join(__dirname, "..", "..", "..", "contracts", "Verifier.sol"),
    MIT_LICENSE
  );
  fs.appendFileSync(
    path.join(__dirname, "..", "..", "..", "contracts", "Verifier.sol"),
    verifier
  );
};

main();
