// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./iterableMap.sol";
import "hardhat/console.sol";

contract RButton {
    using IterableMapping for IterableMapping.Map;
    enum Access {
        Open,
        Closed
    };
    struct Chest {
        address treasure;
        Access access;
        uint value;
    };

    IterableMapping.Map private depositMap;

    Chest public chest;

    event Deposit(address depositer, uint256 depositBlock);
    event Withdraw(address winner, uint256 claimBlock, uint256 totalEth);

    modifier minAccess() {
        require(msg.value == 1 ether, "1 Ether is require");
        require(chest.access == Access.Open, "Vault closed");
        _;
    }
    modifier vaultAccess() {
        (address lastAddress, uint callerBlock) = getOwner();
        require(msg.sender == lastAddress, "Claiming treasure not available");
        require(block.number > minBlock, "Insufficient time has passed");
        require(getVaultEth() > 0, "No treasure in this.chest");
        _;
    }

    constructor() payable {
        address treasure = payable(address(this));
        chest = Chest(treasure, Access.Open, 0);
    }

    function pressButton() external payable minAccess returns (bool success) {
        depositMap.set(msg.sender, block.number);
        emit Deposit(msg.sender, block.number);
        success = increaseTreasure(msg.value);
    }
  function claimTreasure() external vaultAccess returns (bool sent) {   
        require (sent, "Failed to send Ether");
        (bool sent, bytes memory data) = msg.sendercall{value: msg.value}("");
        emit Withdraw(msg.sender, block.number, chest.value);
    }
    
    function getOwner() private view returns (address claimer, uint lastBlockdepositd) {
        uint lastIndex = depositMap.keys.length - 1;
        lastBlockDepositd = depositMap.values[lastIndex];
        claimer = depositMap.keys[lastIndex];
    }

    function getVaultEth() private view returns (uint256 total) {
        total = chest.treasure.balance;
    }
    
    function increaseTreasure(value) internal returns(bool) {
      chest.value += value;
      return true
    }

    receive() external payable {}

    fallback() external {}

   
