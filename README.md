
# Project Summary
We plan to build the **Transitive Network**, a layer-2 payment network aiming to congregate the functionality of credit networks (e.g., IOweYou debt links in Ripple) and payment-channel networks (e.g., Lightning Network) without requiring any new token. The Transitive Network will be thereby a complementary scalable blockchain approach with key advantages in terms of performance, economic cost and security and privacy guarantees. The Transitive Network will thus provide Ethereum with a tool to attract the businesses currently associated to Bitcoin and Ripple, first and third cryptocurrencies in the current market capitalization.


# News


# Team




<table>
<tr>
	<td>
	<img src="https://www.cs.purdue.edu/homes/akate/images/Aniket.jpg" alt="Aniket
  Kate" style="border-radius: 50%; width:200px"/>
	</td>
	
	<td>
	<img src="https://www.cs.purdue.edu/homes/pmorenos/pedro.png" alt="Pedro
  Moreno Sanchez" style="border-radius: 50%; width: 180px; height: 140px;" />
	</td>
	
	<td>
	<img src="https://adithyak.me/images/me.jpg" alt="Adithya Bhat"
  style="border-radius: 50%; width:150px;" />

	</td>

</tr>

<tr>
	<td>
	<p> <a href="https://www.cs.purdue.edu/homes/akate" target="_blank"><b> Aniket Kate </b> </a></p>
	</td>
	
	<td>
	<p> <a href="https://www.cs.purdue.edu/homes/pmorenos" target="_blank"><b> Pedro Moreno-Sanchez </b> </a></p>
	</td>

	<td>
	<p> <a href="https://adithyak.me" target="_blank"> <b> Adithya Bhat </b> </a> </p>
	</td>

</tr>
</table>


# Implementation (prototype)
A prototype implementation of transitive network is available [here](https://github.com/pedrorechez/transitivenetwork). 
The prototype is still in development and not ready for public use.
More details can be found [here](./resources/implementation.md).



# Our Research

## Credit Networks
* [Settling Payments Fast and Private](https://arxiv.org/abs/1709.05748): We describe SpeedyMurmurs, an efficient decentralized routing mechanism for credit networks (and other path-based transaction networks). Our evaluation shows that SpeedyMurmurs outperforms other routing mechanisms when evaluated with data from the Ripple network.


* [Mind Your Credit](https://arxiv.org/abs/1706.02358): Study of the evolution of the Ripple network and security vulnerabilities associated to unexpected rippling, misbehaving gateways and stale offers. Among other findings, we observe that more than 100K wallets can be financially isolated by as few as 10 highly connected wallets. Additionally, more than 4.5M USD were gained by devilry users taking advantage of stale offers. 
 
* [SilentWhispers](http://crypsys.mmci.uni-saarland.de/projects/DecentralizedPrivPay/draft-paper.pdf): A decentralized credit network showing that it is possible to ensure security and privacy guarantees in IOU credit networks without a privacy-invasive transaction ledger. SilentWhispers is built upon the core principle in credit networks that the complete balance of a user is fully determined by the activity on the credit links with her neighbors. 

* [PathShuffle](https://www.cs.purdue.edu/homes/pmorenos/public/pathshuffle.pdf): The first decentralized credit mixing protocol that enables anonymous path-based payments in IOU credit networks such as Ripple or Stellar. Apart from raising the bar for privacy in credit networks, PathShuffle paves the way for other financial activities of interest such as crowdfunding.


* [Listening Whispers of Ripple](http://crypsys.mmci.uni-saarland.de/projects/LinkingWallets/paper.pdf): Clustering heuristics and reidentification mechanisms to deanonymize owners of Ripple wallets based on the topology of the graph in the Ripple network as well as the interaction between Ripple and other cryptocurrencies such as Bitcoin. Thus, this work defines for the first time a cross-blockchain clustering heuristic.

* [PrivPay](http://crypsys.mmci.uni-saarland.de/projects/PrivPay/privpay.pdf): The first provably secure privacy-preserving payment protocol for credit networks. At its core, PrivPay features a novel algorithm for oblivious Breadth-First-Search (BFS) that is of independent interest. 

## Payment-Channel Networks (PCNs)

* [PrivMuL](https://eprint.iacr.org/2018/472.pdf): A thorough study of security and privacy of current payment-channel networks (e.g., Lightning Network). We show a security attack in the LN and a cryptographic construction to fix it. Our solution, PrivMuL, it is being integrated in the LN. 

* [Fulgor and Rayo](https://eprint.iacr.org/2017/820): We show an unavoidable tradeoff between concurrency and privacy in PCNs. Thus, Fulgor is a PCN with strong privacy guarantees and weak concurrency while Rayo provides strong concurrency guarantees at the cost of weakeaning the privacy.



