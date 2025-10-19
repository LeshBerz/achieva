import "@stdlib/common";

struct Storage {
    index: int64;
    collection: address;
    owner: address;
    content: cell;
}

fun Storage.load() {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(storage: Storage) {
    contract.setData(storage.toCell());
}

fun init(body: slice, sender: address) {
    var data_cs = contract.getData().beginParse();
    var index = data_cs.loadInt(64);

    body.loadUint(32);  // Пропускаем op (0x01)
    body.loadUint(64);  // Пропускаем query_id

    var to = body.loadAddress();

    var item_content = body.loadRef();

    var storage = Storage {
        index: index,
        collection: sender,
        owner: to,
        content: item_content
    };
    Storage.save(storage);
}

fun transfer(to: address) {
    throw(405);
}

fun destroy(sender: address) {
    var storage = lazy Storage.load();
    if (sender != storage.owner) {
        throw(403);
    }
    storage.owner = createAddressNone();
    Storage.save(storage);
}

fun onInternalMessage(in: InMessage) {
    var cs = in.body;
    var op = cs.loadUint(32);

    if (op == 1) {
        // op = 1 для init
        init(cs, in.senderAddress);
    } else if (op == 2) {
        // op = 2 для destroy
        destroy(in.senderAddress);
    } else {
        throw(404);
    }
}

get fun get_nft_data(): (int, cell, address, address, cell) {
    var storage = lazy Storage.load();
    return (
        0,
        beginCell().storeInt(storage.index, 64).endCell(),
        storage.collection,
        storage.owner,
        storage.content
    );
}

get fun get_owner(): address {
    var storage = lazy Storage.load();
    return storage.owner;
}
