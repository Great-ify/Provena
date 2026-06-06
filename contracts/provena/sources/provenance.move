module provena::provenance {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use std::string::{String};

    /// Error codes
    const EAssetAlreadyRegistered: u64 = 0;
    const EIncorrectAmount: u64 = 1;

    /// Shared Registry system holding all assets
    public struct ProvenanceRegistry has key {
        id: UID,
    }

    /// On-chain representation of a registered digital asset
    public struct Asset has key, store {
        id: UID,
        sha256_hash: String,
        blob_id: String,
        owner: address,
        title: String,
        license_price: u64, // Price in Mist
        timestamp: u64,
    }

    /// On-chain Licence representation
    public struct LicenseReceipt has key {
        id: UID,
        asset_id: ID,
        buyer: address,
        license_type: String,
        price_paid: u64,
        timestamp: u64,
    }

    // Events
    public struct AssetRegisteredEvent has copy, drop {
        asset_id: ID,
        sha256_hash: String,
        blob_id: String,
        owner: address,
        title: String,
    }

    public struct LicensePurchasedEvent has copy, drop {
        receipt_id: ID,
        asset_id: ID,
        buyer: address,
        price_paid: u64,
    }

    // Initialize the module by creating and sharing the Registry
    fun init(ctx: &mut TxContext) {
        let registry = ProvenanceRegistry {
            id: object::new(ctx),
        };
        transfer::share_object(registry);
    }

    // Creator registers an original asset
    public entry fun register_asset(
        _registry: &mut ProvenanceRegistry,
        title: String,
        sha256_hash: String,
        blob_id: String,
        license_price: u64,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let id_obj = object::new(ctx);
        let asset_id = object::uid_to_inner(&id_obj);

        let asset = Asset {
            id: id_obj,
            sha256_hash,
            blob_id,
            owner: sender,
            title,
            license_price,
            timestamp,
        };

        // Emit trace registration log events
        event::emit(AssetRegisteredEvent {
            asset_id,
            sha256_hash,
            blob_id,
            owner: sender,
            title,
        });

        // Transfer the asset module back to the registerer sender
        transfer::transfer(asset, sender);
    }

    // Buyer purchases a license for a registered asset
    public entry fun buy_license(
        asset: &Asset,
        mut payment: Coin<SUI>,
        license_type: String,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        let price = asset.license_price;

        assert!(coin::value(&payment) >= price, EIncorrectAmount);

        // Split exact price to pay creator
        let paid_coin = coin::split(&mut payment, price, ctx);
        transfer::public_transfer(paid_coin, asset.owner);

        // Send remaining change back
        if (coin::value(&payment) > 0) {
            transfer::public_transfer(payment, buyer);
        } else {
            coin::destroy_zero(payment);
        };

        let receipt_uid = object::new(ctx);
        let receipt_id = object::uid_to_inner(&receipt_uid);
        let asset_id = object::id(asset);

        let receipt = LicenseReceipt {
            id: receipt_uid,
            asset_id,
            buyer,
            license_type,
            price_paid: price,
            timestamp,
        };

        event::emit(LicensePurchasedEvent {
            receipt_id,
            asset_id,
            buyer,
            price_paid: price,
        });

        transfer::transfer(receipt, buyer);
    }
}
