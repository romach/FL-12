class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get isFaceCard() {
    return this.rank === 1 || this.rank > 10;
  }

  toString() {
    const faces = {
      1: "Ace",
      11: "Jack",
      12: "Queen",
      13: "King"
    };
    const formatFace = () => (this.isFaceCard ? faces[this.rank] : this.rank);
    return `${formatFace()} of ${this.suit}`;
  }

  static compare(cardOne, cardTwo) {
    return cardOne.rank - cardTwo.rank;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    for (const suit of ["Hearts", "Diamonds", "Clubs", "Spades"]) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }

  get count() {
    return this.cards.length;
  }

  shuffle() {
    this.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  draw(count) {
    const lastCards = this.cards.slice(-count);
    this.cards = this.cards.splice(-count);
    return lastCards;
  }
}

class Player {
  constructor(name, deck, wins) {
    this.name = name;
    this.deck = deck;
    Object.defineProperty(this, "wins", { value: wins, writable: false });
  }

  static play(playerOne, playerTwo) {
    if (playerOne.deck.cards.length && playerTwo.deck.cards.length) {
      const cardOne = playerOne.deck.cards.pop();
      const cardTwo = playerTwo.deck.cards.pop();
      let firstWins =
        cardOne.rank > cardTwo.rank ? playerOne.wins + 1 : playerOne.wins;
      let secondWins =
        cardTwo.rank > cardOne.rank ? playerTwo.wins + 1 : playerTwo.wins;
      Player.play(
        new Player(playerOne.name, playerOne.deck, firstWins),
        new Player(playerTwo.name, playerTwo.deck, secondWins)
      );
    } else {
      if (playerOne.wins == playerTwo.wins) {
        console.log("Draw");
      } else {
        const winner = playerOne.wins > playerTwo.wins ? playerOne : playerTwo;
        const loser = winner === playerOne ? playerTwo : playerOne;
        console.log(`${winner.name} wins ${winner.wins} to ${loser.wins}`);
      }
    }
  }
}

const playerOne = new Player("John", new Deck(), 0);
const playerTwo = new Player("Bill", new Deck(), 0);
Player.play(playerOne, playerTwo);
