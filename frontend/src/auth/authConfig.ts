// src/auth/authConfig.ts

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  },

  cache: {
    cacheLocation: "sessionStorage" as const,
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "Calendars.ReadWrite",
    "Mail.ReadWrite",
    "Mail.Send",
    "Files.Read.All",
    "Files.ReadWrite.All",
  ],
};