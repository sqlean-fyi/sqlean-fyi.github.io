# sqlean.fyi

A lightweight React + TypeScript single-page web app (built with Vite) that provides a simple UI for sending inputs to the Gemini API and showing responses. This repository contains the frontend application source, components, and the small service that calls the Gemini API.


## Quick overview

- Tech stack: React, TypeScript, Vite
- Key components: `CodeInput`, `FeedbackDisplay`, `Header`, `Loader`
- API integration: `services/geminiService.ts` — uses the Gemini API (requires a Gemini API key)
- Dev server: Vite (`npm run dev`)

---

## Features

- Simple, focused UI for submitting input and viewing model output
- TypeScript-first codebase for safer refactors and clearer types
- Modular components so you can extend or replace UI pieces easily
- Configurable Gemini API integration via environment variables

---

## Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm if you prefer — adjust commands accordingly)
- A Gemini API key (set as an environment variable; see below)

---

## Local development

1. Install dependencies
   ```
   npm install
   ```

2. Create a `.env.local` file in the project root and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   - Alternatively, you can set the `GEMINI_API_KEY` in your shell environment (use whichever method you prefer for your OS).

3. Start the Vite dev server:
   ```
   npm run dev
   ```

4. Open the app in your browser:
   - Vite typically serves at `http://localhost:5173` (check the terminal output after running `npm run dev`).

If you run into issues, confirm your Node version and check the `package.json` scripts for custom script names.

---

## Build & deploy

1. Build for production:
   ```
   npm run build
   ```

2. Preview the production build locally:
   ```
   npm run preview
   ```

3. Deploy:
   - The built assets in `dist/` can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).
   - If using GitHub Pages, consider a GitHub Action or the `gh-pages` package to publish the `dist/` contents.

---

## Environment variables

- GEMINI_API_KEY — required for the app to call the Gemini API.
  - Example `.env.local`:
    ```
    # .env.local
    GEMINI_API_KEY=sk-...
    ```

Notes:
- Keep API keys secret. Do not commit `.env.local` to source control.
- If you want to run the app without an API key (for UI-only work), update `services/geminiService.ts` to use mocked responses while developing.

---

## Project structure (high level)

- App.tsx — main app entry component
- index.tsx / index.html — Vite entry
- components/
  - CodeInput.tsx
  - FeedbackDisplay.tsx
  - Header.tsx
  - Loader.tsx
- services/
  - geminiService.ts — central Gemini API client
- constants.ts, metadata.json, vite.config.ts, tsconfig.json, package.json, README.md

---

## Extending the project

- Add new components under `components/`.
- Add API helpers or a server-proxy if you want to keep the API key on a server instead of exposing it to the browser (recommended for production).
- Add tests and linting (check `package.json` for existing scripts).

---

## Troubleshooting

- "Cannot read environment variable" — ensure `.env.local` exists and your dev server is restarted after changes.
- "Network/API errors" — validate the API key and check rate limits or permissions for the Gemini API.
- "Port already in use" — stop the process using the port or change the Vite port in `vite.config.ts`.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make changes and run the dev server locally
4. Open a pull request with a clear description of changes

---

## License & attribution

Check the repository for a LICENSE file. If none exists, coordinate with the project owner to decide a license.