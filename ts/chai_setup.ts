import chaiModule from "chai";
//import { use, expect } from "chai";
import { chaiEthers } from "chai-ethers"; //fork of waffle chai matchers
import { solidity } from "ethereum-waffle";
chaiModule.use(chaiEthers);
chaiModule.use(solidity);

const { expect } = chaiModule;
export = expect;
