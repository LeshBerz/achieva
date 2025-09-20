import "@stdlib/common";

struct Storage {
    next_item_index: int64;
    collection_content: cell;
    owner: address;
    authority: address;
    item_code: cell;
}

fun Storage.load() {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(storage: Storage) {
    contract.setData(storage.toCell());
}

fun deploy(body: slice, sender: address) {
    var collection_content = body.loadRef();
    var item_code = body.loadRef();

    var storage = Storage {
        next_item_index: 0,
        collection_content: collection_content,
        owner: sender,
        authority: sender,
        item_code: item_code
    };
    Storage.save(storage);
}

fun mint(to: address, item_content: cell, sender: address) {
    var storage = lazy Storage.load();
    if (sender != storage.owner) {
        throw(403);
    }

    var item_index = storage.next_item_index;
    storage.next_item_index += 1;
    Storage.save(storage);

    var item_data = beginCell()
        .storeInt(item_index, 64)
        .endCell();

    var state_init = ContractState {
        code: storage.item_code,
        data: item_data
    };

    var msg = createMessage({
        bounce: true,
        value: ton("0.05"),
        dest: AutoDeployAddress {
            workchain: 0,
            stateInit: state_init
        },
        body: beginCell()
            .storeUint(0x01, 32)  // op = 1 (init)
            .storeUint(0, 64)
            .storeAddress(to)
            .storeRef(item_content)
            .endCell()
    });

    msg.send(SEND_MODE_PAY_FEES_SEPARATELY);  // Mode 1: платим газ отдельно
}

fun onInternalMessage(in: InMessage) {
    var cs = in.body;
    var op = cs.loadUint(32);

    if (op == 0) {
        // op = 0 для deploy
        deploy(cs, in.senderAddress);
    } else if (op == 1) {
        // op = 1 для mint
        var to = cs.loadAddress();
        var item_content = cs.loadRef();
        mint(to, item_content, in.senderAddress);
    } else {
        throw(404);
    }
}

get fun getNftAddressByIndex(index: int64): address {
    var storage = lazy Storage.load();

    var item_data = beginCell()
        .storeInt(index, 64)
        .endCell();

    var state_init = ContractState {
        code: storage.item_code,
        data: item_data
    };

    var addr_builder = AutoDeployAddress {
        workchain: 0,
        stateInit: state_init
    }.buildAddress();

    return address.fromValidBuilder(addr_builder);
}

get fun getCollectionData(): (int64, cell, address) {
    var storage = lazy Storage.load();
    return (storage.next_item_index, storage.collection_content, storage.owner);
}
