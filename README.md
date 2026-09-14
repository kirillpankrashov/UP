# Uplify 3.0

Uplify is an advertising platform for streamers. The frontend consists of three parts:

- **Streamer dashboard** — ad display settings, campaign selection, balance and analytics.
- **Partner dashboard** — ad campaign creation, targeting, streamer segmentation, analytics.
- **Widget** — OBS web layer that renders ads directly in the stream.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Vue 3 + TypeScript |
| **Build** | Vite, vite-plugin-checker, vite-svg-loader, vite-plugin-html |
| **State** | Pinia |
| **Router** | Vue Router |
| **UI** | Element Plus + Tailwind CSS |
| **i18n** | Vue I18n |
| **HTTP** | Axios + axios-cache-interceptor |
| **Realtime** | Pusher / Laravel Echo |
| **Charts** | Chart.js + vue-chartjs |
| **Editor** | CodeMirror + vue-codemirror |
| **Monitoring** | Sentry (`@sentry/vue`), Rollbar |
| **Testing** | Vitest + @vue/test-utils + jsdom |
| **Linting** | ESLint (flat config) + TypeScript ESLint |
| **Deploy** | Firebase Hosting |
| **CI/CD** | GitLab CI |

## Project Structure

```
src/
├── assets/          # CSS, fonts, images
├── components/      # Reusable UI components
├── core/            # API client, router, Pinia stores, helpers, i18n, plugins, types
└── modules/         # Feature modules
    ├── Auth/              # Authentication
    ├── Streamer/          # Streamer dashboard (wallet, campaigns, settings, profile, etc.)
    ├── Partner/           # Partner dashboard
    ├── Panel/             # Shared control panel
    ├── Widget/            # Widget
    ├── SpecialProjectWidget/  # Special project widget
    ├── CampaignAnalytics/ # Campaign analytics
    └── Debug/             # Debug tools
```

## Environment Variables

```bash
cp .env.example .env
```

## Commands

```bash
# Install dependencies
yarn

# Dev server (http://localhost:8080)
yarn dev

# Build
yarn build:production       # production build with type-check
yarn build:development      # development mode build with type-check

# Deploy (build + Sentry sourcemaps + firebase deploy)
yarn deploy:staging
yarn deploy:production

# Tests
yarn test:unit              # single run
yarn test:unit:watch        # watch mode

# Run tests for a specific directory
./scripts/run-tests.sh
./scripts/run-tests.sh src/modules/Streamer/views/Wallet

# Type-check
yarn type-check

# Lint
yarn lint
```

## Branches and Environments

| Branch | Environment | Purpose |
|--------|-------------|---------|
| `master` | `platform.uplify.app` | Production. Hotfixes only. |
| `release` | `release.uplify.app` | Release branch. Merged into `master` on release day. |
| `alpha` | `alpha.uplify.app` | Staging. Feature/fix branches are merged here automatically. |
| `beta` | `beta.uplify.app` | Backup staging in case of conflicts in `alpha`. |
