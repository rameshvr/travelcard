class Card {
  constructor() {
    this.balance = 0;
    this.id = Math.random();
  }
  setBalance(amount) {
    this.balance = amount;
  }
  debitAmount(amount) {
    console.log(`Fare debited: ${amount}`);
    this.balance = this.balance - amount;
  }
  getBalance() {
    console.log(`Available balance: ${this.balance} \n`);
    // return this.balance;
  }
}

module.exports = Card;
