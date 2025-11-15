import { TonClient } from '@ton/ton';

import {
  Address,
  Cell,
  beginCell,
  contractAddress,
  internal,
  SendMode,
  StateInit,
} from '@ton/core';
import fs from 'fs';
import path from 'path';

import { encodeOffChainContent, OpenedWallet } from '../utils';

export type SbtCollectionData = {
  ownerAddress: Address;
  commonContentUrl: string;
}

export type mintParams = {
  itemOwnerAddress: Address,
  authorityAddress?: Address,
}

const COLLECTION_PATH = './src/utils/boc/sbt_collection.boc';
const ITEM_PATH = './src/utils/boc/sbt_item.boc';

export class SbtCollection {
  private data: SbtCollectionData;
  readonly testnet: boolean;

  constructor(data: SbtCollectionData, testnet: boolean) {
    this.data = data;
    this.testnet = testnet;
  }

  private createCodeCell(_path: string): Cell {
    const bocPath = path.resolve(_path);
    const boc = fs.readFileSync(bocPath);
    return Cell.fromBoc(boc)[0];
  }

  private createDataCell(): Cell {
    const collectionContent = encodeOffChainContent(`${this.data.commonContentUrl}/collection.json`);
    const commonContent = encodeOffChainContent(this.data.commonContentUrl);

    const contentCell = beginCell()
      .storeRef(collectionContent)
      .storeRef(commonContent)
      .endCell();

    return beginCell()
      .storeUint(0, 64)
      .storeRef(contentCell)
      .storeAddress(this.data.ownerAddress)
      .storeAddress(this.data.ownerAddress)
      .storeRef(this.createCodeCell(ITEM_PATH))
      .endCell();
  }

  public get stateInit(): StateInit {
    const code = this.createCodeCell(COLLECTION_PATH);
    const data = this.createDataCell();
    return { code, data };
  }

  public get address(): Address {
    return contractAddress(0, this.stateInit);
  }

  public async deploy(wallet: OpenedWallet) {
    const seqno = await wallet.contract.getSeqno();
    const contentCell = encodeOffChainContent(`${this.data.commonContentUrl}/collection.json`);
    const itemCodeCell = this.createCodeCell(ITEM_PATH);

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          to: this.address,
          value: '0.05',
          init: this.stateInit,
          body: beginCell()
            .storeUint(0, 32)
            .storeUint(0, 64)
            .storeRef(contentCell)
            .storeRef(itemCodeCell)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public createMintBody(params: mintParams): Cell {
    const contentCell = encodeOffChainContent(`${this.data.commonContentUrl}/item.json`);
    const authority = params.authorityAddress || this.data.ownerAddress;

    return beginCell()
      .storeUint(1, 32)
      .storeAddress(params.itemOwnerAddress)
      .storeAddress(authority)
      .storeRef(contentCell)
      .endCell();
  }

  public async getCollectionData(): Promise<{
    nextItemIndex: number;
    collectionContent: Cell;
    owner: Address;
  }> {
    const client = new TonClient({
      endpoint: this.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      this.address,
      'get_collection_data',
    );

    return {
      nextItemIndex: response.stack.readNumber(),
      collectionContent: response.stack.readCell(),
      owner: response.stack.readAddress(),
    };
  }

  public async getNftAddressByIndex(index: number): Promise<Address> {
    const client = new TonClient({
      endpoint: this.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      this.address,
      'get_nft_address_by_index',
      [{ type: 'int', value: BigInt(index) }],
    );

    return response.stack.readAddress();
  }

  public async getNftContent(
    itemIndex: number,
    individualContent: Cell,
  ): Promise<Cell> {
    const client = new TonClient({
      endpoint: this.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      this.address,
      'get_nft_content',
      [
        { type: 'int', value: BigInt(itemIndex) },
        { type: 'cell', cell: individualContent },
      ],
    );

    return response.stack.readCell();
  }
}
