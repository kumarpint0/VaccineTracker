const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaccineTracker", function () {

  beforeEach(async function(){
    const VaccineTracker = await ethers.getContractFactory("VaccineTracker");
    const vaccineTracker = await VaccineTracker.deploy();
    await vaccineTracker.deployed();

  });
  it("Should return a new VaccineTracker once deployed", async function () {
    const VaccineTracker = await ethers.getContractFactory("VaccineTracker");
    const vaccineTracker = await VaccineTracker.deploy();
    await vaccineTracker.deployed();

  });
  it("Should Register new participant", async function(){
    const VaccineTracker = await ethers.getContractFactory("VaccineTracker");
    const vaccineTracker = await VaccineTracker.deploy();
    await vaccineTracker.deployed();
    
    const addParticipantTx= await vaccineTracker.registerParticipant(
      "Pintu",
      0x39632F9E3233224804ba2c179D85fDcFd3138B03,
      "manufacturer"
    );
    await addParticipantTx.wait();

    expect(await vaccineTracker.viewParticipant(0)).to.equal( "Pintu",
    "0x39632F9E3233224804ba2c179D85fDcFd3138B03",
    "manufacturer");
  });
  it("Should add new vaccine", async function(){
    const VaccineTracker = await ethers.getContractFactory("VaccineTracker");
    const vaccineTracker = await VaccineTracker.deploy();
    await vaccineTracker.deployed();
    
    const addVaccinetTx= await vaccineTracker.registerParticipant(
      "dolo",
      "1234",
      123,
      1661831815,
      0
    );
    await addVaccinetTx.wait();

    expect(await vaccineTracker.viewVaccine(0)).to.equal("dolo",
    "1234",
    123,
    1661831815,
    0);
  });
  
});
