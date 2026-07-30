const suits = ["heart", "club", "diamond", "spade"];

const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

let deck = [];
let playerHand = [];
let playerSplitHand = [];
let dealerHand = [];

let gameActive = false;
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const youScore = document.getElementById("you-score");

const playerCards = document.getElementById("player-cards");
const playerSplitCards = document.getElementById("player-split-cards");
const dealerCards = document.getElementById("dealer-cards");

const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const split1Score = document.getElementById("split-1-score");
const split2Score = document.getElementById("split-2-score");

const message = document.getElementById("message");

function createDeck() {
  deck = [];

  let imageNumber = 1;
  let headsValue = 10;
  let acesValue = 11;
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        suit,
        value,
        img: `img/${imageNumber}.png`,
      });

      imageNumber++;
    });
  });

  shuffleDeck();
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function drawCard() {
  return deck.pop();
}

function getCardValue(card) {
  if (card.value === "A") return 11;

  if (card.value === "J" || card.value === "Q" || card.value === "K") {
    return 10;
  }

  return Number(card.value);
}

function getHandValue(hand) {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    total += getCardValue(card);

    if (card.value === "A") {
      aces++;
    }
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function renderCards(hand, container, hideHoleCard = false) {
  container.innerHTML = "";

  hand.forEach((card, index) => {
    const img = document.createElement("img");

    if (hideHoleCard && index === 1) {
      img.src = "img/cover.png";
    } else {
      img.src = card.img;
    }

    img.className = "card";

    container.appendChild(img);
  });
}

function setMessage(text) {
  message.textContent = text;
}

const standBtn = document.getElementById("stand-btn");
const dealBtn = document.getElementById("deal-btn");
const hitBtn = document.getElementById("hit-btn");
const splitBtn = document.getElementById("split-btn");

let hand1turn = false;
let hand2turn = false;
function hideFunction() {
  dealBtn.classList.remove("hidden");
  standBtn.classList.add("hidden");
  hitBtn.classList.add("hidden");
  splitBtn.classList.add("hidden");
}
function hideNewGame() {
  dealBtn.classList.add("hidden");
  standBtn.classList.remove("hidden");
  hitBtn.classList.remove("hidden");
  console.log("hidden!");
}

function startGame() {
  if (gameActive) {
    console.log("already in game");
    return;
  }

  createDeck();

  playerHand = [];
  playerSplitHand = [];
  dealerHand = [];
  hideSplit();

  playerHand.push(drawCard());
  playerHand.push(drawCard());
  if (getCardValue(playerHand[0]) == getCardValue(playerHand[1])) {
    playerSplitCards.classList.remove("hidden");
    splitBtn.classList.remove("hidden");
  }

  dealerHand.push(drawCard());
  dealerHand.push(drawCard());

  renderCards(playerHand, playerCards);
  renderCards(playerSplitHand, playerSplitCards);
  renderCards(dealerHand, dealerCards, true);

  //   updateScores();
  playerScore.textContent = getHandValue(playerHand);
  dealerScore.textContent = getCardValue(dealerHand[0]);

  gameActive = true;
  hideNewGame();
  setMessage("your turn.");
}
startGame();
function getResult(player, dealer) {
  if (player > 21) return "lose";
  if (dealer > 21) return "win";
  if (player > dealer) return "win";
  if (player < dealer) return "lose";
  if (player == dealer) return "push";
}
const hand1 = getResult(
  getHandValue(playerSplitHand),
  getHandValue(dealerHand),
);
const hand2 = getResult(getHandValue(playerHand), getHandValue(dealerHand));
function hit() {
  if (hand1turn) {
    playerSplitHand.push(drawCard());

    renderCards(playerSplitHand, playerSplitCards);

    split1Score.textContent = getHandValue(playerSplitHand);

    if (getHandValue(playerSplitHand) > 21) {
      playerHand.push(drawCard());

      renderCards(playerHand, playerCards);

      split2Score.textContent = getHandValue(playerHand);
      hand1turn = false;
      hand2turn = true;
      setMessage("hand 1 bust. hand 2 turn");
    }
    return;
  }
  if (hand2turn) {
    playerHand.push(drawCard());

    renderCards(playerHand, playerCards);

    split2Score.textContent = getHandValue(playerHand);

    if (getHandValue(playerHand) > 21) {
      endRound(`hand 1 ${hand1}. hand 2 lose`);
    }
    return;
  }
  playerHand.push(drawCard());

  renderCards(playerHand, playerCards);

  playerScore.textContent = getHandValue(playerHand);

  if (getHandValue(playerHand) > 21) {
    endRound("bust. you lose.");
  }
}

function stand() {
  if (hand1turn) {
    playerHand.push(drawCard());

    renderCards(playerHand, playerCards);

    split2Score.textContent = getHandValue(playerHand);

    hand1turn = false;
    hand2turn = true;
    setMessage("hand 2 turn");

    return;
  }

  if (hand2turn) {
    while (getHandValue(dealerHand) < 17) {
      dealerHand.push(drawCard());
    }

    renderCards(dealerHand, dealerCards);

    dealerScore.textContent = getHandValue(dealerHand);

    let result1 = getResult(
      getHandValue(playerSplitHand),
      getHandValue(dealerHand),
    );
    let result2 = getResult(getHandValue(playerHand), getHandValue(dealerHand));
    endRound(`hand 1 ${result1}. hand 2 ${result2}`);
    return;
  }

  while (getHandValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }

  renderCards(dealerHand, dealerCards);

  dealerScore.textContent = getHandValue(dealerHand);

  const playerTotal = getHandValue(playerHand);

  const dealerTotal = getHandValue(dealerHand);

  if (dealerTotal > 21) {
    endRound("dealer busts! you win.");
  } else if (playerTotal > dealerTotal) {
    endRound("you win.");
  } else if (playerTotal < dealerTotal) {
    endRound("dealer wins.");
  } else {
    endRound("you push.");
  }
}

function split() {
  playerSplitCards.classList.remove("hidden");
  const [firstCard] = playerHand.splice(0, 1);
  playerSplitHand.push(firstCard);
  playerSplitHand.push(drawCard());
  renderCards(playerHand, playerCards);
  renderCards(playerSplitHand, playerSplitCards);
  split1Score.textContent = getHandValue(playerSplitHand);
  split2Score.textContent = getHandValue(playerHand);
  text1.classList.remove("hidden");
  text2.classList.remove("hidden");
  youScore.classList.add("hidden");
  hand1turn = true;
  hand2turn = false;
  setMessage("hand 1 turn");
  splitBtn.classList.add("hidden");
}

function hideSplit() {
  text1.classList.add("hidden");
  text2.classList.add("hidden");
}

function endRound(text) {
  gameActive = false;

  setMessage(text);
  hideFunction();
}
function reload() {
  window.location.reload();
}
dealBtn.addEventListener("click", reload);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
splitBtn.addEventListener("click", split);
