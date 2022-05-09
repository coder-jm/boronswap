// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Silicon is ERC20, Ownable {
    constructor() ERC20("Boron", "BRN") {
        _mint(msg.sender, 10000000000000000000000 * 10 ** decimals());
    }

    function mint(address to) public {
        _mint(to, 100000000000000000000);
    }

    function swap(address from, address to, uint256 amount) public {
       _transfer(from, to, amount * 1000000000000000000);
    }
}
