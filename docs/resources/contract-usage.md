#  Transitive Network Smart Contract Usage Notes

## Working with the smart contract - I

Enter the truffle development console environment.

```
$ truffle console
```
Compile the contract. Running `compile` compiles the contract if it has been modified since the last compilation process. This can be overridden by running `compile --compile-all`

```
truffle(development)> compile 
Compiling ./contracts/CreditNetwork.sol...
Compiling ./contracts/Migrations.sol...

Writing artifacts to ./build/contracts

truffle(development)>
```

Migrations push the contract into the test blockchain and provides a contract abstraction that is easier to work with.
`migrate` migrates newly compiled contracts. You can forcefully re-migrate contracts if you want to start again or update the contract abstraction by running `migrate --reset`. Note that just by compiling the contract, the contract abstraction is not updated.

```
 truffle(development)> migrate
Using network 'development'.

Running migration: 2_deploy_contracts.js
  Deploying CreditNetwork...
  ... 0xf6447606db69b6242657a6ef896b1b994ddf34ee9fe6f9d0adb4fb13641afa19
  CreditNetwork: 0xc7ba6ff529109d9309a8a52a2061dbebea5ebebc
Saving successful migration to network...
  ... 0x073cd723a181b39d1e866e515a63749f8a5ba8adceb5529e4e1b6f0270da12cd
Saving artifacts...
truffle(development)> 
```

Now that migration is complete we have access to a contract abstraction.
This can be accessed using the contract variable defined in `deploy_contracts.js`. In this case, the variable is `CreditNetwork`.

```
truffle(development)> CreditNetwork.address
'0xc7ba6ff529109d9309a8a52a2061dbebea5ebebc'
truffle(development)>
```
The contract abstraction can be used to obtain instances of the credit network using the standard promise framework of NodeJS.

```
truffle(development)> CreditNetwork.deployed().then((instance)=>{networkInstance=instance;})
'undefined'
truffle(development)>
```
In the above example, `networkInstance` gives us access to the contract instance and we can call the contract functions by running `networkInstance.addNode()`.

We can dry run the contract by calling the function name with the necessary parameters.

```
truffle(development)>networkInstance.addNode.call({from: web3.eth.accounts[0]})
[]
truffle(development)>
```

This is not logged to the blockchain and therefore it does not change the state of the blockchain.

To call a function that changes the state of the blockchain, omit the `call` function.

```
truffle(development)>networkInstance.addNode({from:web3.eth.accounts[0]})
{ tx:
   '0xb88b4ce99905f2bc546386b689236396bc6763debca638b65988b9dc207299a8',
  receipt:
   { transactionHash:
      '0xb88b4ce99905f2bc546386b689236396bc6763debca638b65988b9dc207299a8',
     transactionIndex: 0,
     blockHash:
      '0x5d9e79373e3974417dc247800a50930196d0d5887f2b15feb47e1ffa35e8bd2b',
     blockNumber: 59,
     gasUsed: 43466,
     cumulativeGasUsed: 43466,
...
truffle(development)>
```

The JSON structure passed into the function can be used to select the source of the transaction, the amount of ETH to be sent along with the tx for debug purposes.

## Working with the smart contract - II 

There is an alternative to automate the contract setup.
One can make use of the truffle testing framework to write cleaner calls to functions and use more advanced features without having to worry about the compilations and migrations.

The `/transitive-network-src/test/` contains some example test cases.
The examples make use of the async/await feature of Node(v8.0.0 or greater).
Truffle's testing framework automatically compiles and migrates the contract and
provides a contract abstraction to the test script.

## Overview of the contract functions

The TransitiveNetwork smart contract provides several functions some of which are helper functions and some of which change the state of the contract.

### Helper Functions
These functions do not change the state of the contract, and therefore can be utilized by clients to query the state of the contract.

#### checkNode

This function checks if the caller of the function is registered, i.e present as node in the network.

