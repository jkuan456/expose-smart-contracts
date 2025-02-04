// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract uniswapSwap {
    ISwapRouter public immutable swapRouter;
    event TokenBought(address token, uint256 amount);

    constructor(
        address _swapRouter
    ) {
        swapRouter = ISwapRouter(_swapRouter);
    }

    
    function buyToken(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) private returns (uint256 amountOut) {
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: 500,
            recipient: address(this),
            deadline: block.timestamp + 15,
            amountIn: amountIn,
            amountOutMinimum: 1,
            sqrtPriceLimitX96: 0
        });

        amountOut = swapRouter.exactInputSingle(params);
        emit TokenBought(tokenOut, amountOut);

    }

    function testBuyToken(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) public returns (uint256) {
        return buyToken(tokenIn, tokenOut, amountIn);
    }

}
