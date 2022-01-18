/* eslint-disable no-undef */
//HRE will be imported via hhconfig

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

const testObj = { value: 100000 };
task("gettx", "Prints TX receipt", async () => {
  const { signers } = await setup();
  const signer = signers[0];
  let tx = await signer.RButton.pressButton(testObj);
  tx = await tx.wait();
  const bnHex = tx.events[0].args.depositBlock._hex;
  const bn = parseInt(bnHex, 16);
  console.log("tx", bn, tx.blockNumber);
});

task("upBlock", "Increase Block by 3", async () => {
  const { signers } = await setup();
  const signer = signers[0];
  await signer.RButton.test().then((tx) => console.log(tx.blockNumber));
  await signer.RButton.test().then((tx) => console.log(tx.blockNumber));
  await signer.RButton.test().then((tx) => console.log(tx.blockNumber));
});

task("checkChest", "Checks chest", async () => {
  const { signers } = await setup();

  await signers[0].RButton.pressButton(testObj);
  await signers[0].RButton.pressButton(testObj);
  await signers[0].RButton.pressButton(testObj);
  const chestAfter = await signers[0].RButton.chest();
  const chest = parseInt(chestAfter.value._hex, 16);
  signers[0].RButton.test();
  signers[0].RButton.test();
  signers[0].RButton.test();
  let currentVault = await signers[0].RButton.checkVault();
  currentVault = parseInt(currentVault._hex, 16);
  console.log("currentVault:", currentVault);
  let tx = await signers[0].RButton.claimTreasure();
  let laterVault = await signers[0].RButton.checkVault();
  laterVault = parseInt(laterVault._hex, 16);
  console.log("laterVault:", laterVault);
  tx = await tx.wait();
  const withdraw = tx.events[0].args.totalEth;
  console.log("withdrawEvent", withdraw);
  const withdrawhex = withdraw._hex;
  const vault = parseInt(withdrawhex, 16);
  console.log("vault", vault);
});