```
truffle(development)>networkInstance.checkNode('0xd966959d250e15e76fa0ea73a6917e93a397bd33')
true
truffle(development)>
```

#### checkLink

Given an index of the link, this function checks if the link index is valid.

```
truffle(development)> networkInstance.checkLink('0xe3eacbb70be34d8e5aad4751036ffc57afec309b')
true 
truffle(development)>
```

#### viewLink

Given address of two users and the currency ID this function returns the index of the link between the two addresses of the given currency ID or fails if it does not exist.

```
truffle(development)> networkInstance.viewLink(web3.eth.accounts[0],web3.eth.accounts[1],1)
'0xe3eacbb70be34d8e5aad4751036ffc57afec309b'
truffle(development)>
```

#### linkInfo (deprecated)

This function is a debug function to check the values of the links when given the index of the link.

Note: This function will be removed without notice.

```
truffle(development)> networkInstance.linkInfo('0xe3eacbb70be34d8e5aad4751036ffc57afec309b')
[ '0xd966959d250e15e76fa0ea73a6917e93a397bd33',
  '0x42a069be404ff4274ba1e8837923584d63660b8a',
  BigNumber { s: 1, e: 0, c: [ 0 ] },
  BigNumber { s: 1, e: 2, c: [ 100 ] },
  BigNumber { s: 1, e: 0, c: [ 1 ] },
  BigNumber { s: 1, e: 0, c: [ 0 ] },
  BigNumber { s: 1, e: 0, c: [ 1 ] },
  BigNumber { s: 1, e: 0, c: [ 1 ] } ]
truffle(development)>
```

#### getOfferBy

Given the indices of two links and the address of the exchange node, this function retrieves the exchange offer index for the given links.

```
truffle(development)> networkInstance.getOfferBy('0xe3eacbb70be34d8e5aad4751036ffc57afec309b','0x8fda202d426380ae5a87a048be49f4f9cc629f12',web3.eth.accounts[1])
'0xe6af1dc2d22c34e06f98cbccfc1b96a5632c7536'
truffle(development)>
```

### Core Functions

These functions are the core functions of the smart contract and they change the state of the contract. 

#### addNode
The registration function is used to add a user(sender of the function call tx) as a node to the transitive network graph.

```
truffle(development)>networkInstance.addNode({from:web3.eth.accounts[0]})
{ tx:
   '0x9ebba5e18923a4ee67624fa13c035a7a2b874e06cf5c7175e4b9792958f3afbb',
  receipt:
   { transactionHash:
      '0x9ebba5e18923a4ee67624fa13c035a7a2b874e06cf5c7175e4b9792958f3afbb',
     transactionIndex: 0,
     blockHash:
      '0xec9a9c9aeb50bc27e1b63d58af2dde62286e8f9396decc00fd6a3a24676808ee',
...
truffle(development)>
```

#### createLink 
The link creation function is used to create a link between two nodes in the network. The link is created by the node B which is extending it's trust to the other node A. This means the link is A->B. Since B is extending it's trust, the function can only be invoked by B. The parameters for this function include

```
truffle(development)>networkInstance.createLink(1, web3.eth.accounts[0],100,true,1,{from:web3.eth.accounts[1]})
{ tx:
   '0x2964e68179acb55f61531edb1d3b1dacdcc7872352101415ffdc85b76428f708',
  receipt:
   { transactionHash:
      '0x2964e68179acb55f61531edb1d3b1dacdcc7872352101415ffdc85b76428f708',
     transactionIndex: 0,
     blockHash:
      '0xc5a2dd8071246e6bdfb10475abbaecb86ffebbe0e9b7b401d1322e2d08283050',
...
truffle(development)>
```
This creates a link from `accounts[0]` to `accounts[1]`.

#### updateLink: 

The link updation function takes the index of the link and updates the link 
fields for the caller. For a link from A to B (A->B), A can update it's 
fees and rippling flags. However, B can update it's fees, rippling flags 
and the credit limit.

