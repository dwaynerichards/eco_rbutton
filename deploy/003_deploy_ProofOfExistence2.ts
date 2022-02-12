import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const funcProof: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  try {
    const { deployments, getNamedAccounts } = hre;

    const { deploy, log } = deployments;

    const { deployer } = await getNamedAccounts();

    const deployResult = await deploy("ProofOfExistence2", {
      from: deployer,
      log: true
    });
    const { address } = deployResult;

    if (deployResult.newlyDeployed) log(`contract POE deployed at ${address}`);
  } catch (error) {
    console.log(error);
  }
};

funcProof.tags = ["ProofOfExistence2"];
export default funcProof;
