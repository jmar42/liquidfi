# Liquidfi

Liquidfi is a phone web wallet for Stellar trading bots, in one self-contained HTML file. It runs entirely in the browser and talks straight to Stellar's Horizon servers. There is no backend of its own.

**Open it:** the `index.html` in this repository, served by GitHub Pages.

## What it does

- **P/L:** value change of your trading accounts for Today, Yesterday, This week, Last week, This month, Last month and 6 months. Each account also shows a quote line for the asset it trades (last, change, % change). Only Today loads on open; other periods load when tapped.
- **Accounts:** Personal wallets and trading accounts in one list. Trade XLM/USDC (limit or market), send to saved addresses, receive by QR, add trustlines.
- **Kill switch:** Cancel all orders, or Flatten (cancel and close open trades at market), on every trading account, from your phone, when the PC that runs the bots is off.
- **Activity:** recent buys and sells across all accounts.
- **Server choice:** Settings → Server. Stellar (SDF) is the default; LOBSTR's public Horizon (Mainnet) or any custom Horizon address can be picked instead. A custom server is checked before it is saved (it must use https, allow browser access (CORS), be on the selected network and be up to date). If the chosen server is down or rate-limited, Liquidfi falls back automatically: your choice → LOBSTR → SDF.

## Security model

- **Keys stay on your device.** Keys are created or imported on the phone and sealed with your PIN (PBKDF2-SHA256, 600,000 rounds, AES-GCM) in the browser's storage. They are never sent anywhere.
- **Bots use an emergency signer, not their own keys.** The phone makes an emergency key. From the PC you add it to each bot account as a signer with weight 1, the master key at weight 2, and thresholds 1/1/2. The phone can then trade and cancel on those accounts, but it can't change their signers. Lose the phone? Remove that signer from the PC.
- **Nothing personal is built in.** This file contains no account addresses. You add your own accounts in Settings, and they are saved on your device only.
- Starts on **Testnet**. Switching to Mainnet requires typing `MAINNET`.
- Auto-locks after 2 minutes. Wrong PINs back off. Every action that sends a transaction is hold-to-confirm.

Whoever controls the hosted file controls the code your phone runs. Protect the GitHub account with 2-factor login, and check the version on the unlock screen.

## Build

`src/app.html` is the source. The Stellar SDK and a QR library are inlined at build time:

```
cd src
npm i
node build.js        # writes killswitch.html
```

Copy the result to `index.html` at the root of the repository.

Dependencies: `@stellar/stellar-sdk` 17.2.1 and `qrcode-generator` 2.0.4.

## Disclaimer

Experimental software. Use at your own risk. Try everything on Testnet first (Settings → Create practice bots). Nothing here is financial advice.
