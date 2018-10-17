/*
 *  Solidity Contract
 *  Purdue University 2018
 *  Adithya Bhat <bhat24@purdue.edu>
 */
pragma solidity ^0.4.21;


contract TransitiveNetwork { 

    struct Offer {
        uint8 inputCurrencyID;
        uint32 inputAmount;
        uint8 outputCurrencyID;
        uint32 outputAmount;
        address provider;
    }

    struct Node {
        address addr;
    }

    struct Link {
        Node from;
        Node to;
        uint32 upperLimit;
        uint8 ripplingFlags;
        uint32 currentVal;
        uint32 feesFrom;
        uint32 feesTo;
        uint8 currencyID;
    }
    
    mapping (address=>Node) private addressMap; 
    mapping (bytes20=>Link) private hashLinkMap; 
    mapping (bytes20=>Offer) private hashOfferMap;

    event NewNodeRegistration (address nodeAddress);
    event NewLinkSetup (
        address from, 
        address to, 
        uint8 currencyID, 
        bool ripplingFlag, 
        uint32 fees,
        uint32 ulim
    ); 
    event CancelOrder(bytes20 idx);
    event UpdateLink(
        bytes20 idx,
        address caller,
        bool rippling,
        uint32 fees,
        uint32 ulim
    );
    event Pay(
        address from,
        address to,
        bytes20[] path,
        uint32 value
    );
    event NewOrder (
        address by, 
        bytes20 inputLinkIdx, 
        uint32 inputAmount, 
        bytes20 outputLinkIdx, 
        uint32 outputAmount
    );

    function addNode() public {
        require(addressMap[msg.sender].addr == 0);
        addressMap[msg.sender] = Node(msg.sender);

        emit NewNodeRegistration (msg.sender);
    }

    function createLink (uint8 currencyID, address other, uint32 ulim, bool ripplingFlag, uint32 fees) public {
        require(
            checkNode(msg.sender) &&
            checkNode(other)
        );
        require(msg.sender != other);
        
        bytes20 hashLink = ripemd160(currencyID, other, msg.sender); 
        require(hashLinkMap[hashLink].from.addr == 0);
        hashLinkMap[hashLink] = Link(
            addressMap[other],
            addressMap[msg.sender],
            ulim,
            ripplingFlag?1:0, // 000000(F=0)(T=ripplingFlag)
            0,   
            0,
            fees,
            currencyID 
        );

        emit NewLinkSetup(other, msg.sender, currencyID, ripplingFlag, fees, ulim);
    }   

    function updateLink (
        bytes20 linkIdx,
        uint32 ulim,
        bool rippling,   
        uint32 fees )
        public
    {
        Link storage link = hashLinkMap[linkIdx];

        if (link.from.addr == msg.sender) {
            if(link.ripplingFlags & 1 == 1) {
                link.ripplingFlags = uint8(rippling?3:1); // 000000F1
            }
            else {
                link.ripplingFlags = uint8(rippling?2:0); // 000000F0
            }
            link.feesFrom = fees;
        } else if (link.to.addr == msg.sender) {
            if(link.ripplingFlags & 2 == 2) {
                link.ripplingFlags = uint8(rippling?3:2); // 0000001T
            }
            else {
                link.ripplingFlags = uint8(rippling?1:0); // 0000000T
            }
            link.feesTo = fees;
            require(ulim >= link.currentVal);
            link.upperLimit = ulim;
        } else {
            require(link.from.addr == msg.sender || link.to.addr == msg.sender);
        }

        emit UpdateLink(linkIdx, msg.sender, rippling, fees, ulim);
    }

    function creditNetworkPay(
        address toPay, 
        uint32 value,
        bytes20[] path1, 
        bytes20[] path2,
        bytes20[] path3,
        bytes20[] path4) public returns (bool, string, uint) 
    {
        require(path1.length > 0 || path2.length > 0 || path3.length > 0 || path4.length > 0);
        uint fees = 0;
        if(path1.length > 0) {
            fees += PathPay(msg.sender, toPay, value, path1);
        }
        if(path2.length > 0) {
            fees += PathPay(msg.sender, toPay, value, path2);
        }
        if(path3.length > 0) {
            fees += PathPay(msg.sender, toPay, value, path3);
        }
        if(path4.length > 0) {
            fees += PathPay(msg.sender, toPay, value, path4);
        }
        
        return (true, "", fees);
    }

    function addOffer(
        bytes20 inputLinkIdx,
        bytes20 outputLinkIdx,
        uint32 inputAmount,
        uint32 outputAmount
    ) public {
        require(checkNode(msg.sender));
        require(inputAmount > 0);
        require(outputAmount > 0);
        require(inputLinkIdx != outputLinkIdx); // B->C(0)->D O'
        require(
            hashLinkMap[inputLinkIdx].currencyID != hashLinkMap[outputLinkIdx].currencyID &&
            (hashLinkMap[inputLinkIdx].from.addr == msg.sender || hashLinkMap[inputLinkIdx].to.addr == msg.sender) &&
            (hashLinkMap[outputLinkIdx].from.addr == msg.sender || hashLinkMap[outputLinkIdx].to.addr == msg.sender)
        );

        bytes20 offerIndex = ripemd160(inputLinkIdx, outputLinkIdx, msg.sender);
        hashOfferMap[offerIndex] = Offer({
            inputCurrencyID: hashLinkMap[inputLinkIdx].currencyID,
            outputCurrencyID: hashLinkMap[outputLinkIdx].currencyID,
            inputAmount: inputAmount,
            outputAmount: outputAmount,
            provider: msg.sender
        });

        emit NewOrder (
            msg.sender, 
            inputLinkIdx, 
            inputAmount, 
            outputLinkIdx, 
            outputAmount
        );

    }

    function cancelOffer(bytes20 offerIdx) public {
        require(checkNode(msg.sender));
        require(hashOfferMap[offerIdx].provider == msg.sender);
        
        delete hashOfferMap[offerIdx];
        emit CancelOrder(offerIdx);
    }

    function checkNode(address src) public view returns (bool) {
        return (addressMap[src].addr != 0);
    }

    function checkLink(bytes20 idx) public view returns (bool) {
        return (hashLinkMap[idx].from.addr != 0);
    }

    function viewLink (address _one, address _two, uint8 currencyID) public view returns (bytes20) {
        require(checkNode(_one) &&
            checkNode(_two));

        bytes20 linkHash = ripemd160(currencyID, _one, _two);
        
        if (hashLinkMap[linkHash].from.addr == 0) {
            linkHash = ripemd160(currencyID, _two, _one);
            if (hashLinkMap[linkHash].from.addr == 0) {
                revert(); //remove all reverts
            }
        }

        return linkHash;
    }

    function linkInfo(bytes20 idx) public view returns (address from, address to, uint32 curVal, uint32 ulim, uint8 ripplingFlags, uint32 feesFrom, uint32 feesTo, uint8 currencyID) {
        curVal = hashLinkMap[idx].currentVal;
        ulim = hashLinkMap[idx].upperLimit;
        from = hashLinkMap[idx].from.addr;
        to = hashLinkMap[idx].to.addr;
        ripplingFlags = hashLinkMap[idx].ripplingFlags;
        feesFrom = hashLinkMap[idx].feesFrom;
        feesTo = hashLinkMap[idx].feesTo;
        currencyID = hashLinkMap[idx].currencyID;
    }

    function getOfferBy(address _by, bytes20 inputIdx, bytes20 outputIdx) public pure returns (bytes20) {
        bytes20 idx = ripemd160(inputIdx, outputIdx, _by);
        return idx;
    }

    function consumeOffer(
        bytes20 idx, 
        uint32 amount, 
        uint8 curIn,
        uint8 curOut) private view returns (uint32) {

        Offer memory offer = hashOfferMap[idx];
        require(offer.inputCurrencyID == curIn);
        require(offer.outputCurrencyID == curOut);

        return amount*offer.outputAmount/offer.inputAmount;
    }

    function PathPay(address start, address toPay, uint32 value, bytes20[] path) private returns (uint) {
        address toCheck = start;
        Link memory prevLink = hashLinkMap[path[0]];
        Link storage linkToTest = hashLinkMap[path[0]];
        uint32 feeValue = value;
        for(uint idx = 0; idx < path.length; idx++) {
            require(checkLink(path[idx]));
            linkToTest = hashLinkMap[path[idx]];
            if(prevLink.currencyID != linkToTest.currencyID){
                // Cross Currency Payment, convert
                bytes20 offerIdx = ripemd160(path[idx-1],path[idx],toCheck);
                require(hashOfferMap[offerIdx].provider == toCheck);
                // Check if the offer provider is in between [l1,l2,o1,l3]V=[l1,l2,l3]+[o1]XX
                // Document the offer link hash mechanism
                feeValue = consumeOffer(offerIdx,feeValue,prevLink.currencyID,linkToTest.currencyID);
            }
            if(linkToTest.from.addr == toCheck){
                require(linkToTest.ripplingFlags & uint8(2) == uint8(2));
                require(
                    uint64(linkToTest.currentVal) + uint64(feeValue) <= uint64(linkToTest.upperLimit) &&
                    uint64(linkToTest.currentVal + feeValue) <= uint64(feeValue)+uint64(linkToTest.currentVal)
                ); 
                linkToTest.currentVal += feeValue;
                toCheck = linkToTest.to.addr;
            } else if (linkToTest.to.addr == toCheck) {
                    require(linkToTest.ripplingFlags & uint8(1) == uint8(1));
                    require(linkToTest.currentVal >= feeValue);
                    linkToTest.currentVal -= feeValue;
                    toCheck = linkToTest.from.addr;
            } else {
                return 0;
            }
            require(feeValue >= linkToTest.feesTo);
            feeValue -= linkToTest.feesTo;
            prevLink = linkToTest;
        }
        require(toCheck == toPay);
        emit Pay(start, toPay, path, value);
        return value-feeValue;
    }
}
// Update doc wrt to Code
// TrueBit and Plasma
/*
 *  TODO: Import Ripple Dataset
 *  TODO: DOS Handling by introducing puzzles
 *  TODO: Hinder sybil account creations
 */
// Setup to obtain all links to update for an address [] 
// Add column for ripple in the document
// line by line gas cost
