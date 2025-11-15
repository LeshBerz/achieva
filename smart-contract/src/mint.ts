import * as dotenv from 'dotenv';

import { Address } from '@ton/core';

import { openWallet, updateEnvFile } from './utils';
import { waitSeqno } from './delay';
import { SbtCollection } from './contracts/SbtCollection';
import { SbtItem } from './contracts/SbtItem';

dotenv.config();

const _path = [__dirname, '..'];
export const TESTNET = Boolean(process.env.TESTNET);

async function mint() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };

  const collection = new SbtCollection(collectionData, TESTNET);

  for (
    let index = Number(process.env.SBT_CURRENT_INDEX);
    index < Number(process.env.SBT_CURRENT_INDEX) + Number(process.env.SBT_QUANTITY);
    index++
  ) {
    console.log(`Start deploy of SBT, index: ${index}`);
    const mintParams = {
      itemOwnerAddress: Address.parse(process.env.RECIPIENT_ADDRESS || wallet.contract.address.toString()),
      authorityAddress: wallet.contract.address,
    };

    const sbtItem = new SbtItem(collection);
    let seqno = await sbtItem.deploy(wallet, mintParams);
    console.log(`Successfully deployed SBT, index: ${index}`);
    await waitSeqno(seqno, wallet);
  }

  updateEnvFile(
    _path,
    'SBT_CURRENT_INDEX',
    (Number(process.env.SBT_CURRENT_INDEX) + Number(process.env.SBT_QUANTITY)).toString(),
  );
}

void mint().catch((e) => {
  console.error('Minting failed:', e);
  process.exit(1);
});
