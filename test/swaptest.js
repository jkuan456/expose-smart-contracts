const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniswapSwap Contract", function () {
  let uniswapSwap, owner;
  const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router on Polygon
  const WMATIC_ADDRESS = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Wrapped MATIC on Polygon
  const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"; // USDC on Polygon
  const AMOUNT_IN = ethers.parseUnits("1", 18); // Swap 1 MATIC (WETH)

  before(async () => {
    [owner] = await ethers.getSigners();

    const UniswapSwap = await ethers.getContractFactory("uniswapSwap");
    uniswapSwap = await UniswapSwap.deploy(SWAP_ROUTER);
    await uniswapSwap.waitForDeployment();
  
    // Get WMATIC contract
    const highWMATICAddress = "0xbAd24a42b621eED9033409736219c01bF0d8500F";

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [highWMATICAddress],
      });
    const richWMATIC = await ethers.getSigner(highWMATICAddress);
    
    const wmaticContract = await ethers.getContractAt("IERC20", WMATIC_ADDRESS);
    
    await wmaticContract.connect(richWMATIC).transfer(uniswapSwap.target, AMOUNT_IN);
    console.log("WMATIC transferred successfully!");
      
  });

  it("Should swap WMATIC to USDC", async function () {

    const tx = await uniswapSwap.testBuyToken(WMATIC_ADDRESS, USDC_ADDRESS, AMOUNT_IN);
    const receipt = await tx.wait();

    //console.log('Receipt:', receipt.logs);
    const eventSignature = ethers.id("TokenBought(address,uint256)");

    const event = receipt.logs.find(log => log.topics[0] === eventSignature);

    const [tokenOutOuput, amountOut] = event.args;

    console.log('Receipt:', amountOut);
    expect(amountOut).to.be.a('BigInt');
    expect(amountOut).to.be.greaterThan(0);
});
  
});
