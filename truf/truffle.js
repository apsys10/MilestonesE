module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
    development: {
    host: "localhost",
    port: 9543,
    network_id: "*" ,// Match any network id
    gas: 6000000,
    from: "0x04c677c7AB1c5bc0F769a03388f88e6BA735d8bD"
    }
    }
    };