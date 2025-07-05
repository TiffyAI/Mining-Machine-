import { Core } from 'https://unpkg.com/@walletconnect/core@2.10.6/dist/esm/core.js';
import { WalletKit } from 'https://unpkg.com/@reown/walletkit@1.0.9/dist/walletkit.js';

const core = new Core({
  projectId: 'bf40c7dcdb05f06f2769573103007576'
});

const metadata = {
  name: 'TiffyAI',
  description: 'Decentralized Wealth. TiffyAI is a hyper-intelligent Web3 ecosystem merging AI-powered tools, tokenized rewards, and gamified finance.',
  url: 'https://tiffyai.github.io/Mining-Machine/',
  icons: ['https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/ddc202a2-e490-4cfe-2481-52e3ae276400/sm']
};

export const walletKit = await WalletKit.init({
  core,
  metadata
});
