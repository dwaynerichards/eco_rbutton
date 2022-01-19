const { ethers, deployments, getUnnamedAccounts } = require("hardhat");

const setupUsers = async (addresses, contracts) => {
  const users = [];
  for (const address of addresses) {
    users.push(await setupUser(address, contracts));
  }
  return users;
};

const setupUser = async (address, contracts) => {
  const user = { address }; //{address: etherAddres, rButton:contracts.connected()}
  for (const key of Object.keys(contracts)) {
    user[key] = contracts[key].connect(await ethers.getSigner(address));
  }
  return user;
};

const setup = async () => {
  await deployments.fixture(["RButton"]); //deployment executed and reset (use of evm_snapshot for faster tests)
  const contract = { RButton: await ethers.getContract("RButton") }; //instantiated ethers contract instance
  //const { deployer } = await getNamedAccounts();
  const signers = await setupUsers(await getUnnamedAccounts(), contract);
  return { ...contract, signers };
};

module.exports = { setupUser, setupUsers, setup };
