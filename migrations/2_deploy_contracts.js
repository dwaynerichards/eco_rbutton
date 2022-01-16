/* eslint-disable no-undef */

const IterableLib = artifacts.require("./iterableMap.sol");
const RButton = artifacts.require("RButton");

//// Deploying multiple contracts as an array is now deprecated.
//The name specified should match the name of the contract definition within that source file

//deployer.link(library, destinations)¶
module.exports = async function (deployer) {
  await deployer.deploy(IterableLib);
  await deployer.link(IterableLib, RButton);
  await deployer.deploy(RButton);
};
