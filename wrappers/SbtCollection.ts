import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SbtCollectionConfig = {
  owner: Address;
  collectionContent: Cell;
};

export function sbtCollectionConfigToCell(config: SbtCollectionConfig): Cell {
  return beginCell()
    .storeInt(0, 64)
    .storeRef(config.collectionContent)
    .storeAddress(config.owner)
    .storeAddress(config.owner)
    .endCell();
}

export class SbtCollection implements Contract {
  constructor(readonly address: Address) {
  }

  static createFromAddress(address: Address) {
    return new SbtCollection(address);
  }

  static async createFromConfig(config: SbtCollectionConfig, code: Cell, workchain = 0) {
    const data = sbtCollectionConfigToCell(config);
    const init = { code, data };
    return new SbtCollection(contractAddress(workchain, init));
  }

  // === Messages ===

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0, 32) // op = 0 (deploy)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  async sendMint(provider: ContractProvider, via: Sender, value: bigint, to: Address, itemContent: Cell) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0x01, 32) // op = 1 (mint)
        .storeUint(0, 64)
        .storeAddress(to)
        .storeRef(itemContent)
        .endCell(),
    });
  }

  // === Getters ===

  async getCollectionData(provider: ContractProvider): Promise<[bigint, Cell, Address]> {
    const result = await provider.get('get_collection_data', []);
    return [
      result.stack.readBigNumber(),
      result.stack.readCell(),
      result.stack.readAddress(),
    ];
  }

  async getNftAddressByIndex(provider: ContractProvider, index: bigint): Promise<Address> {
    const result = await provider.get('get_nft_address_by_index', [{ type: 'int', value: index }]);
    return result.stack.readAddress();
  }
}
