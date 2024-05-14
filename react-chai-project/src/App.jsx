import { useState, useEffect } from 'react';
import abi from './contractjson/chai.json';
import { ethers } from 'ethers';
import './App.css';
import Buy from './components/Buy';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState('Not Connected');

  useEffect(() => {
    const template = async () => {
      try {
        const contractAddress = "0x473232a384054ABECB64c786e652e2D04a68b19f";
        const contractABI = abi.abi;

        // Check if ethereum object is available
        if (!window.ethereum) {
          console.error('Ethereum object not found');
          return;
        }

        const { ethereum } = window;

        // Requesting accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Setting the first account as the current account
        setAccount(accounts[0]); // Assuming accounts[0] is the current account

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.error('Error in template:', error);
      }
    };
    template();
  }, []);

  return (
    <div className="App">
      Connected account: {account}
      <Buy state={state} />
    </div>
  );
}

export default App;
