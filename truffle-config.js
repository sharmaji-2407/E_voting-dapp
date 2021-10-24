const path = require('path');
module.exports = {
  "type": "module",
  
  contracts_build_directory: path.join(__dirname,"client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  solc:{
    optimizer:{
      enabled: true,
      runs: 200
    }
  }
}
