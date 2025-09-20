import "@stdlib/common";

struct Storage {
    index: int64;
    collection: Address;
    owner: Address;
    content: Cell;
}

fun Storage.load() {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(storage: Storage) {
    contract.setData(storage.toCell());
}

fun init(in: InMessage) {
    var storage = Storage {
        index: in.body.loadInt(64),
        collection: in.sender,
        owner: in.body.loadAddress(),
        content: in.body.loadCell()
    };
    storage.save();
}

fun transfer(to: Address) {
    throw("SBT cannot be transferred");
}

fun destroy(in: InMessage) {
    var storage = lazy Storage.load();
    if (in.sender != storage.owner) {
        throw("Not owner");
    }
    storage.owner = Address.none();
    storage.save();
}

get fun getNftData(): (int64, Address, Cell) {
    var storage = lazy Storage.load();
    return (storage.index, storage.owner, storage.content);
}

get fun getOwner(): Address {
    return lazy Storage.load().owner;
}
