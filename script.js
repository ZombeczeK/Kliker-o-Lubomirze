let clicker = document.getElementById('clicker');
let coinCounter = document.getElementById('coin-counter');
let endScreen = document.getElementById('end');
let background = document.body;
let coins = 0;
let clickValue = 1;

const itemImages = ['miecz2.gif', 'kilof.gif', 'czolg4.gif', 'meteoryt.gif', 'bomba.gif', 'alien.gif', 'lubekgif.gif'];
let currentItemImageIndex = 0;
let firstClick = true;

alert("Dla lepszych wrażeń ustaw odpowiedni rozmiar strony (u mnie 80% jest git)");

const mainShopItems = [
  { cost: 200, multiplier: 2, id: "i1" },
  { cost: 500, multiplier: 2, id: "i2" },
  { cost: 1200, multiplier: 2, id: "i3" },
  { cost: 2500, multiplier: 2, id: "i4" },
  { cost: 5500, multiplier: 2, id: "i5" },
  { cost: 12000, multiplier: 2, id: "i6" },
  { cost: 25000, multiplier: 3, id: "i7" },
  { cost: 999999, multiplier: 100, id: "i8" }
];
const newShopItems = [
    { cost: 10000, multiplier: 1, id: "i9", purchased: false },
    { cost: 20000, multiplier: 1, id: "i10", purchased: false },
    { cost: 30000, multiplier: 1, id: "i11", purchased: false },
    { cost: 40000, multiplier: 1, id: "i12", purchased: false }
];

function clickEvent() {
  coins += clickValue;
  updateCoinCounter();
  if (!firstClick) {
    animateClicker();
  }
}

function updateCoinCounter() {
  coinCounter.textContent = coins + ' monet';
}

function animateClicker() {
  clicker.src = itemImages[currentItemImageIndex];
  setTimeout(() => {
    clicker.src = 'lubek.png';
  }, 500);
}

function buyItem(item, shopType) {
  if (!item.purchased && coins >= item.cost) {
    coins -= item.cost;
    clickValue *= item.multiplier;
    updateCoinCounter();
    document.getElementById(item.id).style.display = "none";
    item.purchased = true;
    if(shopType === 'main'){
        currentItemImageIndex = mainShopItems.indexOf(item);}
    firstClick = false;
    if (item.multiplier === 100) {
      endGame();
    }
    if (shopType === 'new') {
      changeBackground(item.id);
    }
  }
}

function endGame() {
  endScreen.style.display = 'flex';
  document.getElementById("game-container").style.display = "none";
  document.getElementById("new-shop-container").style.display = "none";
}

function changeBackground(itemId) {
  switch (itemId) {
    case "i9":
      background.style.backgroundImage = 'url(tło3.jpeg)';
      break;
    case "i10":
      background.style.backgroundImage = "url(tło4.jpg)";
      break;
    case "i11":
      background.style.backgroundImage = "url(tło5.jpg)";
      break;
    case "i12":
      background.style.backgroundImage = "url(tło6.jpg)";
      break;
  }
}

clicker.addEventListener('click', clickEvent);

for (let i = 0; i < mainShopItems.length; i++) {
  let item = mainShopItems[i];
  document.getElementById(item.id).addEventListener('click', () => buyItem(item, 'main'));
}

for (let i = 0; i < newShopItems.length; i++) {
  let item = newShopItems[i];
  document.getElementById(item.id).addEventListener('click', () => buyItem(item, 'new'));
}
