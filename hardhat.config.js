require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/SZN75Qfwxh0DUY1gJpSqG9MvYiybHmhm",
	      enabled: true,
      },
      chains: {
        137: {
          hardforkHistory: {
            london: 210096196,
          }
        }
      }

    }
  }
};
