# Sticklight SPA Template

A lightweight, beautiful, and fully compliant React 18 + Vite + TypeScript + Tailwind CSS Single Page Application (SPA) template repository built from scratch.

This repository is designed to test and validate Sticklight Cloud build, deployment, and SPA edge routing pipelines both locally and in production environments.

---

## 🚀 Key Features Under Test

1. **SPA Fallback Routing**:
   - Includes a custom lightweight, history-based React router.
   - Designed to test that your edge CDN (e.g. Cloudflare Workers / Cloudflare Pages) intercepts requests to sub-routes (like `/about` and `/status`) and serves `index.html` as a fallback rather than a 404, allowing the client-side router to boot and load the correct view.

2. **Deterministic Installs**:
   - Shipped with a clean, locked dependency manifest in `package-lock.json`.
   - Ensures the Sticklight build runner can execute `npm ci` for identical, deterministic local vs production builds.

3. **Build-Time Environment Injection**:
   - Reads environment variables prefixed with `VITE_` (e.g., `VITE_APP_TITLE` and `VITE_CUSTOM_MESSAGE`).
   - Visually renders them on the UI dashboard to verify that Sticklight Cloud's environment variable pipeline correctly injects config at compile time.

4. **Rich & Interactive UX**:
   - Modern, futuristic, and fast Tailwind CSS UI.
   - High-fidelity interactive dashboards, log streams, event trackers, and toast notifications to guarantee React scripts load and execute perfectly on edge servers.

---

## 📁 Project Structure

```text
sticklight-spa-template/
├── .env.example         # Example build-time environment variables
├── .env                 # Local build-time environment variables
├── .eslintrc.cjs        # Standard ESLint static analysis configuration
├── index.html           # SPA entry HTML shell with lightning-bolt SVG favicon
├── package.json         # Scripts, dependencies, and build pipeline definitions
├── postcss.config.js    # PostCSS Tailwind preprocessor integration
├── tailwind.config.js   # Custom Tailwind design tokens & content mapping
├── tsconfig.json        # Unified TypeScript compiler settings
├── vite.config.ts       # Optimized Vite asset bundler configuration
└── src/
    ├── App.tsx          # Router orchestrator and path listener
    ├── main.tsx         # React mounting entry point
    ├── index.css        # Tailwind base directives and custom animations
    ├── components/
    │   ├── Layout.tsx   # Header/Navbar, glowing background shapes, and footer
    │   └── Link.tsx     # Custom click-intercepting history router element
    └── views/
        ├── Home.tsx     # Hero banner, injected environment variables, and build metadata
        ├── About.tsx    # Technical pipeline test instructions
        └── Status.tsx   # Highly interactive dashboard (state trackers, log terminals, API latency simulators)
```

---

## 🛠️ Local Development

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) and npm installed.

### 2. Install Dependencies
Run a clean install of dependencies to generate or verify `package-lock.json`:
```bash
npm install
```

### 3. Run Development Server
Spin up the local hot-reloading development server on port `3000`:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & SPA Routing Simulation

To simulate how the CDN (such as Sticklight Edge or Cloudflare Workers) serves compile assets and handles the single page application fallback routing, follow these steps:

### 1. Build the Static Site
Compile, transpile, and bundle files into the production-ready `dist` folder:
```bash
npm run build
```

### 2. Simulate Production Routing with SPA Fallback
Run a local static server with single-page routing fallback activated:
```bash
npx serve -s dist
```
*Note: The `-s` (or `--single`) flag forces the server to route non-file requests (such as `/about` or `/status`) back to `dist/index.html`. This exactly mirrors Cloudflare Workers SPA fallback rules!*

Verify that:
- Navigating to [http://localhost:3000/about](http://localhost:3000/about) and hitting **Browser Refresh (Cmd+R or F5)** works perfectly without causing a "404 Not Found" error.
- Environment variables configured in `.env` are baked into the compiled Javascript bundle inside `dist/assets/*.js`.

---

## ☁️ Deploying to Sticklight Cloud

To publish this project to Sticklight Cloud:

1. **Verify Configs**: Double-check that your Sticklight configuration maps your build script to `npm run build` and your output folder to `dist`.
2. **Configure Environment Variables**:
   Set the following variables in your Sticklight project dashboard so they are injected during compile time:
   - `VITE_APP_TITLE` = `My Live Sticklight App`
   - `VITE_CUSTOM_MESSAGE` = `Hello from the live Sticklight Edge Network!`
3. **Commit & Push**: Push this codebase to your connected Git repository. The automated deployment pipeline will execute:
   - `npm ci`
   - `npm run build`
   - Edge assets sync & SPA Worker deployment.
