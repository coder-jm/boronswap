import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Silicon from "./artifacts/contracts/Silicon.sol/Silicon.json";
const siliconAddress = "0x1E1186c0d2823ee85c9a535F40626542cC234643";

function App() {
  const [int, setInt] = useState(0);

  return (
    <div className="App">
      <nav>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/2051px-Uniswap_Logo.svg.png" />
        <ul>
          <li style={{ cursor: "pointer" }} onClick={(e) => setInt(0)}>
            Swap
          </li>
          <li style={{ cursor: "pointer" }} onClick={(e) => setInt(1)}>
            Faucet
          </li>
          <li><a href = "https://github.com/coder-jm/uniswap_clone" style = {{textDecoration:'none' , color: 'white'}}>Source</a></li>
          <li><a href = "https://dappfolio.netlify.app" style = {{textDecoration:'none' , color: 'white'}}>About</a></li>
        </ul>
        <div className = "net">
          <img src="https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png" style={{ width: "20px", height: "20px", marginRight: "10px", marginTop: "10px" }}></img><p className="net">Rinkeby</p>
          </div>
      </nav>
      <main>{int === 0 ? <SwapBox /> : <Faucet />}</main>
    </div>
  );
}

function SwapBox() {
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }


  async function swap() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const [user] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(siliconAddress, Silicon.abi, signer);
      const tx = await contract.swap(user, account , amount);
      await tx.wait();
      console.log(`${amount} Coins successfully sent to ${account}`);
    }
  }
  return (
    <div className="swap">
      <p>Swap</p>
      <input placeholder="0" onChange={(e) => setAmount(e.target.value)} />
      <input
        placeholder="0x... "
        onChange={(e) => setAccount(e.target.value)}
      />
      <button onClick={swap}>Swap</button>
    </div>
  );
}

function Faucet() {
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function faucet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const [user] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(siliconAddress, Silicon.abi, signer);
      const tx = await contract.mint(user);
      await tx.wait();
      console.log(`${100} Coins successfully sent to ${user}`);
    }
  }
  return (
    <div className="faucet">
      <h1 style={{ textAlign: "center" }}>Faucet</h1>
      <button onClick={faucet}>Get 100 BRN 🤯</button>
      <p style={{ color: "grey", textAlign: "center" }}>
        See your SLI tokens in your metamask wallet by importing the token and
        put this as token address - {siliconAddress}.
      </p>
    </div>
  );
}

export default App;
