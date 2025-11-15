import path from 'path';

import { updateMetadataFiles, uploadFolderToIPFS, updateEnvFile } from '../utils';

const _path = [__dirname, '..',  '..'];

async function init() {
  const metadataFolderPath = path.resolve(..._path, 'data', 'metadata');
  const imagesFolderPath = path.resolve(..._path, 'data', 'images');

  console.log(metadataFolderPath, imagesFolderPath);

  console.log('Started uploading images to IPFS...');
  const imagesIpfsHash = await uploadFolderToIPFS(imagesFolderPath);
  console.log(
    `Successfully uploaded the pictures to ipfs: https://gateway.pinata.cloud/ipfs/${imagesIpfsHash}`,
  );

  console.log('Started uploading metadata files to IPFS...');
  await updateMetadataFiles(metadataFolderPath, imagesIpfsHash);
  const metadataIpfsHash = await uploadFolderToIPFS(metadataFolderPath);
  console.log(
    `Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`,
  );
  updateEnvFile(_path, 'METADATA_IPFS_HASH', metadataIpfsHash);
}

void init().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
