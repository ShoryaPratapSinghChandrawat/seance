# SÉANCE

**A digital archaeology lab for software left behind by the web.** SÉANCE is an open-source project exploring how to inspect and preserve legacy Flash experiences safely in the browser.

> **Status: In development.** This repository is in its foundation phase; analysis, runtime, diagnosis, and passport features are not implemented yet.

## Run locally

Requires Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

Run the foundation tests with `npm test` and create a production build with `npm run build`.

## Scope

Version 1 focuses on SWF artifacts and the Ruffle Flash emulator. Uploaded artifacts are intended to run only in the user's browser. See `.kiro/specs/seance-core/` for the human-authored requirements and design.
