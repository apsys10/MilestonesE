import web3 from './web3';
//import CampaignFactory from './build/CampaignFactory.json';

const abi =   [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployedCampaigns",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x339d50a5"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "minimum",
        "type": "uint256"
      },
      {
        "name": "forWho",
        "type": "address"
      },
      {
        "name": "CampaignName",
        "type": "string"
      },
      {
        "name": "des",
        "type": "string"
      },
      {
        "name": "goal",
        "type": "uint256"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x44b0c856"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDeployedCampaigns",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x4acb9d4f"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "b",
        "type": "address"
      }
    ],
    "name": "getMyCampaigns",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x64c90966"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "remove",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x4cc82215"
  }
]   
  


const address = "0xb4049d6b71612E866187AD1D465651A52B3B7D7F";
let instance = new web3.eth.Contract(abi,address);
export default instance;