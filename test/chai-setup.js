const chaiModule = require("chai");
const { chaiEthers } = "chai-ethers";
chaiModule.use(chaiEthers);

const { expect } = chaiModule;

module.exports = { expect };
