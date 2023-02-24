import { assert, expect, use } from "chai";
import { Contract } from "ethers";
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

describe("Profiles Contract", async () => {
  let profilesContract: Contract;
  const [owner, userOne, userTwo] = await ethers.getSigners();

  beforeEach(async () => {
    const Profiles = await ethers.getContractFactory("Profiles");
    profilesContract = await Profiles.deploy();
    await profilesContract.deployed();
  });

  describe("createProfile", () => {
    it("should create a profile of a given address in a mapping of a struct", async () => {
      await profilesContract.connect(owner).createProfile(userOne.address);
      const isVerified = await profilesContract.users(userOne.address);
      assert.equal(isVerified.verificationStatus_I, true);
    });
  });

  describe("retainVerification", () => {
    it("should retain verification of a user", async () => {
      await profilesContract.connect(owner).createProfile(userTwo.address);
      await profilesContract.connect(owner).retainVerification(userTwo.address);
      const isRevoked = await profilesContract.users(userTwo.address);
      assert.equal(isRevoked.isStatusRevoked, false);
    });
  });

  describe("revokeVerifiedUser", () => {
    it("should revoke the verification status of a user", async () => {
      await profilesContract.connect(owner).createProfile(userOne.address);
      await profilesContract.connect(owner).revokeVerifiedUser(userOne.address);
      const isRevoked = await profilesContract.users(userOne.address);
      assert.equal(isRevoked.isStatusRevoked, true);
    });
  });

  describe("retainMultiSignature", () => {
    it("should retain multi signature of a user", async () => {
      await profilesContract.connect(owner).createProfile(userOne.address);
      await profilesContract
        .connect(owner)
        .retainMultiSignature(userOne.address);
      const isRetained = await profilesContract.users(userOne.address);
      assert.equal(
        isRetained.multiSig,
        "0x4c4d4e4f4f4b0000000000000000000000000000000000000000000000000000"
      );
    });
  });

  describe("revokeMultiSignature", () => {
    it("should revoke multi signature of a user", async () => {
      await profilesContract.connect(owner).createProfile(userTwo.address);
      await profilesContract
        .connect(owner)
        .revokeMultiSignature(userTwo.address);
      const isRevoked = await profilesContract.users(userTwo.address);
      assert.equal(
        isRevoked.multiSig,
        "0x4e554c4c00000000000000000000000000000000000000000000000000000000"
      );
    });
  });

  describe("revokeZkVerification", () => {
    it("should revoke zk verification of a user", async () => {
      await profilesContract.connect(owner).createProfile(userOne.address);
      await profilesContract
        .connect(owner)
        .revokeZkVerification(userOne.address);
      const isRevoked = await profilesContract.users(userOne.address);
      assert.equal(isRevoked.verificationStatus_II, false);
    });
  });

  describe("retainZkVerification", () => {
    it("should retain zk verification of a user", async () => {
      await profilesContract.connect(owner).createProfile(userTwo.address);
      await profilesContract
        .connect(owner)
        .retainZkVerification(userTwo.address);
      const isRetained = await profilesContract.users(userTwo.address);
      assert.equal(isRetained.verificationStatus_II, true);
    });
  });
});
