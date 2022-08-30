
const hre = require("hardhat");

async function main() {
  
  const VaccineTracker = await hre.ethers.getContractFactory("VaccineTracker");
  const vaccineTracker = await VaccineTracker.deploy();

  await vaccineTracker.deployed();

  console.log("VaccineTracker deployed to :"+ vaccineTracker.address);
  
  ;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
