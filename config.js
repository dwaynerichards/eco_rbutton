import dotenv from "dotenv";
dotenv.config();

const { INFURA_MAINNET, INFURA_ROPSTEN, INFURA_KOVAN, INFURA_RINKEBY, ALCHEMY, INFURA_GOERLI } = process.env;

const api = {
  INFURA_MAINNET,
  INFURA_ROPSTEN,
  INFURA_KOVAN,
  INFURA_RINKEBY,
  ALCHEMY,
  INFURA_GOERLI
};

export default api;
