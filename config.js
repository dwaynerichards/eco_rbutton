const dotenv = require("dotenv");
dotenv.config();

const { INFURA_MAINNET, INFURA_ROPSTEN, INFURA_KOVAN, INFURA_RINKEBY, ALCHEMY, INFURA_GOERLI } =
  process.env;

const abi = {
  INFURA_MAINNET,
  INFURA_ROPSTEN,
  INFURA_KOVAN,
  INFURA_RINKEBY,
  ALCHEMY,
  INFURA_GOERLI,
};

module.exports = abi;
