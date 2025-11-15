import { internal, SendMode, Address, Cell, beginCell } from '@ton/core';
import { OpenedWallet } from 'utils';
import { SbtCollection, mintParams } from './SbtCollection';
import { TonClient } from '@ton/ton';

export class SbtItem {
  private collection: SbtCollection;

  constructor(collection: SbtCollection) {
    this.collection = collection;
  }

  public async deploy(
    wallet: OpenedWallet,
    params: mintParams,
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: this.collection.address,
          body: this.collection.createMintBody(params),
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });

    return seqno;
  }

  public async getAddressByIndex(
    collectionAddress: Address,
    itemIndex: number,
  ): Promise<Address> {
    const client = new TonClient({
      endpoint: this.collection.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      collectionAddress,
      'get_nft_address_by_index',
      [{ type: 'int', value: BigInt(itemIndex) }],
    );

    return response.stack.readAddress();
  }

  public async getNftData(itemAddress: Address): Promise<{
    isInitialized: boolean;
    index: number;
    collection: Address;
    owner: Address;
    content: Cell;
  }> {
    const client = new TonClient({
      endpoint: this.collection.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      itemAddress,
      'get_nft_data',
    );

    return {
      isInitialized: response.stack.readNumber() === 1,
      index: response.stack.readNumber(),
      collection: response.stack.readAddress(),
      owner: response.stack.readAddress(),
      content: response.stack.readCell(),
    };
  }

  public async getAuthorityAddress(itemAddress: Address): Promise<Address> {
    const client = new TonClient({
      endpoint: this.collection.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      itemAddress,
      'get_authority_address',
    );

    return response.stack.readAddress();
  }

  public async getRevokedTime(itemAddress: Address): Promise<number> {
    const client = new TonClient({
      endpoint: this.collection.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      itemAddress,
      'get_revoked_time',
    );

    return response.stack.readNumber();
  }

  public async getStaticData(itemAddress: Address): Promise<{
    index: number;
    collection: Address;
  }> {
    const client = new TonClient({
      endpoint: this.collection.testnet
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_API_KEY,
    });

    const response = await client.runMethod(
      itemAddress,
      'get_static_data_info',
    );

    return {
      index: response.stack.readNumber(),
      collection: response.stack.readAddress(),
    };
  }

  public async proveOwnership(
    wallet: OpenedWallet,
    itemAddress: Address,
    dest: Address,
    forwardPayload: Cell,
    withContent: boolean,
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: itemAddress,
          body: beginCell()
            .storeUint(0x04ded148, 32)
            .storeUint(0, 64)
            .storeAddress(dest)
            .storeRef(forwardPayload)
            .storeBit(withContent)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async requestOwner(
    wallet: OpenedWallet,
    itemAddress: Address,
    dest: Address,
    forwardPayload: Cell,
    withContent: boolean,
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: itemAddress,
          body: beginCell()
            .storeUint(0xd0c3bfea, 32)
            .storeUint(0, 64)
            .storeAddress(dest)
            .storeRef(forwardPayload)
            .storeBit(withContent)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async destroySbt(
    wallet: OpenedWallet,
    itemAddress: Address,
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: itemAddress,
          body: beginCell()
            .storeUint(0x1f04537a, 32)
            .storeUint(0, 64)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async revokeSbt(
    wallet: OpenedWallet,
    itemAddress: Address,
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: itemAddress,
          body: beginCell()
            .storeUint(0x6f89f5e3, 32)
            .storeUint(0, 64)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }
}
