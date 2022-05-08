const hre = require("hardhat");

async function main() {
  const Silicon = await hre.ethers.getContractFactory("Silicon");
  const silicon = await Silicon.deploy();
  await silicon.deployed();
  console.log("Silicon deployed to:", silicon.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
