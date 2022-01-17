/* eslint-disable no-undef */

const IterableLib = artifacts.require("./iterableMap.sol");
const RButton = artifacts.require("RButton");

/**
 * 
 Deploying multiple contracts as an array is now deprecated.
 The name specified should match the name of the contract definition within that source file
 
 deployer.link(library, destinations)¶
 */

/**
 You can use Hardhat alongside Truffle if you want to use its migration 
 system. Your contracts written using Hardhat will just work with Truffle.
 * 
 */
module.exports = async () => {
  // const itMapLib = IterableLib.new();
  // const rButton = RButton.new();

  // IterableLib.setAsDeployed(itMapLib);
  // RButton.setAsDeplyed(rButton);

  await deployer.deploy(IterableLib);
  await deployer.link(IterableLib, RButton);
  await deployer.deploy(RButton);
};