```
truffle(development)> networkInstance.updateLink('0xe3eacbb70be34d8e5aad4751036ffc57afec309b',100,true,10,{from:web3.eth.accounts[0]})
{ tx:
   '0xf11ab689a5ae12bc311d20ce35c90bd11a5aa79dc9486e0a90a99c24794ed0b9',
  receipt:
   { transactionHash:
      '0xf11ab689a5ae12bc311d20ce35c90bd11a5aa79dc9486e0a90a99c24794ed0b9',
     transactionIndex: 0,
     blockHash:
      '0x1722be74dcad2ce64e8070548bd36f68a4924f5f5e703f8dbff4d6f565b1dfd8',
     blockNumber: 62,
...
truffle(development)>
```

#### creditNetworkPay:

This function takes as parameters the address of the payment receiver, 
the amount to be paid, four arrays of link indices each array indicating 
the path to take for the payment.

```
truffle(development)> networkInstance.creditNetworkPay(web3.eth.accounts[2],5,['0x67767782696ad30a11789557da1446f033dcccb0'],[],[],[], {from:web3.eth.accounts[0]})
{ tx:
   '0xc0f6f92b241eb6229a8c669907689980ff61bb46264b12a20b7d6a3f4aa33ddb',
  receipt:
   { transactionHash:
      '0xc0f6f92b241eb6229a8c669907689980ff61bb46264b12a20b7d6a3f4aa33ddb',
     transactionIndex: 0,
     blockHash:
      '0xdc4cd3149039c50f2379cacd84017595a4c41d879a0f4e7742c9b1eb51a38ec8',
...
truffle(development)>
```

#### addOffer: 

This function takes as input the two links to setup an exchange, the amount 
in the input currency for the first link and the amount in the output link 
for the second currency and creates an exchange offer for the two links.

```
truffle(development)> networkInstance.addOffer('0xe3eacbb70be34d8e5aad4751036ffc57afec309b','0x8fda202d426380ae5a87a048be49f4f9cc629f12',1,2,{from:web3.eth.accounts[1]})
{ tx:
   '0xcd4534b2ec5f756f731770fd29caefd4f29cce37ef2aa82b23d30e3c93a98a36',
  receipt:
   { transactionHash:
      '0xcd4534b2ec5f756f731770fd29caefd4f29cce37ef2aa82b23d30e3c93a98a36',
     transactionIndex: 0,
     blockHash:
      '0xcaa7c77bf1a72da8d9ff481527fa46eefef57e8e80bb855d1c1d3d41f4b9b8fc',
...
truffle(development)>
```

#### cancelOffer: 

This function cancels an existing active offer. It takes the offer index as its parameter.

```
truffle(development)> networkInstance.cancelOffer('0xe6af1dc2d22c34e06f98cbccfc1b96a5632c7536',{from:web3.eth.accounts[1]})
{ tx:
   '0x2c9d60a8ea65d0561026b8ee3b030bea1af1573433cf26239f4415d36d5e6cb9',
  receipt:
   { transactionHash:
      '0x2c9d60a8ea65d0561026b8ee3b030bea1af1573433cf26239f4415d36d5e6cb9',
     transactionIndex: 0,
     blockHash:
      '0x9848cec2c23f1141476a877e4c8fb83431ff4650e76c613e22d50f8e0ee741f8',
...
truffle(development)>
```

## Events

Events are logs output by the contract when the state of the graph changes.
These can be used to subscribe to changes in the graph.
Ethereum provides APIs to create filters and obtain event data.

* __NewNodeRegistration__: When a new node joins the network
* __NewLinkSetup__: When a new link is created
* __CancelOrder__: When an exchange offer is cancelled
* __UpdateLink__: When a link's fields are updated
* __Pay__: When a payment is done through the transitive network
* __NewOrder__: When an exchange offer is setup