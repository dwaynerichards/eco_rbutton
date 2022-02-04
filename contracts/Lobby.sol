pragma solidity >=0.5.22 <0.9.0;

import "./RButton.sol";

import "hardhat/console.sol";

contract Lobby {
	uint256 internal remainingPlayers;
	address internal game;
	mapping(address => bool) internal players;
	RButton internal rbutton;

	constructor(uint256 _players, address rButtonAddress) {
		remainingPlayers = _players;
		rbutton = RButton(payable(rButtonAddress));
	}

	modifier gameAccess() {
		require(players[msg.sender] == true, "Must have access to game");
		require(remainingPlayers == 0, "All game slots taken");
		_;
	}

	function joinGame() external {
		require(players[msg.sender] == false, "Player already in game");

		if (game == address(0)) {
			game = address(rbutton);
		}
		rbutton.loadPlayers(msg.sender);
		remainingPlayers -= 1;
		players[msg.sender] = true;
		console.log("%s: address of party invoking joinGame", msg.sender);
	}

	function beginGame() external gameAccess {
		require(rbutton.getAccess() == false, "Chest must be closed");
		bool gameBegan = rbutton.openChest();
		console.log("%s address of party invoking beginGame");
		require(gameBegan, "Game not started");
	}
}
