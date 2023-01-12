# Milky Way

## Getting up and running

Ensure you have postgres running locally. Then create a `.env` in the root directory with the following contents:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db>?schema=public"
OUATH_GITHUB_CLIENT_ID=<github-client-id>
OUATH_GITHUB_CLIENT_SECRET=<github-client-secret>
OUATH_GOOGLE_CLIENT_ID=<google-client-id>
OUATH_GOOGLE_CLIENT_SECRET=<google-client-secret>
OUATH_GOOGLE_REDIRECT_URI="http://localhost:5173/oauth/google/callback"
```

Install dependenciesm seed the database, and run the development server:
```bash
npm i
npm run dbseed
npm run dev
```