const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RButton contract", function () {
  const testObj = { from: accounts[0], value: 100000 };
  it("Should depoist ether into treasure chest", async function () {
    const [owner, account1] = await ethers.getSigners();
    const ItMapLib = await ethers.getContractFactory("IterableMap");
    let itMapLib = ItMapLib.deployed();
    const libObj = { libraries: { IterableMap: itMapLib.address() } };

    /**
     * const contractFactory = await this.env.ethers.getContractFactory("Example", {
     libraries: {
         ExampleLib: "0x...",
        },
    });
    */
    const RButton = await ethers.getContractFactory("RButton", libObj);
    const rButton = await RButton.deploy();

    await rButton.pressButton(testObj);
    let vaultTotal = await rButton.getVaultEth.call();
    vaultTotal = vaultTotal.toNumber();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
