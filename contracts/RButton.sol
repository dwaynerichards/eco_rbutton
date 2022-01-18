// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./iterableMap.sol";
import "hardhat/console.sol";

/**
Implemation of iterable map lib, allowing contract to save gas by not haveing to iterate
though array of addresses to access most resent address to invoke pressButton function
O(1) vs O(N)
less of an issue if this small of a contract. 
@dev Ad array would of sufficed, assuming you wanted to keep a tally of all addresses who have doned to contract
as that information would be saved onchain either way 
@dev In retrospect, deposit and calinTreasure dont need returns because they return tx receipts
*/
contract RButton {
	using IterableMap for IterableMap.Map;
	enum Access {
		Open,
		Closed
	}
	struct Chest {
		address treasure;
		Access access;
		uint256 value;
	}
	IterableMap.Map private depositMap;
	Chest public chest;
	uint256 internal tests;

	event Deposit(address depositer, uint256 depositBlock, bool success);
	event Withdraw(address winner, uint256 claimBlock, uint256 totalEth, bool success);
	event Refund(address sender, bool refunded);
	modifier minAccess() {
		require(msg.value == 100000 wei, "More Ether is require");
		require(chest.access == Access.Open, "Vault closed");
		_;
	}
	modifier vaultAccess() {
		(address lastAddress, uint256 callerBlock) = getOwner();
		uint256 minBlock = callerBlock + 2;
		require(msg.sender == lastAddress, "Claiming treasure not available to this address");
		require(block.number > minBlock, "Insufficient time has passed");
		require(getVaultEth() > 0, "No treasure in this chest");
		_;
	}

	constructor() payable {
		address treasure = payable(address(this));
		chest = Chest(treasure, Access.Open, 0);
	}

	function pressButton() public payable minAccess {
		depositMap.set(msg.sender, block.number);
		bool success = increaseTreasure(msg.value);
		uint256 blockNum = block.number;
		console.log("%s deposited ether into contract at block %s", msg.sender, blockNum);
		console.log("the deposit was a success: %s", success);
		emit Deposit(msg.sender, blockNum, success);
	}

	function claimTreasure() public payable vaultAccess {
		bool sent = sendTreasure(msg.sender);
		console.log("%s attempts to claim treasure", msg.sender, getVaultEth());
		emit Withdraw(msg.sender, block.number, chest.value, sent);
		require(sent, "Failed to send Ether");
	}

	function sendTreasure(address recipient) internal returns (bool sent) {
		sent = payable(recipient).send(address(this).balance);
		require(sent);
	}

	/**
@dev returns tuple
@return claimer most recent wallet to have invoked pressButton
@return lastBlockDepositd block in which the pressButton function was last invoked
 */
	function getOwner() private view returns (address claimer, uint256 lastBlockDepositd) {
		uint256 lastIndex = depositMap.keys.length - 1;
		address lastAddress = depositMap.keys[lastIndex];
		lastBlockDepositd = depositMap.values[lastAddress];
		claimer = depositMap.keys[lastIndex];
	}

	/**
    future implemetations would set function to private to save gas
    use externally for testing
    @return total returns value in vault */
	function getVaultEth() public view returns (uint256 total) {
		total = address(this).balance;
	}

	function increaseTreasure(uint256 value) internal returns (bool) {
		chest.value += value;
		return true;
	}

	function test() public {
		console.log("Incrementing Block %s", block.number);
		tests += 1;
	}

	receive() external payable {
		console.log("Funds Sent by:", msg.sender);
		(bool success, ) = msg.sender.call{ value: msg.value }("");
		emit Refund(msg.sender, success);
		(msg.sender, success);
	}

	fallback() external {
		emit Refund(msg.sender, false);
	}
}
