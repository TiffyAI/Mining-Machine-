import { Core } from 'https://unpkg.com/@walletconnect/core@2.10.6/dist/esm/core.js';
import { WalletKit } from 'https://unpkg.com/@reown/walletkit@1.0.9/dist/walletkit.js';

const core = new Core({
  projectId: 'bf40c7dcdb05f06f2769573103007576'
});

const metadata = {
  name: 'TiffyAI',
  description: 'Decentralized Web3 Wealth Mining.',
  url: 'https://tiffyai.github.io/Mining-Machine/',
  icons: ['https://tiffyai.github.io/logo.png'] // Replace if needed
};

export const walletKit = await WalletKit.init({ core, metadata });
