import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider("http://localhost:9543");

const web3 = new Web3(provider);

web3.eth.net.isListening()
   .then(() => console.log('is connected'))
   .catch(e => console.log('Something went wrong'));

   
 

export default web3;