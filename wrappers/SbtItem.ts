import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SbtItemConfig = {
  index: bigint;
  collection: Address;
  owner: Address;
  content: Cell;
};

export function sbtItemConfigToCell(config: SbtItemConfig): Cell {
  return beginCell()
    .storeUint(config.index, 64)
    .storeAddress(config.collection)
    .storeAddress(config.owner)
    .storeRef(config.content)
    .endCell();
}

export class SbtItem implements Contract {
  constructor(readonly address: Address) {
  }

  static createFromAddress(address: Address) {
    return new SbtItem(address);
  }

  static async createFromConfig(config: SbtItemConfig, code: Cell, workchain = 0) {
    const data = sbtItemConfigToCell(config);
    const init = { code, data };
    return new SbtItem(contractAddress(workchain, init));
  }

  // === Messages ===

  async sendDestroy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0x02, 32) // op = 2 (destroy)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  // === Getters ===

  async getNftData(provider: ContractProvider): Promise<[bigint, Address, Cell]> {
    const result = await provider.get('get_nft_data', []);
    return [
      result.stack.readBigNumber(),
      result.stack.readAddress(),
      result.stack.readCell(),
    ];
  }

  async getOwner(provider: ContractProvider): Promise<Address> {
    const result = await provider.get('get_owner', []);
    return result.stack.readAddress();
  }
}
