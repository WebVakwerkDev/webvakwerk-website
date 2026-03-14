# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Run with Docker

This project now runs as two separate services:

- frontend on port `8080`
- backend API on port `3001`

Use Docker Compose:

```sh
cp .env.example .env
npm run auth:hash -- "kies-een-sterk-wachtwoord"
docker compose up --build
```

Open:

- frontend: `http://localhost:8080`
- backend API: `http://localhost:3001`

The backend is meant to run on a separate subdomain, for example:

- `www.jouwdomein.nl` for the frontend
- `api.jouwdomein.nl` for the backend

Set `VITE_API_BASE_URL` to your API domain before building the frontend.

## Run locally with backend

For local development, run the backend and frontend separately:

```sh
npm run server
npm run dev
```

The frontend runs on `http://localhost:8080`.
The backend runs on `http://localhost:3001`.

During local development Vite proxies `/api` and `/uploads` to the backend.

## Dashboard authentication

The dashboard and uploaded files are protected by backend authentication.

Required backend environment variables:

- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `FRONTEND_ORIGIN`

Optional:

- `AUTH_COOKIE_NAME`
- `AUTH_COOKIE_DOMAIN`
- `AUTH_COOKIE_SECURE`
- `AUTH_SESSION_HOURS`

Generate a password hash with:

```sh
npm run auth:hash -- "jouw-sterke-wachtwoord"
```

For production behind Cloudflare:

- run the frontend on your public site domain
- run the backend on a separate API subdomain
- set `FRONTEND_ORIGIN` to the exact frontend origin
- set `AUTH_COOKIE_SECURE=true`
- keep Cloudflare Access or OAuth in front as an extra layer

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
