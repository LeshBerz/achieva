import * as dotenv from 'dotenv';

import { Address, Cell } from '@ton/core';

import { openWallet } from './utils';
import { SbtCollection } from './contracts/SbtCollection';
import { SbtItem } from './contracts/SbtItem';

dotenv.config();

export const TESTNET = Boolean(process.env.TESTNET);
const SBT_ADDRESS = Address.parse('EQDMhvjKqyDTB7zeUpZYK3qt5stBub7FnBOmuxssgA0vXFAa');

async function test() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };

  const collection = new SbtCollection(collectionData, TESTNET);
  const sbtItem = new SbtItem(collection);

  console.log('\ngetCollectionData:', await collection.getCollectionData());
  console.log('\ngetNftAddressByIndex:', await collection.getNftAddressByIndex(0));
  console.log('\ngetNftContent:', await collection.getNftContent(0, new Cell()));

  console.log('\ngetAddressByIndex:', await sbtItem.getAddressByIndex(collection.address, 0));
  console.log('\ngetNftData:', await sbtItem.getNftData(SBT_ADDRESS));
  console.log('\ngetAuthorityAddress:', await sbtItem.getAuthorityAddress(SBT_ADDRESS));
  console.log('\ngetRevokedTime:', await sbtItem.getRevokedTime(SBT_ADDRESS));
  console.log('\ngetStaticData:', await sbtItem.getStaticData(SBT_ADDRESS));
}

void test().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
