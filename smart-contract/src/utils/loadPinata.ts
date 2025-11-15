import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

import pinataSDK from '@pinata/sdk';

dotenv.config();

export async function uploadFolderToIPFS(folderPath: string): Promise<string> {
  const pinata = new pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_API_SECRET,
  });

  const response = await pinata.pinFromFS(folderPath);
  return response.IpfsHash;
}

export async function updateMetadataFiles(metadataFolderPath: string, imagesIpfsHash: string): Promise<void> {
  const files = readdirSync(metadataFolderPath);

  for (const filename of files) {
    const filePath = path.join(metadataFolderPath, filename);
    const file = await readFile(filePath);
    const metadata = JSON.parse(file.toString());

    if (filename === 'collection.json') {
      metadata.image = `ipfs://${imagesIpfsHash}/logo.png`;
    } else if (filename === 'item.json') {
      metadata.image = `ipfs://${imagesIpfsHash}/item.png`;
    }

    await writeFile(filePath, JSON.stringify(metadata));
  }
}
