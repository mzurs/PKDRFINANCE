import { initialize } from "zokrates-js";
const fs = require("fs");
const path = require("path");
const main = async () => {
  const zk = fs
    .readFileSync(path.join(__dirname, "..", "src", "zk_users.zok"))
    .toString();
  const zokratesProvider = await initialize();
  // console.log(zk);
  // console.log(zk)
  const artifacts = zokratesProvider.compile(zk);

  // fs.writeFileSync(
  //   path.join(
  //     __dirname,
  //     "..",
  //     "..",
  //     "..",
  //     "..",
  //     "zkConstant",
  //     "generated",
  //     "outT.json"
  //   ),
  //   JSON.stringify(artifacts.program)
  // );
  // fs.writeFileSync(
  //   path.join(
  //     __dirname,
  //     "..",
  //     "..",
  //     "..",
  //     "..",
  //     "zkConstant",
  //     "generated",
  //     "zk_abi.json"
  //   ),
  //   JSON.stringify(artifacts.abi)
  // );
  // console.log(artifacts)




  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "generated",
      "out"
    ),
    artifacts.program
  );
  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "generated",
      "zk_abi.json"
    ),
    JSON.stringify(artifacts.abi)
  );


};

main();
