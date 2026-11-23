# Liquidfi

Liquidfi is a self-custody phone web wallet for Stellar, the XRP Ledger and Solana, in one self-contained HTML file. It runs in the browser. Your keys are made on your phone and never leave it.

Some optional features, like stop orders and notifications, use Liquidfi's server.

**Open it:** the `index.html` in this repository, served by GitHub Pages. Add it to your home screen to use it like an app.

## What it does

- **Markets:** a watchlist of symbols with bid, ask and last from the Stellar DEX, Coinbase, Kraken and Binance.US. Tap a symbol for the order book and last sales across markets, and for charts.
- **Accounts and Portfolio:** every wallet on every network in one list, with the total in USD and a breakdown by coin. P/L for Today, Yesterday, This week, Last week and longer.
- **Trade:**
  - limit and market orders on Stellar (XLM/USDC and other pairs), the XRP Ledger (XRP against RLUSD or USDC, and RLUSD/USDC) and Solana (SOL against USDC or USDT, through Jupiter and Manifest);
  - open orders can be edited or cancelled.
- **Stop orders:** on all three networks.
  - You sign the order on your phone ahead of time.
  - The Liquidfi server watches the price and sends the signed order when the stop is hit.
  - A worst-price cap (and on Stellar, a price guard against the exchanges) keeps a stop from filling far from the market.
- **Swap:** in one step on a network. Across networks it goes through NEAR Intents; the app shows the route and the minimum you get before you confirm.
- **Send and receive:**
  - QR codes and saved, checked addresses;
  - memos, with an optional private memo that only you and the receiver can read;
  - XRP Ledger tokens as well as XRP.
- **Earn:** Stellar AMM pools, and lending on Solana through Jupiter Lend.
- **Activity:** buys and sells across all your wallets, with each fill, the venue and the fees.
- **Notifications:** for stop orders, for order fills on the wallets you choose, and when money arrives. Tapping one opens its details.
- **Cancel all:** cancel every open order on your Stellar wallets in one tap. Trading wallets can also close their open trades at market.
- **Wallets:**
  - Create a wallet from a 24-word recovery phrase (BIP39; Stellar SEP-5, the same as LOBSTR, Freighter and Stellar Laboratory), or import a secret key or phrase.
  - One phrase backs up your Stellar, XRP Ledger and Solana wallets.
  - The phrase and each key can be shown or copied after you re-enter your PIN.
- **Buy with a card:** checkout runs on a separate page (buy.liquidfi.com) with the payment provider. Card and identity details go to the provider, not to Liquidfi.

## Fees

- **Network fees** go to the network.
- **0.25% Liquidfi fee, shown before you confirm:** swaps, market orders, stop orders, Solana limit sweeps (the part of a limit order that fills right away) and Solana lending deposits (Earn).
- **No Liquidfi fee:** limit orders resting on the book, Stellar and XRP Ledger pools (Earn), and sending.
- **Third-party providers** (card checkout, NEAR Intents) set their own fees.

## Servers

- **Stellar:** Horizon from the Stellar Development Foundation by default; LOBSTR's Horizon, or any Horizon address you enter, in Settings → Server. If a server is down or rate-limited, the app falls back automatically: your choice → LOBSTR → SDF.
- **XRP Ledger:** public XRP Ledger servers (xrplcluster.com, s1/s2.ripple.com), or your own server in Settings → XRP Ledger server.
- **Solana:** through the Liquidfi server by default, or your own Solana RPC (yours, or a Helius, Alchemy or QuickNode address) in Settings → Solana server.

Public servers see your IP address and the wallet addresses you look up. Running your own server keeps that private.

## Security model

- **Keys stay on your device.** They are created or imported on the phone and sealed with your PIN (PBKDF2-SHA256, 600,000 rounds, AES-GCM) in the browser's storage. They are never sent anywhere, including to the Liquidfi server.
- **Stop orders hold no keys.** The phone signs the stop order in advance. The server keeps only that signed order and sends it when the stop is hit. It can't sign anything else, and you can cancel from the phone.
- **Nothing personal is built in.** The file contains no personal account addresses; the only addresses in the code are Liquidfi's fee wallets. You add your own wallets, and they are saved on your device only.
- **No third-party scripts in the wallet page.** Card checkout runs on its own page.
- **Locking:**
  - The app auto-locks after 2 minutes idle.
  - After 3 wrong PINs, each further try has to wait longer. Fingerprint unlock is optional.
  - Every action that sends a transaction is hold-to-confirm.

## Build

`src/app.html` is the source. The Stellar SDK, xrpl.js and the QR libraries are inlined at build time:

```
cd src
npm i
node build.js        # writes killswitch.html
```

Copy the result to `index.html` at the root of the repository.

Dependencies:

- `@stellar/stellar-sdk` 17.2.1
- `xrpl` 4.4.3
- `qrcode-generator` 2.0.4
- `jsqr` 1.4.0

## Disclaimer

Liquidfi is self-custody software. It is not a bank, broker, exchange, custodian or investment adviser, and nothing here is financial advice. Crypto assets are volatile and can lose all their value. Use at your own risk, and start with small amounts.
