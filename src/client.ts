import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import { chain, createClient } from 'wagmi';
import { ALCHEMY_ID } from './config';

export const chains = [chain.arbitrum];

const { connectors } = getDefaultWallets({
  appName: 'Fees.wtf Arbitrum',
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, ALCHEMY_ID);
  },
});
