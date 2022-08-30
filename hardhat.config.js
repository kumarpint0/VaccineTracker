require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "1ylk_Ttc9T4tKKpHDU0cagsOu0-Ycw3f";
const PRIVATE_KEY = "d0496dd5e6e8d7d7dbcad827a1c77fe5f3e5ead7d851ece8db388fd4bace00de";

module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    hardhat:{
      chainID:31337
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/JjqID7WJRYIyGCMuSIs9abRB6Hp5Z6zp",
      accounts: [PRIVATE_KEY]
    }
  }
};
