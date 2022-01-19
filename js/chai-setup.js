const chaiModule = require("chai");
const { chaiEthers } = require("chai-ethers");
const { solidity } = require("ethereum-waffle");
chaiModule.use(chaiEthers);
chaiModule.use(solidity);

const { expect } = chaiModule;

module.exports = { expect };
