import { TempleWallet } from "@temple-wallet/dapp";

(async () => {
  try {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }

    // Note:

    // use `TempleWallet.isAvailable` method only after web application fully loaded.

    // Alternatively, you can use the method `TempleWallet.onAvailabilityChange`
    // that tracks availability in real-time .

    const wallet = new TempleWallet("My Super DApp");
    await wallet.connect("carthagenet");
    const tezos = wallet.toTezos();

    const accountPkh = await tezos.wallet.pkh();
    const accountBalance = await tezos.tz.getBalance(accountPkh);
    console.info(`address: ${accountPkh}, balance: ${accountBalance}`);

    const counter = await tezos.wallet.at(
      "KT1DjYkruvfujfKw6nLYafArqKufcwHuKXvT"
    );

    const operation = await counter.methods.increment(1).send();
    await operation.confirmation();

    const counterValue = await counter.storage();
    console.info(`count: ${counterValue}`);
  } catch (err) {
    console.error(err);
  }
})();