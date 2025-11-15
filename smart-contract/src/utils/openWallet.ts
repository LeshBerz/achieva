import * as dotenv from 'dotenv';

import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { OpenedContract } from '@ton/core';
import { TonClient, WalletContractV5R1 } from '@ton/ton';

dotenv.config();

export type OpenedWallet = {
  contract: OpenedContract<WalletContractV5R1>;
  keyPair: KeyPair;
};

export async function openWallet(mnemonic: string[], testnet: boolean) {
  const keyPair = await mnemonicToPrivateKey(mnemonic);

  const toncenterBaseEndpoint: string = testnet
    ? 'https://testnet.toncenter.com'
    : 'https://toncenter.com';

  const client = new TonClient({
    endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
    apiKey: process.env.TONCENTER_API_KEY,
  });

  const wallet = WalletContractV5R1.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });

  const contract = client.open(wallet);
  return { contract, keyPair };
}
