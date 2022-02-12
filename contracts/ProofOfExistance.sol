// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;

contract ProofOfExistance {
	// state
	bytes32 public proof;

	constructor() {}

	// calculate and store the proof for a document
	// *transactional function*
	function notarize(string memory document) public {
		proof = proofFor(document);
	}

	// helper function to get a document's sha256
	// *read-only function*
	function proofFor(string memory document) public pure returns (bytes32) {
		return sha256(abi.encodePacked(document));
	}
}
