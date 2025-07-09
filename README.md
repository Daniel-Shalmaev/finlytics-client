# Finlytics Client

Finlytics is a modern frontend web application built with Angular. It provides a responsive UI for user authentication, profile management, and financial analytics powered by the Finlytics backend.

## Features

- Login and registration with JWT token handling
- Profile page with form editing and skeleton loading animation
- AuthGuard and HTTP Interceptor for secure routes
- Modular, standalone Angular components
- Styled with SCSS and responsive layout (PC-first)

## Planned Improvements

- [ ] Responsive mobile header with hamburger menu
- [ ] Toast notifications for user feedback
- [ ] Dashboard with analytics charts
- [ ] Role-based route protection
- [ ] Dockerfile for containerized frontend
- [ ] Unit and E2E tests

## Development Server

To start a local development server, run:

```bash
ng serve
```

Then open your browser at `http://localhost:4200/`. The app will reload on changes.

## Building

To build the project for production:

```bash
ng build
```

Build output will be stored in the `dist/` directory.

## Code Scaffolding

To generate a new component:

```bash
ng generate component component-name
```

See all options:

```bash
ng generate --help
```

## Testing

To run unit tests:

```bash
ng test
```

To run end-to-end tests (e2e):

```bash
ng e2e
```

_Note: You can configure your own e2e test framework._

## Project Structure

- `src/app/`
  - `app.component.ts` – Root component and routing config

- `components/`
  - `auth/` – Login and Register pages
  - `dashboard/` – Main dashboard view
  - `data-table/` – Reusable table for financial data
  - `header/` – Top navigation with user greeting
  - `footer/` – Bottom site footer
  - `profile/` – User profile editing

- `services/`
  - `auth.service.ts` – JWT auth, name handling
  - `api.service.ts` – General HTTP logic

- `guards/`
  - `auth.guard.ts` – Protects routes based on login

- `interceptors/`
  - `auth.interceptor.ts` – Adds JWT token to requests

- `models/`
  - `finance.model.ts` – Interface for financial data

## Additional Resources

For more Angular CLI usage and guides, visit the [Angular CLI Docs](https://angular.dev/tools/cli).