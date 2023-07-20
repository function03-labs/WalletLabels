# Saas UI Pro

## Getting started

First of all thanks a lot for signing up!

Come say hello at [Discord](https://discord.gg/4PmJGFcAjX), I'm always around to help and your feedback will really help move the project forward.

- [Documentation](https://saas-ui.dev/docs/pro/overview)
- [Roadmap](https://roadmap.saas-ui.dev)
- [Storybook](https://storybook.saas-ui.pro)

## Installation

In case you use this repository as a reference or for testing purposes, go ahead and clone the repo. [Read more about cloning this repo](https://saas-ui.dev/docs/pro/installation/clone-repository).

If you're using the repository as a template for a new project, download the source as a ZIP file, or use the `Use this template` button to create a new fresh repository without Saas UI's history.

Once you have a copy of the source on your computer, run yarn to install all dependencies.

```bash
yarn install
```

## Install from NPM

Instructions for installing `@saas-ui-pro/react` from NPM can be found in the [documentation](https://saas-ui.dev/docs/pro/installation/npm).

## Configuration

All client side app configuration files can be found in `packages/app-config`.

## Running the apps

Saas UI Pro comes with 2 example apps, Next.js, Electron.

You can start the apps from their subfolder in `apps/`, or from the project root using one of these commands:

```
yarn dev:web

yarn dev:desktop
```

### Authentication

The apps mocks authentication by default. Follow these steps to configure Supabase for Next.js.

More [about authentication](https://beta.saas-ui.dev/docs/pro/authentication).

## Project structure

Saas UI Pro makes use of workspaces and uses the following folder structure.

| Path                         | Description                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `saas-ui`                    | All Saas UI Pro packages and components live in here.                             |
| `apps`                       | Example apps are in this folder.                                                  |
| `apps/web`                   | Next.js frontend app.                                                             |
| `apps/desktop`               | Nextron (Electron + Next.js) desktop app.                                         |
| `packages`                   | This contains all shared application code, as well as your own custom packages.   |
| `packages/api-client`        | The API client used to fetch data (re-exports api-mocks by default).              |
| `packages/api-mocks`         | Mocked API responses.                                                             |
| `packages/app-config`        | Contains all client side configuration files.                                     |
| `packages/app-nextjs`        | Next.js specific utility functions and hooks.                                     |
| `packages/app`               | This contains all application code that is shared between the example apps.       |
| `packages/app-features/core` | The app's core functionality, for example layouts, that is shared across modules. |
| `packages/app-features/*`    | All feature specific code is grouped within individual modules.                   |
| `packages/db-prisma`         | Prisma client and schema.                                                         |
| `packages/ui-lib`            | This is your shared UI library, and included all custom pre-built components      |
| `packages/ui-storybook`      | Your storybook.                                                                   |
| `packages/ui-theme`          | Your custom Chakra UI theme. This extends the Saas UI Pro theme by default.       |
| `tooling/test-utils`         | Helper functions for testing.                                                     |

### Package naming

Packages that are prefixed with `app` contain frontend application code. Your UI library related codes lives in `ui` prefixed packages.
API related code lives in `api` prefixed packages.

### Features

Application code is grouped by feature, this means that all related assets, like components, hook, pages are grouped in a single feature folder. This setup will help to keep the code base maintainable as it (and your team) grows. It will make it easier to add/remove new features and prevent any unwanted side effects when refactoring or removing functinality, due to too much interdependencies.

A few rules to make sure the codebase stays maintainable.

- Core (or common) functionality is located in the `core` feature, other features can import from core.
- A feature cannot import functionality from other features, except the `core` feature.
- If a component is used in multiple features and doesn't depend on external state (like data fetching), consider adding it to the ui library, otherwise add it to the core feature.
- Keep components clean, eg if there is complex business logic, like useQuery or useMutation hooks, move them into a separate file in `hooks/`

## License

See [LICENSE](./LICENSE).
