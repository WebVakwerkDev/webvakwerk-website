# Webvakwerk Demo Builder

Website built with Vite, React, TypeScript and een kleine Node-backend voor formulierverwerking.

## Local development

```sh
npm install
npm run dev
npm run dev:api
```

The site runs on `http://localhost:8080`.
The API runs on `http://localhost:3001`.

Create a `.env` file based on `.env.example` and set:

```sh
PEPPERMINT_BASE_URL=http://your-peppermint-host:5003
PEPPERMINT_EMAIL=your-peppermint-email
PEPPERMINT_PASSWORD=your-password
```

Form submissions are sent to `/api/demo-request`, which logs into Peppermint and creates a ticket.

## Production build

```sh
npm run build
npm run start
```

## Docker

```sh
docker compose up --build
```

The website is then available on `http://localhost:8080`.
