import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "./tasks";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6"
  },
  namedAccounts: {
    deployer: 0,
    from: 1
  },
  paths: {
    sources: "contracts"
  }
};
export default config;
