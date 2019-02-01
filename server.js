const {createServer} = require('http');
const HDwalletProvider = require('truffle-hdwallet-provider');
const next = require('next');
const Web3 = require('web3');


const provider = new Web3.providers.HttpProvider("http://localhost:9543");

web3 = new Web3(provider);

const app = next({
    dev: process.env.NODE_ENV !=='production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);
//const contractAddress = "0x0035cDA889E5C0296b42d18FD1dB0B4802d0D642"




 app.prepare().then(() =>{
    createServer(handler).listen(3000 , (err) => {
        if(err) throw err;
        console.log('ready on localhost:3000');
    })
});