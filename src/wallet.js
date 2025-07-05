import { WalletKit } from "https://esm.sh/@reown/walletkit@latest";

const walletKit = new WalletKit({
  chains: [
    {
      id: 56,
      name: "BNB Smart Chain",
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 }
    }
  ]
});

const connectBtn = document.getElementById("connectBtn");

walletKit.on("connected", ({ address, provider }) => {
  console.log("Connected:", address);
  connectBtn.innerText = `✅ ${address.slice(0, 6)}...${address.slice(-4)}`;
  window.web3 = new Web3(provider);
  window.account = address;
  window.contract = new web3.eth.Contract([
    { "type": "function", "name": "claim", "stateMutability": "payable", "inputs": [], "outputs": [] }
  ], "0xE488253DD6B4D31431142F1b7601C96f24Fb7dd5");
});

walletKit.on("disconnected", () => {
  connectBtn.innerText = "🔌 Connect Wallet";
});

connectBtn.addEventListener("click", async () => {
  await walletKit.connect();
});
