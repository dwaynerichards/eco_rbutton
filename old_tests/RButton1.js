const RButton = artifacts.require("RButton");

contract("RButton", (accounts) => {
  const testObj = { from: accounts[0], value: 100000 };
  it("should deposit 1 ether into Treasure Chest ", async () => {
    const rButton = await RButton.deployed();
    await rButton.pressButton(testObj);
    let vaultTotal = await rButton.getVaultEth.call();
    vaultTotal = vaultTotal.toNumber();
    assert.equal(vaultTotal, 100000);
  });

  it("should return true after successful deposit ", async () => {
    const rButton = await RButton.deployed();
    let isDepositedTx = await rButton.pressButton(testObj);
    isDepositedTx = isDepositedTx.logs[0].args.success;
    assert.equal(isDepositedTx, true);
  });

  it("should registed block in which coins were deposited", async () => {
    const rButton = await RButton.deployed();
    let isDepositedTx = await rButton.pressButton(testObj);

    if (isDepositedTx.logs[0].args.depositBlock) isDepositedTx = true;
    assert.equal(isDepositedTx, true);
  });
  it("should revert after unsuccessful deposit ", async () => {
    const rButton = await RButton.deployed();
    let err;
    await rButton.pressButton({ from: accounts[0], value: 100 }).catch((e) => (e ? (err = true) : null));
    assert.equal(err, true);
  });

  it("should revert if incorrect address attempts to claim treasure ", async () => {
    const rButton = await RButton.deployed();
    await rButton.pressButton(testObj);
    let err;
    await rButton.claimTreasure({ from: accounts[1] }).catch((e) => (e ? (err = true) : null));
    assert.equal(err, true);
  });

  it("should revert if claim is made before block allowance", async () => {
    const rButton = await RButton.deployed();
    await rButton.pressButton(testObj);
    let tooSoon;
    await rButton.claimTreasure({ from: accounts[0] }).catch((e) => (e ? (tooSoon = true) : null));
    assert.equal(tooSoon, true);
  });

  /**needs work */
  it("Vault Should Be Empty", async () => {
    const rButton = await RButton.deployed();

    const isDeposited = await rButton.pressButton(testObj);

    let ethClaimed;
    const treasurePromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(rButton.claimTreasure({ from: accounts[0] }));
      }, 45000);
    });
    treasurePromise.then((treasureTx) => {
      ethClaimed = treasureTx.logs[0].args.totalEth;
    });

    let vaultTotal = await rButton.getVaultEth.call();
    vaultTotal = vaultTotal.toNumber();
    assert.equal(vaultTotal, 0);
    assert.equal(ethClaimed, 100000);
  });

  it("Winner should have corresponding address", async () => {
    const rButton = await RButton.deployed();

    await rButton.pressButton({ from: accounts[0], value: 100000 });

    let claimAddress;
    const treasurePromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(rButton.claimTreasure({ from: accounts[0] }));
      }, 45000);
    });
    treasurePromise.then((treasureTx) => {
      claimAddress = treasureTx.logs[0].args.winner;
    });
    assert.equal(claimAddress, accounts[0]);
  });
});
