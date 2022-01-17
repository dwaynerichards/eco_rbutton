require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
/**
 * @type require(('hardhat/config').HardhatUserConfi)
 */

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
//const ALCHEMY_API_KEY = process.env.ALCHEMY;

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
//const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

// module.exports = {
//   solidity: "0.7.3",
//   networks: {
//     ropsten: {
//       url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
//       accounts: [`${ROPSTEN_PRIVATE_KEY}`]
//     }
//   }
// };
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

module.exports = { config };
