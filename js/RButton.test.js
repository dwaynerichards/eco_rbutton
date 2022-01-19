/* eslint-disable no-undef */
const { expect } = require("./chai-setup");
const { utils } = require("ethers");
const { setup } = require("./utils");

/** @dev eslint-disable-next-line no-undef
setup function that will be called by every test and
chai now has access to ethersjs and solidity syntax
 */
describe("RButton contract", () => {
  let oneEther = utils.parseEther("1");
  const testObj = { value: oneEther };
  const vaultToStr = async (signer) => {
    let chest = await signer.RButton.checkVault();
    return utils.formatEther(chest);
  };
  // eslint-disable-next-line no-unused-vars

  it("Should deposit ether into treasure chest", async () => {
    //if you write many tests, and they all refer to that fixture, the deployment will not be reexecuted.
    const { signers } = await setup();
    const signer = signers[0];
    const tx = await signer.RButton.pressButton(testObj);
    await tx.wait();
    const vaultTotal = await vaultToStr(signer);
    oneEther = utils.formatEther(oneEther);
    expect(vaultTotal).to.equal(oneEther);
  });

  it("Should log true to the blockChain after successful deposit ", async () => {
    const { signers } = await setup();
    const signer = signers[0];
    let tx = await signer.RButton.pressButton(testObj);
    tx = await tx.wait();
    const isDeposited = tx.events[0].args.success;
    console.log(isDeposited);
    expect(isDeposited).to.equal(true);
  });

  it("Should log block in which coins were deposited", async () => {
    const { signers } = await setup();
    const signer = signers[0];
    let tx = await signer.RButton.pressButton(testObj);
    tx = await tx.wait();
    const bnHex = tx.events[0].args.depositBlock._hex;
    const bn = parseInt(bnHex, 16);
    expect(tx.blockNumber).to.equal(bn);
  });
  it("should revert after unsuccessful deposit ", async () => {
    const { signers } = await setup();
    const signer = signers[0];
    const small = { value: 100 };
    await expect(signer.RButton.pressButton(small)).to.be.revertedWith("More Ether is require");
  });
  it("should revert if incorrect address attempts to claim treasure ", async () => {
    const { signers } = await setup();
    const goodSign = signers[0];
    const badSign = signers[1];
    await goodSign.RButton.pressButton(testObj);
    await goodSign.RButton.test();
    await goodSign.RButton.test();
    await expect(badSign.RButton.claimTreasure()).to.be.revertedWith("Claiming treasure not available to this address");
  });

  it("Should revert if claim is made before block allowance", async () => {
    const { signers } = await setup();
    const signer = signers[0];
    await signer.RButton.pressButton(testObj);
    await signer.RButton.test();
    expect(signer.RButton.claimTreasure()).to.be.revertedWith("Insufficient time has passed");
  });

  it("Vault should be emptied", async () => {
    const { signers } = await setup();
    const signer = signers[0];
    const claimer = signers[1];
    await signer.RButton.pressButton(testObj);
    await claimer.RButton.pressButton(testObj);
    await signer.RButton.test();
    await signer.RButton.test();
    await signer.RButton.test();

    const currentVault = await vaultToStr(claimer);
    console.log("chestVal", currentVault, "2");
    expect(currentVault).to.equal("2.0");
    await claimer.RButton.claimTreasure();
    const emptyVault = await vaultToStr(claimer);
    console.log("empty:", emptyVault, "0");
    expect(emptyVault).to.equal("0.0");
  });
});
module.exports = { setup };
