import chai from "chai";
//import { use, expect } from "chai";
import { chaiEthers } from "chai-ethers"; //fork of waffle chai matchers
import { solidity } from "ethereum-waffle";
chai.use(chaiEthers);
chai.use(solidity);

const { expect } = chai;
export { expect };
