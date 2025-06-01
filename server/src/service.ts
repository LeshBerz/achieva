import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV5R1, internal, toNano, beginCell } from '@ton/ton';
import { Address, SendMode } from '@ton/core';

async function sendTransaction() {
  const tonClient = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    apiKey: 'API_KEY',
  });

  const mnemonic = '12/24 words';
  const keyPair = await mnemonicToWalletKey(mnemonic.split(' '));

  const wallet = tonClient.open(
    WalletContractV5R1.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    }),
  );

  const recipient = Address.parse(
    'recipient-address',
  );

  console.log('Sender balance:', (await tonClient.getBalance(wallet.address)).toString());
  console.log('Recipient balance:', (await tonClient.getBalance(recipient)).toString());

  const seqno = await wallet.getSeqno();
  const transfer = wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        to: recipient,
        value: toNano('0.1'),
        bounce: false,
        body: beginCell()
          .storeUint(0, 32)
          .storeStringTail('Hello from Achieva!')
          .endCell(),
      }),
    ],
    sendMode: SendMode.PAY_GAS_SEPARATELY | SendMode.IGNORE_ERRORS,
  });

  await wallet.send(transfer);
  console.log('\nTransaction sent successfully! 🚀');

  await new Promise(r => setTimeout(r, 15000));

  const transactions = await tonClient.getTransactions(wallet.address, { limit: 1 });
  const tx = transactions[0];

  console.log("Blockchain transaction ID:");
  console.log("hash:", tx?.hash().toString('hex'));
}

sendTransaction().catch(e => console.error('Error:', e));
