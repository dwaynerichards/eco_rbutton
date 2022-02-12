import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();

  const deployResult = await deploy("ProofOfExistance", {
    from: deployer,
    log: true
  });
  const { address } = deployResult;

  if (deployResult.newlyDeployed) log(`contract Proof deployed at ${address}`);
};

func.tags = ["ProofOfExistance"];
export default func;
