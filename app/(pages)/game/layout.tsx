'use client'
import React from 'react'
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

const wallets = [
  new LeoWalletAdapter({
    appName: 'Leo'
  })
]
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  )
}
