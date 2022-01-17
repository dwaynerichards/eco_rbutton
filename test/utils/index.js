import { ethers } from "hardhat";
import "hardhat/console.sol";

export const setupUsers = async (addresses, contracts) => {
  const users = [];
  for (const address of addresses) {
    users.push(await setupUser(address, contracts));
  }
  return users;
};

export const setupUser = async (address, contracts) => {
  const user = { address }; //{address: etherAddres, rButton:contracts.connected()}
  for (const key of Object.keys(contracts)) {
    console.log("key from utils setUpUser", { key });
    user[key] = contracts[key].connect(await ethers.getSigner(address));
  }
  return user;
};
