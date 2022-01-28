pragma solidity >=0.5.22 <0.9.0;

import "./RButton.sol";

contract Lobby {
	uint256 remainingPlayers;
	address game;
	mapping(address => bool) players;
	RButton rbutton;

	constructor(uint256 _players) {
		remainingPlayers = _players;
	}

	modifier gameAccess() {
		require(players[msg.sender] == true, "Must have access to game");
		require(remainingPlayers == 0, "All game slots taken");
		_;
	}

	function joinGame() external {
		require(players[msg.sender] == false, "Player already in game");

		if (game == address(0)) {
			rbutton = RButton(rbutton);
			game = address(rbutton);
		}
		rbutton.loadPlayers(msg.sender);
		remainingPlayers -= 1;
		players[msg.sender] = true;
	}

	function beginGame() external gameAccess {
		require(rbutton.getAccess() == false, "Chest must be closed to start game");
		bool gameBegan = rbutton.openChest();
		require(gameBegan, "Game not started");
	}
}
