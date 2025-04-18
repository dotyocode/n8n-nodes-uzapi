# UZapi n8n Node

Custom **n8n** node that integrates with the **UZapi** WhatsApp API, enabling you to start sessions, retrieve status, generate QR codes, and send different message types (text, media, files, Base64, etc.).

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Credential Configuration](#credential-configuration)
7. [Node Parameters](#node-parameters)
8. [Supported Operations](#supported-operations)
9. [Example Workflow](#example-workflow)
10. [Development](#development)
11. [Testing](#testing)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features

- **Start Session** – initialise a WhatsApp session in UZapi.
- **Session Status** – query the current status of a session.
- **Generate QR** – fetch & pad the QR code returned by the API.
- **Send Messages** – text, link previews, images, videos, audio, generic files or Base64‑encoded files.
- **Flexible Input** – choose between providing a URL, local path or binary input for *sendFile64*.
- **Typed Codebase** – full TypeScript with strict typings for operations & properties.
- **Modular Design** – helpers & operations separated for easy maintenance.

---

## Architecture

```
UZapi.node.ts          ← n8n Node wrapper (entry point)
│
├─ apiClient.ts        ← Thin HTTP wrapper using n8n helpers
├─ operations/         ← One file per UZapi endpoint (startSession, sendText …)
│   └─ index.ts        ← `operationsMap` exports all handlers
├─ credentials/        ← Credential definition & helpers
│
├─ utils/
│   ├─ properties/     ← Node parameter metadata (no code)
│   └─ files/          ← Shared helpers (toDataUri, …)
└─ UZapi.node.json     ← Codex metadata (categories, docs links)
```

The node delegates every **operation** to an isolated handler in `operations/`.  Each handler receives the **context** (`IExecuteFunctions`), an **ApiClient** instance, and the **item index** – mirroring the functional style of native n8n nodes.

---

## File Structure

| Path                                                   | Purpose                                                     |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| `nodes/UZapi/UZapi.node.ts`                            | Main node class implementing `execute()`                    |
| `nodes/UZapi/apiClient.ts`                             | Reusable wrapper around `helpers.requestWithAuthentication` |
| `nodes/UZapi/operations/`                              | Endpoint handlers (pure functions)                          |
| `nodes/UZapi/operations/index.ts`                      | `operationsMap` exports all handlers                        |
| `nodes/UZapi/credentials/UZapiApi.credentials.ts`      | Credential type (base URL)                                  |
| `nodes/UZapi/credentials/uzapiCredentialProperties.ts` | Typed credential fields & auth config                       |
| `nodes/UZapi/utils/properties/`                        | Parameter metadata & option literals                        |
| `nodes/UZapi/utils/files/fileUtils.ts`                 | Helper to convert local files → `data:` URIs                |
| `nodes/UZapi/UZapi.node.json`                          | Codex definition (categories + docs)                        |

---

## Prerequisites

- **n8n 1.45 +** (self‑hosted or desktop)
- Valid **UZapi** account / API token (for protected endpoints)
- Node .js ≥ 18 + Yarn/PNPM/NPM if you plan to build locally

---

## Installation

1. Clone the repository into your `custom` directory:
   ```bash
   git clone https://github.com/your‑org/n8n‑uzapi‑node.git
   cd n8n‑uzapi‑node
   ```
2. Install dependencies & build:
   ```bash
   npm install && npm run build
   ```
3. Restart n8n – the node **UZapi** should appear under *Miscellaneous*.

---

## Credential Configuration

| Field        | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| **Base URL** | Root URL of UZapi (default: `https://teste.uzapi.com.br:3333`). |

After saving, reference this credential in your UZapi node instance; authentication headers will be injected automatically.

---

## Node Parameters

| Parameter                        | Type      | Visibility            | Description                                                |
| -------------------------------- | --------- | --------------------- | ---------------------------------------------------------- |
| **Operation**                    | *options* | Always                | Which UZapi endpoint to call.                              |
| **API Token**                    | *string*  | *startSession*        | Token for auth (if required by your plan).                 |
| **Session Key**                  | *string*  | Most operations       | UUID provided during onboarding.                           |
| **Session**                      | *string*  | Most operations       | Session ID returned by `/start`.                           |
| **Número (com DDI)**             | *string*  | Message sends         | Destination in E.164 (e.g. `5511999998888`).               |
| **Texto**                        | *string*  | *sendtext / sendLink* | Message body.                                              |
| **URL**                          | *string*  | *sendLink*            | Link to preview.                                           |
| **Descrição (caption)**          | *string*  | Media & files         | Caption for media / document.                              |
| **Link (path)**                  | *string*  | Media (URL)           | Public URL or local path (will be sent as‑is).             |
| **Arquivo (binaryPropertyName)** | *string*  | *sendFile64*          | If not set, the node falls back to the item’s binary data. |

---

## Supported Operations

| Value          | Endpoint                     | Description                                                           |
| -------------- | ---------------------------- | --------------------------------------------------------------------- |
| `startSession` | **POST** `/start`            | Create / resume a session.                                            |
| `getStatus`    | **POST** `/getSessionStatus` | Retrieve current session state.                                       |
| `generateQr`   | **GET** `/getQrCode`         | Download QR (binary), add padding & output as binary field `qrImage`. |
| `sendtext`     | **POST** `/sendText`         | Plain text message.                                                   |
| `sendLink`     | **POST** `/sendLink`         | Text + url with preview.                                              |
| `sendImage`    | **POST** `/sendImage`        | Image by URL/path with caption.                                       |
| `sendFile`     | **POST** `/sendFile`         | Document by URL/path with caption.                                    |
| `sendAudio`    | **POST** `/sendAudio`        | Audio file by URL/path with caption.                                  |
| `sendVideo`    | **POST** `/sendVideo`        | Video file by URL/path with caption.                                  |
| `sendFile64`   | **POST** `/sendFile64`       | File via data URI (handles binary → base64 automatically).            |

---

The project uses **ESLint** with `@typescript-eslint`.  All source lives in `src/` and compiles to `dist/`.

### Releasing a new version

1. Bump `version` in `package.json`.
2. Run `npm run build`.
3. Publish the package or copy `dist/` into your n8n instance.

---

## Testing

Right now the node is covered by **integration tests** that hit the UZapi sandbox.  Run them with:

```bash
npm test
```

> **Note:** Provide environment variables `UZAPI_BASE_URL`, `UZAPI_SESSION_KEY`, `UZAPI_SESSION` etc. for the tests to interact with a real account.

---

## Contributing

Pull Requests are welcome!  Please open an issue first to discuss your feature or bug‑fix.  Make sure to:

- Follow the existing code style (Prettier + ESLint).
- Add / update tests.
- Update this documentation if behaviour changes.

---

## License

MIT © 2025 UZapi
