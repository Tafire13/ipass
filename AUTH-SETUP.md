# Google sign-in setup

IPASS uses Auth.js with the Google OAuth provider. The server accepts only verified Google Workspace accounts whose email and hosted domain are both `msu.ac.th`.

## Google Cloud Console

Create an OAuth client with application type **Web application**. Add these authorized redirect URIs:

- Local development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://<your-domain>/api/auth/callback/google`

The `hd=msu.ac.th` authorization parameter only guides account selection. Access is enforced again on the server using Google's verified profile claims.

## Local environment

Copy `env.example` to `.env.local`, then fill in the Google OAuth client ID and secret. Set `NEXTAUTH_URL` to the base URL where IPASS is running. Generate a unique session secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Put the generated value in `NEXTAUTH_SECRET`. Keep `.env.local` private and never commit it. Restart the development server after changing environment values.

No user database or FastAPI account integration exists in this repository yet. Auth.js currently keeps the authenticated session in its signed JWT cookie; connect the verified Google subject to the IPASS user record and roles before granting access to exams or other protected data.
