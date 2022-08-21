declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      DATABASE_URL: string;
      GIPHY_API_KEY: string;
    }
  }
}

export {}
