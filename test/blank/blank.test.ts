import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import turpialFactory from "./typedContract/constructors/turpial";
import turpial from "./typedContract/contracts/turpial";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("turpial test", () => {
  let turpialFactory: turpialFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  
  let contract: turpial;
  const initialState = true;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");

    turpialFactory = new turpialFactory(api, deployer);

    contract = new turpial(
      (await turpialFactory.new(initialState)).address,
      deployer,
      api
    );
  });

  after(async function tearDown() {
    await api.disconnect();
  });
});
