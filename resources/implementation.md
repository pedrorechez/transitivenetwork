# Transitive Network Implementation

<p style="color:red"> DISCLAIMER: THE CODE IN THIS REPOSITORY IS A RESEARCH PROTOTYPE. PLEASE DO NOT USE IT IN PRODUCTION.</p>

## Introduction

This repository contains Ethereum smart contract code that is 
used in the Transitive Network.
The following sections provide information on how to setup the development environment for the code.
For more information about the contract code, please refer [this](./contract-usage.html) 
document.

## Getting Started

Ensure that `git` or `curl` is installed in your system.
Download the repository [here](https://github.com/pedrorechez/transitivenetwork/archive/v0.0.1.zip) and extract it:

```
$ curl https://github.com/pedrorechez/transitivenetwork/archive/v0.0.1.zip
$ unzip master.zip [directory_name]
```

OR

Clone the repository:

```
$ git clone https://github.com/pedrorechez/transitivenetwork/archive/v0.0.1.zip
```

### Dependencies

* NodeJS (v10.10.0)

Debian and it's derivatives can install NodeJS by running:

```
$ sudo apt-get update
$ sudo apt-get install nodejs npm
```

Arch Linux users can install NodeJS by running:
```

$ sudo pacman -S nodejs npm
```

After installing NodeJS, install the node modules in the project root folder using the Node Package Manager (npm):

```
$ npm install truffle 
$ npm install ganache-cli
```

Note: Run `ganache-cli` in the project root folder. 
This should instantiate a test ethereum network. 
Note the address where the test network is hosted, for 
eg `http://localhost:8545`. 
If the port used is not 8545 which is the default port, use 
the port displayed and edit the port value in 
`/transitive-network-src/truffle.js`.

### Example usage

The contracts are located in `/transitive-network-src/contracts/`.
`cd` into truffle root directory at `/transitive-network-src/`.

Compile:

```
$ # Compiles all the contracts in contracts/
$ truffle compile 
```

Test:

```
$ truffle test test/TEST_SUITE.js 
# See the test/ folder for different test suites
```

Alternatively, you can use the console provided by truffle to compile, deploy and test contracts:

```
$ truffle console
truffle(development)> compile --compile-all
truffle(development)> compile
truffle(development)> migrate --migrate-reset
truffle(development)> migrate
truffle(development)> test test/TEST_SUITE.js
truffle(development)> exit

$ # These are example commands. The order has no special meaning.
```

Warning: When testing/building the smart contract, always 
ensure that the test network is up and running.

## Contact

For more information on 
* Contract usage: [Implementation](./contract-usage.html)
* Truffle: [Documentation](https://truffleframework.com/docs)
* Ganache-cli: [Github Repository](https://github.com/trufflesuite/ganache-cli)
* NodeJS: [Docs](https://nodejs.org/en/docs/)

If there are any bugs or questions, please raise an issue in the repository. 

Website: [transitive.network](http://transitive.network)
