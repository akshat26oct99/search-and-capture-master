import React, { useState } from 'react';
import web3 from '../web3';

function ConnectWallet({ setAccount }) {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Could not connect to wallet", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connect-wallet">
      <button onClick={connectWallet} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
}

export default ConnectWallet;
