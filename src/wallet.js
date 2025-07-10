// src/wallet.js

import { Core } from '@walletconnect/core'
import { WalletKit } from '@reown/walletkit'

const core = new Core({
  projectId: 'bf40c7dcdb05f06f2769573103007576'
})

const metadata = {
  name: 'TiffyAI Miner',
  description: 'Mine and claim rewards securely',
  url: 'https://tiffyai.github.io/Mining-Machine-/',
  icons: ['https://tiffyai.github.io/TiffyAI-Token.png']
}; // <- ✅ FIXED: This semicolon was missing before

export async function connectWallet() {
  const walletKit = await WalletKit.init({ core, metadata });
  const provider = await walletKit.getProvider();
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  return { provider, accounts };
}