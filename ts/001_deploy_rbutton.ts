import { HardhatRuntimeEnvironment as HRE } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFunc: DeployFunction = async (hre: HRE) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer, from } = await getNamedAccounts(); //hhDeploy allows naming of accounts

  const IterableMap = await deploy("IterableMap", { from });
  const libraries = { IterableMap: IterableMap.address };
  const optionsObj = {
    from: deployer, //address which will perform deployment transaction.
    log: true, // Display address/ gas used in the console (not for tests).
    autoMine: true,
    libraries //library to link to contract
  };
  await deploy("RButton", optionsObj);
};
deployFunc.tags = ["RButton"]; // Tag allows independent execution of script(and its dependencies).
export default deployFunc;
