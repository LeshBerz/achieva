import { toNano, beginCell, Address } from '@ton/core';
import { SbtCollection } from '../wrappers/SbtCollection';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const collectionAddress = Address.parse('EQC6FsffoI9Bd98C6je24LWyVvQWeQvju2tvkKhTHfVzGBzO'); // Адрес коллекции

  const sbtCollection = provider.open(SbtCollection.createFromAddress(collectionAddress));

  const itemContent = beginCell()
    .storeStringTail(JSON.stringify({
      name: 'My SBT #1',
      description: 'My first soulbound token',
      image: 'https://raw.githubusercontent.com/diananiki/amely/main/amely.png',
    }))
    .endCell();

  await sbtCollection.sendMint(
    provider.sender(),
    toNano('0.005'),
    provider.sender().address!,
    itemContent,
  );

  console.log('SBT minted to: ' + provider.sender().address!.toString());
}
