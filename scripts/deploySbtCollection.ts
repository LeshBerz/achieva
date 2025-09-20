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

  const sbtCollection = provider.open(await SbtCollection.createFromConfig({
    owner: provider.sender().address!,
    collectionContent,
    itemCode,
  }, code));

  await sbtCollection.sendDeploy(provider.sender(), toNano('0.05'));

  console.log('Collection deployed at: ' + sbtCollection.address.toString());
}
