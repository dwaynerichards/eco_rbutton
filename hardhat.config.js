require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("./tasks");

const config = {
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
module.exports = config;
