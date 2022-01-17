import { expect } from "./chai-setup";
import { ethers, deployments, getUnnamedAccounts } from "hardhat";
import { setupUsers } from "./utils";
// eslint-disable-next-line no-undef
// we create a setup function that can be called by every test and
const setup = async () => {
  await deployments.fixture(["RButton"]); //deployment executed and reset (use of evm_snapshot for faster tests)
  const contract = { RButton: await ethers.getContract("RButton") }; //instantiated ethers contract instance
  //const { deployer } = await getNamedAccounts();
  const signers = await setupUsers(await getUnnamedAccounts(), contract);
  return { ...contract, signers };
};

describe("RButton contract", () => {
  const testObj = { value: 100000 };
  // eslint-disable-next-line no-unused-vars
  it("Should deposit ether into treasure chest", async () => {
    //if you write many tests, and they all refer to that fixture, the deployment will not be reexecuted.
    const { RButton, signers } = await setup();
    // // We use .connect(signer) in setup invocation
    const tx = await signers[0].RButton.pressButton(testObj);
    // const tx = await RButton.connect(account1).pressButton(testObj);
    await tx.wait();
    let vaultTotal = await RButton.getVaultEth();
    vaultTotal = vaultTotal.toNumber();
    expect(vaultTotal).to.equal(100000);
  });
});
