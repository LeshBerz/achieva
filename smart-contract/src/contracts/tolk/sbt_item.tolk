import "@stdlib/common";

struct Storage {
    index: int64;
    collection: address;
    owner: address;
    authority: address;
    content: cell;
    revoked_at: int64;
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

    var collection_addr = body.loadAddress();
    var to = body.loadAddress();
    var authority_address = body.loadAddress();
    var item_content = body.loadRef();

    if (collection_addr != sender) {
        throw(403);
    }

    var storage = Storage {
        index: index,
        collection: collection_addr,
        owner: to,
        authority: authority_address,
        content: item_content,
        revoked_at: 0
    };

    Storage.save(storage);
}

fun transfer(sender: address) {
    throw(405);
}

fun prove_ownership(query_id: int64, dest: address, forward_payload: cell, with_content: bool, sender: address) {
    var storage = lazy Storage.load();

    if (sender != storage.owner) {
        throw(403);
    }

    var msg_body = beginCell()
        .storeUint(0x0524c7ae, 32)
        .storeUint(query_id, 64)
        .storeUint(storage.index, 256)
        .storeAddress(storage.owner)
        .storeRef(forward_payload)
        .storeUint(storage.revoked_at, 64);

    if (with_content) {
        msg_body.storeUint(1, 1);
        msg_body.storeRef(storage.content);
    } else {
        msg_body.storeUint(0, 1);
    }

    var msg = createMessage({
        bounce: false,
        value: 0,
        dest: dest,
        body: msg_body.endCell()
    });

    msg.send(SEND_MODE_CARRY_ALL_REMAINING_MESSAGE_VALUE);
}

fun request_owner(query_id: int64, dest: address, forward_payload: cell, with_content: bool, sender: address) {
    var storage = lazy Storage.load();

    var msg_body = beginCell()
        .storeUint(0x0dd607e3, 32)
        .storeUint(query_id, 64)
        .storeUint(storage.index, 256)
        .storeAddress(sender)
        .storeAddress(storage.owner)
        .storeRef(forward_payload)
        .storeUint(storage.revoked_at, 64);

    if (with_content) {
        msg_body.storeUint(1, 1);
        msg_body.storeRef(storage.content);
    } else {
        msg_body.storeUint(0, 1);
    }

    var msg = createMessage({
        bounce: false,
        value: 0,
        dest: dest,
        body: msg_body.endCell()
    });

    msg.send(SEND_MODE_CARRY_ALL_REMAINING_MESSAGE_VALUE);
}

fun destroy(query_id: int64, sender: address) {
    var storage = lazy Storage.load();
    if (sender != storage.owner) {
        throw(403);
    }

    storage.owner = createAddressNone();
    storage.authority = createAddressNone();
    Storage.save(storage);

    var msg_body = beginCell()
        .storeUint(0xd53276db, 32)
        .storeUint(query_id, 64)
        .endCell();

    var msg = createMessage({
        bounce: false,
        value: 0,
        dest: sender,
        body: msg_body
    });

    msg.send(SEND_MODE_CARRY_ALL_BALANCE);
}

fun revoke(query_id: int64, sender: address) {
    var storage = lazy Storage.load();
    if (sender != storage.authority) {
        throw(403);
    }
    if (storage.revoked_at > 0) {
        throw(403);
    }

    storage.revoked_at = blockchain.now();

    Storage.save(storage);
}

fun onInternalMessage(in: InMessage) {
    var cs = in.body;
    var op = cs.loadUint(32);
    var query_id = cs.loadUint(64);

    if (op == 0x01) { // init
        init(cs, in.senderAddress);
    } else if (op == 0x5fcc3d14) { // transfer
        transfer(in.senderAddress);
    } else if (op == 0x04ded148) { // prove_ownership
        var dest = cs.loadAddress();
        var forward_payload = cs.loadRef();
        var with_content = cs.loadBool();
        prove_ownership(query_id, dest, forward_payload, with_content, in.senderAddress);
    } else if (op == 0xd0c3bfea) { // request_owner
        var dest = cs.loadAddress();
        var forward_payload = cs.loadRef();
        var with_content = cs.loadBool();
        request_owner(query_id, dest, forward_payload, with_content, in.senderAddress);
    } else if (op == 0x1f04537a) { // destroy
        destroy(query_id, in.senderAddress);
    } else if (op == 0x6f89f5e3) { // revoke
        revoke(query_id, in.senderAddress);
    } else {
        throw(404);
    }
}

get fun get_nft_data(): (int, int, address, address, cell) {
    var storage = lazy Storage.load();
    var is_initialized = storage.owner.isNone() ? 0 : 1;
    return (is_initialized, storage.index as int, storage.collection, storage.owner, storage.content);
}

get fun get_authority_address(): address {
    var storage = lazy Storage.load();
    return storage.authority;
}

get fun get_revoked_time(): int {
    var storage = lazy Storage.load();
    return storage.revoked_at as int;
}

get fun get_static_data_info(): (int, address) {
    var storage = lazy Storage.load();
    return (storage.index as int, storage.collection);
}

get fun get_owner(): address {
    var storage = lazy Storage.load();
    return storage.owner;
}
