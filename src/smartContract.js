import web3 from './web3';

// Replace with your smart contract's ABI and address
const contractABI = []; // Replace with actual ABI
const contractAddress = '0x894754a9D0A6B884Eb8094b7E6a14297F6500c2D'; // Replace with actual contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;
