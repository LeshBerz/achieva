import "@stdlib/common";
import "constants";

struct Storage {
    owner: address;
    next_item_index: int64;
    collection_content: cell;
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
        owner: sender,
        next_item_index: 0,
        collection_content: collection_content,
        item_code: item_code
    };

    Storage.save(storage);
}

fun mint(to: address, item_content: cell, authority: address, sender: address) {
    var storage = lazy Storage.load();

    if (sender != storage.owner) {
        throw(ERROR_FORBIDDEN);
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
            .storeUint(OP_INIT, 32)
            .storeUint(0, 64)
            .storeAddress(contract.getAddress())
            .storeAddress(to)
            .storeAddress(authority)
            .storeRef(item_content)
            .endCell()
    });

    msg.send(SEND_MODE_CARRY_ALL_REMAINING_MESSAGE_VALUE);
}

fun onInternalMessage(in: InMessage) {
    var cs = in.body;
    var op = cs.loadUint(32);

    if (op == OP_DEPLOY) {
        deploy(cs, in.senderAddress);
    } else if (op == OP_MINT) {
        var to = cs.loadAddress();
        var authority = cs.loadAddress();
        var item_content = cs.loadRef();
        mint(to, item_content, authority, in.senderAddress);
    } else {
        throw(ERROR_NOT_FOUND);
    }
}

get fun get_nft_address_by_index(index: int): address {
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

get fun get_collection_data(): (int, cell, address) {
    var storage = lazy Storage.load();
    return (storage.next_item_index as int, storage.collection_content, storage.owner);
}

get fun get_nft_content(item_index: int, individual_content: cell): cell {
    return individual_content;
}
