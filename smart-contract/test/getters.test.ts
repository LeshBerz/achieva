import * as dotenv from 'dotenv';

import { Address, Cell } from '@ton/core';

import { openWallet } from '../src/utils';
import { SbtCollection } from '../src/contracts/SbtCollection';
import { SbtItem } from '../src/contracts/SbtItem';

dotenv.config();

export const TESTNET = Boolean(process.env.TESTNET);
const SBT_ADDRESS = Address.parse('kQBRrwtMB1Rsp1ajprk-TsXhqBvrQTqUJQGiWVv8R0AJTHBp');

async function test() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };

  const collection = new SbtCollection(collectionData, TESTNET);
  const sbtItem = new SbtItem(collection);

  try {
    console.log('\n✅ getCollectionData:', await collection.getCollectionData());
  } catch (e) {
    console.error('\n❌ getCollectionData failed:', e);
  }
  try {
    console.log('\n✅ getNftAddressByIndex:', await collection.getNftAddressByIndex(0));
  } catch (e) {
    console.error('\n❌ getNftAddressByIndex failed:', e);
  }
  try {
    console.log('\n✅ getNftContent:', await collection.getNftContent(0, new Cell()));
  } catch (e) {
    console.error('\n❌ getNftContent failed:', e);
  }

  try {
    console.log('\n✅ getAddressByIndex:', await sbtItem.getAddressByIndex(collection.address, 0));
  } catch (e) {
    console.error('\n❌ getAddressByIndex failed:', e);
  }
  try {
    console.log('\n✅ getNftData:', await sbtItem.getNftData(SBT_ADDRESS));
  } catch (e) {
    console.error('\n❌ getNftData failed:', e);
  }
  try {
    console.log('\n✅ getAuthorityAddress:', await sbtItem.getAuthorityAddress(SBT_ADDRESS));
  } catch (e) {
    console.error('\n❌ getAuthorityAddress failed:', e);
  }
  try {
    console.log('\n✅ getRevokedTime:', await sbtItem.getRevokedTime(SBT_ADDRESS));
  } catch (e) {
    console.error('\n❌ getRevokedTime failed:', e);
  }
}

void test().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
