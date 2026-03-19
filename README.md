# Webvakwerk

Frontend website built with Vite, React, and TypeScript.

## Local development

```sh
npm install
npm run dev
```

The site runs on `http://localhost:8080`.

Create a `.env` file based on `.env.example` (optional—defaults are in place):

```sh
VITE_CONTACT_EMAIL=info@webvakwerk.nl
```

Form submissions are frontend-only: they open the visitor's mail client with a pre-filled intake form.

## Production build

```sh
npm run build
npm run start
```

`npm run start` runs a static preview server on port 8080.

## Docker

```sh
docker compose up --build
```

The website is then available on `http://localhost:8080`.

The Docker setup uses nginx to serve the static frontend build.
