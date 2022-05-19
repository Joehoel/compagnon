declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      PREFIX: string;
      API_KEY: string;
      DATABASE_URL: string;
      NODE_TLS_REJECT_UNAUTHORIZED: string;
      NODE_ENV: "development" | "production";
      COOKIE: string;
      REDIS_PATH: string;
      REDIS_KEY_PREFIX: string;
      MONGO_URI: string;
      VOTD_API_KEY: string;
      NOTION_KEY: string;
      NOTION_DATABASE_ID: string;
    }
  }
}

export {}
