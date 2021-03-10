declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      PREFIX: string;
      API_KEY: string;
      MONGO_URI: string;
      COOKIE: string;
      GENIUS_TOKEN: string;
      REDIS_PATH: string;
      REDIS_KEY_PREFIX: string;
    }
  }
}

export {};
