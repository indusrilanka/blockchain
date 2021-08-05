import sha256 from 'crypto-js/sha256.js';

class Block {
  constructor(index, timestamp, data, previousHas) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHas = previousHas;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(this.index + this.previousHas + JSON.stringify(this.data)).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2021', 'Genesis Block', '0');
  }

  getLatesetBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBLock) {
    newBLock.previousHas = this.getLatesetBlock().hash;
    //  newBLock.hash = newBLock.calculateHash();
    this.chain.push(newBLock);
  }

  isValidChain() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash != previousBlock.hash) {
        return false;
      }

      if (currentBlock.previousHas != previousBlock.hash) {
        return false;
      }
    }
  }
}

let firstCoin = new BlockChain();
firstCoin.addBlock(new Block(1, '02/01/2021', { amount: 4 }));
firstCoin.addBlock(new Block(2, '03/01/2021', { amount: 10 }));

console.log(JSON.stringify(firstCoin, null, 4));
