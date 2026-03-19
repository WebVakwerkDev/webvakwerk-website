# Webvakwerk

Frontend website built with Vite, React, and TypeScript.

## Local development

```sh
npm install
npm run dev
```

The site runs on `http://localhost:8080`.

Run the API bridge in a second terminal:

```sh
npm run dev:server
```

Create a `.env` file based on `.env.example`:

```sh
INTERNAL_API_URL=https://internal.example.com/api/tickets
INTERNAL_API_KEY=replace-me
```

The browser submits to `/api/demo-request`. The Node server validates the intake, applies honeypot + rate limiting, and forwards the request server-to-server to your internal API with `Authorization: Bearer INTERNAL_API_KEY`.

## Production build

```sh
npm run build
npm run start
```

`npm run start` serves the built frontend and the `/api/demo-request` endpoint on port 8080.

## Docker

```sh
docker compose up --build
```

The website is then available on `http://localhost:8080`.

Docker reads the same `.env` file, so set `INTERNAL_API_URL` and `INTERNAL_API_KEY` there before starting the container.
