import * as dotenv from 'dotenv';

import { openWallet } from './utils';
import { SbtCollection } from './contracts/SbtCollection';

dotenv.config();

export const TESTNET = Boolean(process.env.TESTNET);

async function deploy() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  console.log('Start deploy of sbt collection...');
  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };
  const collection = new SbtCollection(collectionData, TESTNET);
  await collection.deploy(wallet);
  console.log(`Collection deployed: ${collection.address}`);
}

void deploy().catch((e) => {
  console.error('Deployment failed:', e);
  process.exit(1);
});
