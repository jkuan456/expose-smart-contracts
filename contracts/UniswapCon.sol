// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./readGmx.sol";
import "./gmxExchangeRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract uniswapSwap {
    ISwapRouter public immutable swapRouter;

    constructor(
        address _swapRouter,
    ) {
        swapRouter = ISwapRouter(_swapRouter);
    }

}
