import * as dotenv from 'dotenv';

import { Address, Cell } from '@ton/core';

import { openWallet } from './utils';
import { SbtCollection } from './contracts/SbtCollection';
import { SbtItem } from './contracts/SbtItem';

dotenv.config();

export const TESTNET = Boolean(process.env.TESTNET);
const SBT_ADDRESS = Address.parse('EQDQhP-gQ5hTHii2ZMOqD5WS7f0vmBmrPwgjSa5cJV9018EL');
const DEST_ADDRESS = Address.parse('0QDQlTWKDrG26BO2A7vpbce3dxKqfSzdt_v8BkJ54hKv1Vn0');

async function test() {
  const wallet = await openWallet(process.env.MNEMONIC!.split(' '), TESTNET);

  const collectionData = {
    ownerAddress: wallet.contract.address,
    commonContentUrl: `ipfs://${process.env.METADATA_IPFS_HASH}/`,
  };

  const collection = new SbtCollection(collectionData, TESTNET);
  const sbtItem = new SbtItem(collection);

  console.log('\nproveOwnership:', await sbtItem.proveOwnership(wallet, SBT_ADDRESS, DEST_ADDRESS, new Cell(), false));
  console.log('\nrequestOwner:', await sbtItem.requestOwner(wallet, SBT_ADDRESS, DEST_ADDRESS, new Cell(), false));
  console.log('\ndestroySbt:', await sbtItem.destroySbt(wallet, SBT_ADDRESS));
  console.log('\nrevokeSbt:', await sbtItem.revokeSbt(wallet, SBT_ADDRESS));
}

void test().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
