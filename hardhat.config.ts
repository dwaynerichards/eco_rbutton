import { HardhatUserConfig } from "hardhat/types";
import { task, types } from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers"; //fork
import "hardhat-deploy";
import "./tasks";
import { accounts, node_url } from "./utils/network"; //bundle private keys and network configuration
import api from "./utils/config";

const { ALCHEMY } = api;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6"
  },
  networks: {
    hardhat: {},
    mainnet: {
      url: node_url("mainnet"),
      accounts: accounts("mainnet")
    }
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
