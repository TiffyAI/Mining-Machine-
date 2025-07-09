import Web3 from 'web3';
import { walletKit } from './wallet.js';

const CONTRACT_ADDRESS = "0xE488253DD6B4D31431142F1b7601C96f24Fb7dd5";
const ABI = [{
  type: "function",
  name: "claim",
  stateMutability: "payable",
  inputs: [],
  outputs: []
}];

const COUNTER_KEY = 'tiffy_balance';
const SPEED_KEY = 'tiffy_speed';
const LAST_CLAIM_KEY = 'tiffy_last_claim';
const threshold = 1;
const cooldown = 24 * 60 * 60 * 1000;

let balance = parseFloat(localStorage.getItem(COUNTER_KEY)) || 0;
let miningSpeed = parseFloat(localStorage.getItem(SPEED_KEY)) || 0.0000001;
let web3, account, contract;

// DOM elements
const tiffyCounter = document.getElementById('tiffyCounter');
const blueKeysDisplay = document.getElementById('blueKeys');
const goldKeysDisplay = document.getElementById('goldKeys');
const connectBtn = document.getElementById('connectBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const boostBtn = document.getElementById('boostBtn');
const bgVideo = document.getElementById('backgroundVideo');

function updateKeyDisplay() {
  const blue = parseInt(localStorage.getItem('tiffyBlueKeys')) || 0;
  const gold = parseInt(localStorage.getItem('gold')) || 0;
  blueKeysDisplay.textContent = `🔵 Blue Keys: ${blue}`;
  goldKeysDisplay.textContent = `🟡 Gold Keys: ${gold}`;
}

function updateTiffyDisplay() {
  tiffyCounter.textContent = `⛏️ ${balance.toFixed(7)} TIFFY`;
  const lastClaim = localStorage.getItem(LAST_CLAIM_KEY);
  const canClaim = balance >= threshold && (!lastClaim || Date.now() - parseInt(lastClaim) > cooldown);
  withdrawBtn.disabled = !canClaim;
}

function setBackgroundVideo(source, isLoop = true, duration = null) {
  bgVideo.loop = isLoop;
  bgVideo.src = source;
  bgVideo.load();
  bgVideo.play();
  if (!isLoop && duration) {
    setTimeout(() => setBackgroundVideo('mine.mp4', true), duration);
  }
}

// ⛏️ Mining loop
setInterval(() => {
  const lastClaim = localStorage.getItem(LAST_CLAIM_KEY);
  const cooldownPassed = !lastClaim || Date.now() - parseInt(lastClaim) > cooldown;
  if (balance < threshold && cooldownPassed) {
    balance += miningSpeed;
    localStorage.setItem(COUNTER_KEY, balance);
    updateTiffyDisplay();
  }
}, 1000);

// ⚡ Boost with Blue Key
boostBtn.addEventListener('click', () => {
  let blue = parseInt(localStorage.getItem('tiffyBlueKeys')) || 0;
  if (blue < 1) return alert("❌ Not enough Blue Keys.");
  blue--;
  miningSpeed *= 2;
  alert("⚡ Mining Power Boosted!");
  localStorage.setItem('tiffyBlueKeys', blue);
  localStorage.setItem(SPEED_KEY, miningSpeed);
  setBackgroundVideo('upgrade.mp4', false, 3000);
  updateKeyDisplay();
});

// 🔌 Connect wallet
connectBtn.addEventListener('click', async () => {
  try {
    const provider = await walletKit.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    connectBtn.innerText = `✅ ${account.slice(0, 6)}...Connected`;
  } catch (err) {
    alert("❌ Wallet connection failed.");
    console.error(err);
  }
});

// 💸 Claim logic
withdrawBtn.addEventListener('click', async () => {
  if (!contract || !account) return alert("❌ Connect your wallet first.");
  try {
    await contract.methods.claim().send({
      from: account,
      value: web3.utils.toWei("0.00086", "ether")
    });

    alert(`✅ 1 TIFFY Successfully Claimed!`);
    setBackgroundVideo('withdraw.mp4', false, 3000);
    balance = 0;
    localStorage.setItem(COUNTER_KEY, 0);
    localStorage.setItem(LAST_CLAIM_KEY, Date.now());
    updateTiffyDisplay();
  } catch (err) {
    alert("❌ Claim failed. Make sure cooldown passed and you have enough BNB.");
    console.error(err);
  }
});

// 🟢 Init UI
updateKeyDisplay();
updateTiffyDisplay();
setBackgroundVideo('mine.mp4', true);