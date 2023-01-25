//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;

contract Profiles {
    error USER_EXISTS();
    error USER_NOT_EXISTS();
    error ONLY_OWNER();
    error ALREADY_VERIFIED();
    error IS_NOT_IN_LIST();

    address private immutable PKDRorg;

    mapping(address => bool) public verifiedUser;

    event ProfileCreated(address, bool);
    event ProfileRevoked(address);
    event ProfileRetained(address);

    modifier onlyPKDRorg() {
        if (msg.sender != PKDRorg) revert ONLY_OWNER();
        _;
    }
    modifier ifUserExists(address userAddress) {
        if (verifiedUser[userAddress]) revert USER_EXISTS();
        _;
    }
    modifier ifUserNotExists(address userAddress) {
        if (!verifiedUser[userAddress]) revert USER_NOT_EXISTS();
        _;
    }
    modifier alreadyVerified(address userAddress) {
        if (verifiedUser[userAddress] == true) revert ALREADY_VERIFIED();
        _;
    }
    modifier ifInList(address userAddress) {
        if (
            verifiedUser[userAddress] != true ||
            verifiedUser[userAddress] != false
        ) revert IS_NOT_IN_LIST();
        _;
    }

    constructor() {
        PKDRorg = msg.sender;
    }

    function createProfile(address userAddress, bool zkResult)
        external
        onlyPKDRorg
        ifUserExists(userAddress)
        returns (bool)
    {
        if (zkResult == true) {
            verifiedUser[userAddress] = zkResult;
            emit ProfileCreated(userAddress, zkResult);
            return true;
        } else {
            return false;
        }
    }

    function getVerifiedUser(address userAddress) external view returns (bool) {
        return verifiedUser[userAddress];
    }

    function revokeVerifiedUser(address userAddress)
        external
        onlyPKDRorg
        ifUserNotExists(userAddress)
        returns (bool)
    {
        verifiedUser[userAddress] = false;
        emit ProfileRevoked(userAddress);
        return true;
    }

    function retainVerification(address userAddress)
        external
        onlyPKDRorg
        alreadyVerified(userAddress)
        returns (bool)
    {
        verifiedUser[userAddress] = true;
        emit ProfileRetained(userAddress);
        return true;
    }
}
