// src/wallet.js
import { Core } from '@walletconnect/core'
import { WalletKit } from '@reown/walletkit'

const core = new Core({
  projectId: 'bf40c7dcdb05f06f2769573103007576' // your verified project
})

const metadata = {
  name: 'TiffyAI Miner',
  description: 'Mine and claim rewards securely',
  url: 'https://tiffyai.github.io/Mining-Machine-/',
  icons: ['https://tiffyai.github.io/TiffyAI-Token.png']
}

let walletKit

export async function connectWallet() {
  if (!walletKit) {
    walletKit = await WalletKit.init({ core, metadata })
  }

  const provider = await walletKit.connect()
  const accounts = await provider.request({ method: 'eth_requestAccounts' })

  return { provider, accounts }
}