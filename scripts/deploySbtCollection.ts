import { toNano, beginCell } from '@ton/core';
import { SbtCollection } from '../wrappers/SbtCollection';
import { NetworkProvider, compile } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const collectionContent = beginCell()
    .storeStringTail(JSON.stringify({
      name: 'My SBT Collection',
      description: 'Soulbound tokens collection',
      image: 'https://raw.githubusercontent.com/diananiki/amely/main/amely.png',
    }))
    .endCell();

  const code = await compile('SbtCollection');
  const itemCode = await compile('SbtItem');

  const config = {
    owner: provider.sender().address!,
    collectionContent,
    itemCode,
  };

  const sbtCollection = await SbtCollection.sendDeploy(
    provider.sender(),
    toNano('0.05'),
    config,
    code,
  );

  console.log('Collection deployed at: ' + sbtCollection.address.toString());
}
