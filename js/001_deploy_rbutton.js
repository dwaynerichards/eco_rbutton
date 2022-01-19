const deployFunc = async (hre) => {
  //// the deploy function receives hardHatRunTimeEnv as an argument
  //hardHatRunTimeEnvironment
  // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments; // The deployments field itself contains the deploy function.
  const { deployer, from } = await getNamedAccounts(); // Fetch the accounts. These can be configured in hardhat.config
  // This will create a deployment called 'Token'. By default it will look for an artifact with the same name.
  // The 'contract' option allows you to use a different artifact.
  const IterableMap = await deploy("IterableMap", { from });
  const libraries = { IterableMap: IterableMap.address };
  const optionsObj = {
    from: deployer, //address which will perform deployment transaction.
    log: true,
    autoMine: true,
    libraries //library to link to contract
  };
  await deploy("RButton", optionsObj);
};
deployFunc.tags = ["RButton"];
module.exports = deployFunc;
