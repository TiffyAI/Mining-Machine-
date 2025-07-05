import { WalletKit } from '@reown/walletkit';

const walletKit = new WalletKit({
  chains: [
    {
      id: 56,
      name: 'BNB Smart Chain',
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    }
  ]
});

const connectBtn = document.getElementById('connectBtn');

walletKit.on('connected', ({ address }) => {
  console.log('Wallet connected:', address);
  window.connectWallet(address);
});

walletKit.on('disconnected', () => {
  connectBtn.innerText = '🔌 Connect Wallet';
});

connectBtn.addEventListener('click', async () => {
  await walletKit.connect();
});
