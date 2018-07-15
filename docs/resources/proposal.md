# Transitive Network

## Team 

### Biographies
**[Aniket Kate](https://www.cs.purdue.edu/homes/akate/)** is an assistant Professor in the computer science department at Purdue university. Before joining Purdue in 2015, he was a junior faculty member and an independent research group leader at Saarland University, Germany. He completed his postdoctoral fellowship at Max Planck Institute for Software Systems (MPI-SWS), Germany in 2012, and received his PhD from the University of Waterloo, Canada in 2010. His research integrates cryptography, distributed computing, and data-driven analysis to solve people-centric security/privacy problems in decentralized environments. For the last five years, he has been focusing on security, privacy and applicability of blockchain technology. For more details, visit the [projects webpage:](https://freedom.cs.purdue.edu/blockchains/)


**[Pedro Moreno-Sanchez](https://www.cs.purdue.edu/homes/pmorenos/)** will be joining TU Wien as post-doctoral researcher in September 2018. He received his Ph.D. in the department of computer science at Purdue University in May 2018. He worked as a research assistant under the supervision of Prof. Aniket Kate. His doctoral research focused on the study and design of secure, privacy-preserving and decentralized credit networks. Pedro received a B.S. degree and M.S. degree in computer science from Universidad de Murcia in 2011 and 2013 respectively. 

### Location
* Purdue University, USA
* TU Wien, Austria

### Experience and Qualification
Aniket Kate and Pedro Moreno-Sanchez have built several research projects associated with security, privacy and availability of (decentralized) payment channel networks as well as IOweYou credit networks. Recently, in [MMKMR’17] we develop the notions of security and privacy in payment-channel networks (e.g., Lightning Network) formally and establish fundamental tradeoffs such as the impossibility of achieving strong privacy and concurrency in a payment-channel network. We also develop two new protocols of payment-channel networks called Fulgor and Rayo that provide a tradeoff between privacy and concurrency guarantees while preserving compatibility with the hash-timelock mechanism already developed in Lightning Network and Raiden Network. In the recent follow-up work [MMSKM’18], we describe a set of cryptographic functions that describe lock mechanisms alternative to hash-timelock that provide better performance, reduced transaction size and interoperability among different payment-channel networks. An implementation of this techniques would allow, for instance, to overcome the current interoperability challenge between Lightning Network and Raiden Network as the first relies on SHA2 and the latter uses SHA3 in the hash-timelock contract. This proposal has been very well-received (see https://twitter.com/pedrorechez/status/999129461156204544 and https://twitter.com/bitconner/status/999164124666904582) and it is currently getting incorporated in the lighting network developement (see https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-May/001244.html) Previously, we demonstrated the possibility of having a credit network (e.g., Ripple or Stellar) that does not require to store every single transaction in a publicly available ledger [MMKM’17]. Our proposed architecture, SilentWhispers, paves the way to have off-chain transactions in credit networks while minimally relying on a ledger to resolve credit disputes among pairs of users or facilitate the routing functionality. Apart from these highly relevant works, we have developed the series of works CoinShuffle [RMK’14], CoinShuffle++ [RMK’17] and ValueShuffle [RM’17] to improve the anonymity of transactions in Bitcoin. We have presented PrivPay [MKMP’15] and PathShuffle [MRK’17] protocols to perform privacy-preserving transactions in credit networks such as Ripple. Finally, we have thoroughly studied the security [MMSKF’18] and privacy issues [MZK’16] with current credit networks as well as the possible alternatives for the routing of transactions in payment-channel networks [RMKG’18]. Our team does not only have significant academic impact in the blockchain space but also has practical experience. On of the incoming PhD students to work on the project, Adithya Bhat, has participated in projects where he have modified the Solidity compiler to add new functionalities and widely used cryptographic libraries as well as the Ethereum client go-ethereum to add native code. Additionally, he has experience in writing smart contracts in Solidity to execute business logics. Finally, he also has experience in testing frameworks and tools such as truffle, geth, cpp-ethereum, testrpc or pyethereum. 

## Project Description

### Project Type
Scalability

###  Summary of Proposal and Impact
In this project, we plan to build the Transitive Network [Transitive.Network], a layer-2 payment network aiming to congregate the functionality of credit networks (e.g., IOweYou debt links in Ripple) and payment-channel networks (e.g., Lightning Network) without requiring any new token. The Transitive Network will be thereby a complementary scalable blockchain approach with key advantages in terms of performance, economic cost and security and privacy guarantees. The Transitive Network will thus provide Ethereum with a tool to attract the businesses currently associated to Bitcoin and Ripple, first and third cryptocurrencies in the current market capitalization, while avoiding the unnecessary tokenization introduced by the proposals like Raiden. 

### Proposal and Impact
In this project we plan to build Transitive.Network, a tokenless layer-2 payment network complementary to current scalable blockchain approaches with key advantages in terms of performance, economic cost and security and privacy guarantees. Towards this goal, we envision a modular approach and divide the project in three main modules, each of which is at the same time divided in tasks as described below. 

#### Module A: A tokenless on-chain credit network in Ethereum.

*Motivation:* The current deployments of credit networks such as Ripple and Stellar rely on centralized token (XRP and XLM respectively) for it to operate. Such tokens are not only overpriced today, but also unnecessary for most path-based transactions. This has significantly limited the accessibility of users to the system. Moreover, the almost complete control that Ripple and Stellar have over the consensus mechanism, fungibility has been an issue in practice; e.g., one of Ripple originator was not allowed to sell his XRP shares through artificial path-based transaction restrictions. (see https://cointelegraph.com/news/ripple-directs-bitstamp-to-freeze-funds-of-former-co-founder-jed-mccaleb) An alternative credit network built as a smart contract in Ethereum with advantages in terms of reduced costs and improved security, privacy, and availabilty guarantees will attract the business of the third cryptocurrency today. 

*Goal:* Build an alternative credit network as an Ethereum smart contract that provides the all important functionality as currently deployed IOweYou credit networks without any new token but with several advantages in terms of performance and cost efficiency. 
*Methodology:* We build SmartCN: a smart contract for credit networks (Task A.1); we test SmartCN (Task A.2); we document the complete process (Task A.3); 

**Task A.1: Building SmartCN: A smart contract for credit networks.** As a first step, we plan to develop the functionality of a credit network as a smart contract in Ethereum. Our main focus during this development is to optimize of the code and to reduce cost in terms of gas. We aim thereby to provide a tool that can reach a wider user base. We additionally plan to provide key functionalities for a credit network as outsourced services. For instance, the key yet challenging routing functionality can be designed as an outsourced service that users pay in order to get a route for their intended transaction. This modular approach paves the way for building an ecosystem of services that complement each other. 

**Task A.2: Testing SmartCN.** In this second task, we plan to build thorough test suites with the goal of understanding the costs of our solution, possible further optimizations to reduce such cost and overall, ensure the correctness of the implemented functionality. Additional test efforts will be directed towards checking the effectiveness and correctness of the outsourced routing functionality. 

**Task A.3: Documenting SmartCN.** In this third task, we propose to have a thorough documentation of the tool and test results. In particular, we plan to focus on studying and documenting the benefits of SmartCN with respect to currently deployed alternative credit networks such as Ripple or Stellar. This task is in fact important and will set this project apart from several other applications that lack documentation, hindering thereby its deployment and its widespread usage. 

**Preliminary Results.** We have prototyped, in an Ethereum contract, the key operations available in a credit network (e.g., Ripple). Our current preliminary results show that key operations such as creating a node and creating IOweYou credit links between nodes is cheaper in Ethereum, costing only few USD cents instead of several USD in Ripple. Additionally, cost for multi-hop transactions remain within the range of other smart contracts in Ethereum. Although our current ongoing prototype has plenty of room for improvements, it already shows potential to operate as a credit network in Ethereum that will bring the attention and business from current credit networks such as Ripple or Stellar. 

#### Module B: A tokenless and scalable credit network in Ethereum. 

*Motivation:* Building on our research experience with SilentWhispers [MMKM’17] and routing techniques [RMKG’18], this module will focus on extending SmartCN to provide a scalable credit network by enabling off-chain transactions as described in SilentWhispers. In particular, the challenge comes in the handling payment paths where some of the users are offline. An additional challenge consists on routing transactions in such decentralized setting. In this module we plan to overcome these challenges and build the Transitive Network. 

*Goal:* Build the first stage of the Transitive Network. 

*Methodology:* We build the Transitive Network (Task B.1); we test the Transitive Network (Task B.2); we document the processes in the two previous tasks (Task B.3); 

**Task B.1: Build first stage of the Transitive Network.** Inspired from SilentWhispers and the experiences from Task A.1, we plan to implement the first stage Transitive Network. At this point, the Transitive Network can be seen as a ``lightning-network’’ like approach for credit networks. In doing so, we have to tackle two main challenges: (i) Handling the credit links of users that go offline; (ii) Finding paths in the absence of a publicly complete register of all credit links and transactions in the blockchain. The ongoing research at our team has produced preliminary results for both challenges [MMKM17, RMKG18] that we plan to expand and implement in this task. 

**Task B.2:** Testing the Transitive Network. In this task we plan to build test suites to test the correctness and efficiency of this first stage of the Transitive Network. The main challenge here consists in combining on-chain information (e.g., setup of a credit link between two users) and off-chain activity (e.g., multi-hop transaction among online users). We plan to re-use the test suite created in task A.1 and extend it to account for off-chain activity. 

**Task B.3:** Documenting the Transitive Network. In this third task, we propose to extend the documentation of SmartCN obtained from task A.3, to keep a reference document that compiles a detailed description of the processes involving the Transitive Network. 


#### Module C: Extensive, tokenless and scalable Transitive Network in Ethereum. 

*Motivation:* IOweYou Credit networks (e.g., Ripple) and payment-channel networks (e.g., Lightning Network) share a few similarities. For instance, both of them are based on a network graph where nodes represent users and edges represent an economic relation between users. Moreover, payments are carried out through a path in such a graph from the sender to the receiver. However, there are also conceptual differences. For instance, while a link in a credit network defines credit between the two counterparties, a link in the LN defines the amount of coins (i.e., debit) that one user has committed to pay to the other. Therefore, the combination of these two conceptually different networks is not straightforward and yet an interesting and breakthrough approach to attract more business into the Ethereum environment. 

*Goal:* Build an extended Transitive Network that supports both credit network and lightning network. 

*Methodology:* Studying challenges and provides solutions for the integration between credit links and payment channels (Task C.1); extend the implementation of the Transitive Network (Task C.2); test the Transitive Network (Task C.3); document the processes in the previous tasks (Task C.4). 

**Task C.1: Research the combination of credit links and payment-channels.** We plan to research the challenges inherent to the integration of the conceptually different credit links and payment channels. This research task will contribute solutions to those challenges that have been understudied so far. 

**Task C.2: Building an extensive Transitive Network.** In this task, we plan to extend the software package constructed in Task B.1 with the research results from task C.1. In this manner, the Transitive Network will become among the first networks that effectively combine credit network and lightning network, two successful applications that, however, have operated in an isolated fashion so far. 

**Task C.3: Test suite for the Transitive Network.** In this task we plan to extend and complete the test suite started in task C.2. We thereby plan to have a complete and exhaustive test suite to account for the efficiency and correctness of the contributed software. Additionally, as in the rest of modules, we will also focus in the efficiency of our solutions not only in terms of computation or memory overhead, but also in terms of monetary costs (e.g., gas consumption). Task C.4: Full documentation of the Transitive Network. In this task, we plan to extend the documentation produced in previous tasks A.3 and B.3 with the results of Tasks C.1-3 defined in this module. As aforementioned, we plan to provide a fully documented piece of software aiming to obtain a wider deployment and ease the usage from non-technical users. 

## Timeline and Milestones

###Timeline
* Module A: Beginning - Month 6 
  * Task A.1: Beginning - Month 5 
  * Task A.2: Month 3 - Month 5 
  * Task A.3: Month 5 - Month 6 
* Module B: Month 7 - Month 14 
	* Task B.1: Month 7 - Month 13 
	* Task B.2: Month 10 - Month 13 
	* Task B.3: Month 13 - Month 14 
* Module C: Month 15 - Month 24 
	* Task C.1: Month 15 - Month 18 
	* Task C.2: Month 18 - Month 22 
	* Task C.3: Month 20 - Month 22 
	* Task C.4: Month 23 - Month 24 


### What milestone can be achieved in the next 3-6 months?
We plan to have completed Module A by the end of the month 6 of the project. In particular, after 6 months we plan to deliver the implementation of SmartCN, along with an extensive test suite and documentation.

### How can the Ethereum Foundation best support this project?

The Ethereum Foundation can greatly help the development of this project by providing connections and outreach. Our research and development effort can greatly benefit from exposition to the interested Ethereum communities and other blockchain-related crowds. To achieve that, we believe that Ethereum Foundation can be of great help by advertising the progress and achievement of this project and introducing our academic to the related events. We could thereby present the results and ongoing efforts to attract a wider range of users and businesses. 


### Total Project Budget

The total budget of the project is 250,000 USD. Funding will be mostly used for funding one PhD student each at Purdue University and TU, Vienna. At both universities, a PhD costs around 55,000USD per year. PhD student at Purdue will start working from August 2018, and will work for two full years, while the PhD student at TU Vienna will start from January 2019 semester, and will work for 18 months. The total PhD student RA amount will be 192,500USD. The project will also involve a post-doctoral fellow at Purdue, and require to fund four months of post-doc salary requiring 30,000 USD for that. 15,000 USD will be required for travel, which will involve in-person visit between project personnel as well as attending the blockchain conference to disseminate the knowledge, while the rest 12,5000 USD be necessary to buy hardware as well as getting enough Ether to initiate the project. 

### Requested Amount

250000 USD

## List of References

* [TransitiveNetwork] Transitive Network Website. http://transitive.network/ (Accessed June 2018) 
* [MMSKM’18] Giulio Malavolta, Pedro Moreno-Sanchez, Clara Scheidewind, Aniket Kate and Matteo Maffei. “Multi-Hop Locks for Secure, Privacy-Preserving and Interoperable Payment-Channel Networks”. In submission 2018. https://eprint.iacr.org/2018/472 (Accessed June 2018) 
* [MMSKF’18] Pedro Moreno-Sanchez, Navin Modi, Raghuvir Songhela, Aniket Kate and Sonia Fahmy. “Mind Your Credit: Assessing the Health of the Ripple Credit Network”. In World Wide Web Conference (WWW) 2018. https://arxiv.org/abs/1706.02358 (Accessed June 2018) 
* [RMKG’18] Stefanie Roos, Pedro Moreno-Sanchez, Aniket Kate and Ian Goldberg. “Settling Payments Fast and Private: Efficient Decentralized Routing for Path-Based Transactions”. In Networks and Distributed Systems Security Symposium (NDSS) 2018. https://arxiv.org/abs/1709.05748 (Accessed June 2018) 
* [MMKMR’17] Giulio Malavolta, Pedro Moreno-Sanchez, Aniket Kate, Matteo Maffei, and Srivatsan Ravi. “Concurrency and Privacy with Payment-Channel Networks”. In Conference of Computers and Communication Security (CCS) 2017. https://eprint.iacr.org/2017/820.pdf (Accessed June 2018) 
* [MMKM’17] Giulio Malavolta, Pedro Moreno-Sanchez, Aniket Kate, and Matteo Maffei. “SilentWhispers: Enforcing Security and Privacy in Decentralized Credit Networks”. In Networks and Distributed Systems Security Symposium (NDSS) 2017.https://eprint.iacr.org/2016/1054.pdf (Accessed June 2018) 
* [RMK’17] Tim Ruffing, Pedro Moreno-Sanchez, and Aniket Kate. “P2P Mixing and Unlinkable Bitcoin Transactions“. In Networks and Distributed Systems Security Symposium (NDSS) 2017. https://eprint.iacr.org/2016/824 (Accessed June 2018) 
* [RM’17] Tim Ruffing, and Pedro Moreno-Sanchez. “Mixing Confidential Transactions: Comprehensive Transaction Privacy for Bitcoin”. In Bitcoin Workshops (BITCOIN) 2017. https://eprint.iacr.org/2017/238.pdf (Accessed June 2018) 
* [MRK’17] Pedro Moreno-Sanchez, Tim Ruffing and Aniket Kate. “PathShuffle: Mixing Credit Paths for Anonymous Transactions in Ripple”. In Privacy Enhancing Technologies Symposium (PETS) 2017. https://www.cs.purdue.edu/homes/pmorenos/public/pathshuffle.pdf (Accessed June 2018) 
* [MZK’16] Pedro Moreno-Sanchez, Muhammad B. Zafar and Aniket Kate. “Listening to Whispers of Ripple: Linking Wallets and Deanonymizing Transactions in the Ripple Network”. In Privacy Enhancing Technologies Symposium (PETS) 2016. http://crypsys.mmci.uni-saarland.de/projects/LinkingWallets/paper.pdf (Accessed June 2018) 
* [MKMP’15] Pedro Moreno-Sanchez, Aniket Kate, Matteo Maffei and Kim Pecina. “Privacy Preserving Payments in Credit Networks”. In Networks and Distributed Systems Security Symposium (NDSS) 2015. https://crypsys.mmci.uni-saarland.de/projects/PrivPay/privpay.pdf (Accessed June 2018) 
* [RMK’14] Tim Ruffing, Pedro Moreno-Sanchez and Aniket Kate. “CoinShuffle: Practical Decentralized Coin Mixing for Bitcoin”. In European Symposium on Research in Computer Security (ESORICS) 2014. https://crypsys.mmci.uni-saarland.de/projects/CoinShuffle/coinshuffle.pdf (Accessed June 2018)
