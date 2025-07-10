import Web3 from 'web3'
import { connectWallet } from './wallet.js'

window.addEventListener('DOMContentLoaded', () => {
  const CONTRACT_ADDRESS = '0xE488253DD6B4D31431142F1b7601C96f24Fb7dd5'
  const ABI = [{
    type: 'function',
    name: 'claim',
    stateMutability: 'payable',
    inputs: [],
    outputs: []
  }]

  let web3, account, contract

  const connectBtn = document.getElementById('connectBtn')
  const withdrawBtn = document.getElementById('withdrawBtn')

  async function setupWallet(provider, accounts) {
    web3 = new Web3(provider)
    account = accounts[0]
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

    connectBtn.innerText = `✅ ${account.slice(0, 6)}...Connected`
    connectBtn.disabled = true
    withdrawBtn.disabled = false
  }

  connectBtn.addEventListener('click', async () => {
    try {
      const { provider, accounts } = await connectWallet()
      await setupWallet(provider, accounts)
    } catch (err) {
      console.error('❌ Wallet connection failed:', err)
      alert('❌ Wallet connection failed.')
    }
  })

  withdrawBtn.addEventListener('click', async () => {
    if (!contract || !account) return alert('❌ Connect your wallet first.')

    try {
      await contract.methods.claim().send({
        from: account,
        value: web3.utils.toWei('0.00086', 'ether')
      })

      alert('💰 1 TIFFY Claimed!')
    } catch (err) {
      console.error('❌ Claim failed:', err)
      alert('❌ Claim failed. Make sure cooldown passed and you have enough BNB.')
    }
  })
})