import "@stdlib/common";

struct Storage {
    next_item_index: int64;
    collection_content: Cell;
    owner: Address;
    authority: Address;
}

fun Storage.load() {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(storage: Storage) {
    contract.setData(storage.toCell());
}

fun deploy(in: InMessage) {
    var storage = Storage {
        next_item_index: 0,
        collection_content: in.body.loadCell(),
        owner: in.sender,
        authority: in.sender
    };
    storage.save();
}

fun mint(to: Address, item_content: Cell, in: InMessage) {
    var storage = lazy Storage.load();
    if (in.sender != storage.owner) {
        throw("Not owner");
    }

    var item_index = storage.next_item_index;
    storage.next_item_index += 1;
    storage.save();

    var item_address = addressFromWorkchain(
        0,
        sha256(contract.code() + item_index.toSlice())
    );

    sendMessage(item_address, {
        op: 0x01,
        query_id: 0,
        index: item_index,
        owner: to,
        content: item_content,
        collection: contract.address()
    }, ton("0.05"));
}

get fun getNftAddressByIndex(index: int64): Address {
    return addressFromWorkchain(0, sha256(contract.code() + index.toSlice()));
}

get fun getCollectionData(): (int64, Cell, Address) {
    var storage = lazy Storage.load();
    return (storage.next_item_index, storage.collection_content, storage.owner);
}
