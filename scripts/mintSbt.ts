import { toNano, beginCell, Address } from '@ton/core';
import { SbtCollection } from '../wrappers/SbtCollection';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const collectionAddress = Address.parse('EQ...'); // адрес после деплоя

  const sbtCollection = provider.open(SbtCollection.createFromAddress(collectionAddress));

  const itemContent = beginCell()
    .storeStringTail(JSON.stringify({
      name: 'My SBT #1',
      description: 'My first soulbound token',
      image: 'https://i.imgur.com/your-sbt-image.png',
    }))
    .endCell();

  await sbtCollection.sendMint(
    provider.sender(),
    toNano('0.05'),
    provider.sender().address!,
    itemContent,
  );

  console.log('SBT minted to: ' + provider.sender().address!.toString());
}
