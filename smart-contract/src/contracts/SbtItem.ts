import { internal, SendMode, Address, Cell, beginCell } from '@ton/core';

import { OpenedWallet } from 'utils';
import * as OP from '../utils/opCodesConst';
import { SbtCollection, mintParams } from './SbtCollection';

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
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async transfer(
    wallet: OpenedWallet,
    itemAddress: Address,
    newOwner: Address,
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
            .storeUint(OP.TRANSFER, 32)
            .storeUint(0, 64)
            .storeAddress(newOwner)
            .storeAddress(wallet.contract.address)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
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
            .storeUint(OP.PROVE_OWNERSHIP, 32)
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
            .storeUint(OP.REQUEST_OWNER, 32)
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
            .storeUint(OP.DESTROY, 32)
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
            .storeUint(OP.REVOKE, 32)
            .storeUint(0, 64)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async getStaticData(
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
            .storeUint(OP.GET_STATIC_DATA, 32)
            .storeUint(0, 64)
            .endCell(),
        }),
      ],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    return seqno;
  }

  public async getAddressByIndex(
    collectionAddress: Address,
    itemIndex: number,
  ): Promise<Address | null> {
    const response = await this.collection.client.runMethod(
      collectionAddress,
      'get_nft_address_by_index',
      [{ type: 'int', value: BigInt(itemIndex) }],
    );

    return response.stack.readAddressOpt();
  }

  public async getNftData(itemAddress: Address): Promise<{
    isInitialized: boolean;
    index: number;
    collection: Address;
    owner: Address | null;
    content: Cell;
  }> {
    const response = await this.collection.client.runMethod(
      itemAddress,
      'get_nft_data',
    );

    return {
      isInitialized: response.stack.readNumber() === 1,
      index: response.stack.readNumber(),
      collection: response.stack.readAddress(),
      owner: response.stack.readAddressOpt(),
      content: response.stack.readCell(),
    };
  }

  public async getAuthorityAddress(itemAddress: Address): Promise<Address | null> {
    const response = await this.collection.client.runMethod(
      itemAddress,
      'get_authority_address',
    );

    return response.stack.readAddressOpt();
  }

  public async getRevokedTime(itemAddress: Address): Promise<string> {
    const response = await this.collection.client.runMethod(
      itemAddress,
      'get_revoked_time',
    );

    const revokedDate = new Date(response.stack.readNumber() * 1000);

    return revokedDate.toISOString();
  }
}
