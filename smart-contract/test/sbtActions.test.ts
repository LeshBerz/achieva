import * as dotenv from 'dotenv';

import { Address, Cell } from '@ton/core';

import { openWallet } from '../src/utils';
import { SbtCollection } from '../src/contracts/SbtCollection';
import { SbtItem } from '../src/contracts/SbtItem';

dotenv.config();

export const TESTNET = Boolean(process.env.TESTNET);
const SBT_ADDRESS = Address.parse('kQBRrwtMB1Rsp1ajprk-TsXhqBvrQTqUJQGiWVv8R0AJTHBp');
const DEST_ADDRESS = Address.parse('0QDQlTWKDrG26BO2A7vpbce3dxKqfSzdt_v8BkJ54hKv1Vn0');

async function test() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };

  const collection = new SbtCollection(collectionData, TESTNET);
  const sbtItem = new SbtItem(collection);

  try {
    await sbtItem.transfer(wallet, SBT_ADDRESS, DEST_ADDRESS);
    console.log('\n✅ transfer executed successfully');
  } catch (e) {
    console.error('\n❌ transfer failed:', e);
  }
  try {
    await sbtItem.proveOwnership(wallet, SBT_ADDRESS, DEST_ADDRESS, new Cell(), false);
    console.log('\n✅ proveOwnership executed successfully');
  } catch (e) {
    console.error('\n❌ proveOwnership failed:', e);
  }
  try {
    await sbtItem.requestOwner(wallet, SBT_ADDRESS, DEST_ADDRESS, new Cell(), false);
    console.log('\n✅ requestOwner executed successfully');
  } catch (e) {
    console.error('\n❌ requestOwner failed:', e);
  }
  try {
    await sbtItem.destroySbt(wallet, SBT_ADDRESS);
    console.log('\n✅ destroySbt executed successfully');
  } catch (e) {
    console.error('\n❌ destroySbt failed:', e);
  }
  try {
    await sbtItem.revokeSbt(wallet, SBT_ADDRESS);
    console.log('\n✅ revokeSbt executed successfully');
  } catch (e) {
    console.error('\n❌ revokeSbt failed:', e);
  }
  try {
    await sbtItem.getStaticData(wallet, SBT_ADDRESS);
    console.log('\n✅ getStaticData executed successfully');
  } catch (e) {
    console.error('\n❌ getStaticData failed:', e);
  }
}

void test().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
