import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const lobbyDeploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getUnnamedAccounts } = hre;
  const { deploy, log } = deployments;

  const RButton = await deployments.get("RButton");
  const { deployer } = await getNamedAccounts(); //hhDeploy allows naming of accounts

  const optionsObj = {
    from: deployer, //address which will perform deployment transaction.
    log: true, // Display address/ gas used in the console (not for tests).
    autoMine: true,
    args: [10, RButton.address]
  };
  const lobbyDeployResult = await deploy("Lobby", optionsObj);
  const { address } = lobbyDeployResult;
  if (lobbyDeployResult.newlyDeployed) log(`contract Lobby deplyed at ${address} `);
};
lobbyDeploy.tags = ["Lobby"]; // Tag allows independent execution of script(and its dependencies).
lobbyDeploy.dependencies = ["RButton"];
export default lobbyDeploy;
