import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// https://github.com/projectsophon/hardhat-circom
import "hardhat-circom";
// circuits
import circuits = require("./circuits.config.json");
require("dotenv").config();
// set env var to the root of the project
process.env.BASE_PATH = __dirname;
const API_KEY = process.env.INFURA_API_KEY || "";
const KEY = process.env.PRIVATE_KEY || "";

// tasks
import "./tasks/newcircuit.ts";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.11",
      },
    ],
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${API_KEY}`,
      accounts: [KEY],
    },
  },
  circom: {
    // (optional) Base path for input files, defaults to `./circuits/`
    inputBasePath: "./circuits",
    // (required) The final ptau file, relative to inputBasePath, from a Phase 1 ceremony
    ptau: "powersOfTau28_hez_final_12.ptau",
    // (required) Each object in this array refers to a separate circuit
    circuits: JSON.parse(JSON.stringify(circuits)),
  },
};

export default config;
