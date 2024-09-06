import React, { useState } from 'react';
import web3 from '../web3';
import contract from '../smartContract';

function ContractInteraction({ account }) {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const handleContractInteraction = async () => {
    try {
      const result = await contract.methods.yourMethod(input).send({ from: account });
      setResponse(result);
    } catch (error) {
      console.error("Error interacting with contract", error);
    }
  };

  return (
    <div className="contract-interaction">
      <h3>Interact with Smart Contract</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleContractInteraction}>Submit</button>
      <div>
        <h4>Response:</h4>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default ContractInteraction;
