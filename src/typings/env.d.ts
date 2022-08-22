declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      DATABASE_URL: string;
      PREFIX: string;
      GIPHY_API_KEY: string;
      DETECT_LANGUAGE_API_KEY: string;
    }
  }
}

export {}
