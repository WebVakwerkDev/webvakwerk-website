# Webvakwerk Demo Builder

Website built with Vite, React and TypeScript.

## Local development

```sh
npm install
npm run dev
```

The site runs on `http://localhost:8080`.

Create a `.env` file based on `.env.example` and set:

```sh
VITE_FORM_ENDPOINT=https://your-form-handler-endpoint
VITE_CONTACT_EMAIL=info@your-domain.nl
```

Form submissions are sent directly to `VITE_FORM_ENDPOINT` when set.
If no endpoint is set, the form falls back to opening the local mail client.

## Production build

```sh
npm run build
npm run start
```

`npm run start` serves the static `dist` build with a lightweight Node server.

## Docker

```sh
docker compose up --build
```

The website is then available on `http://localhost:8080`.
