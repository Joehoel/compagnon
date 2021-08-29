declare namespace NodeJS {
    interface ProcessEnv {
        TOKEN: string;
        CLIENT_ID: string;
        GUILD_ID: string;
        PREFIX: string;
        PORT: number;
        API_KEY: string;
        MONGO_URI: string;
        NODE_ENV: "development" | "production";
        DATABASE_URL: string;
        NODE_TLS_REJECT_UNAUTHORIZED: string;
        COOKIE: string;
        GENIUS_TOKEN: string;
        REDIS_PATH: string;
        REDIS_KEY_PREFIX: string;
    }
}
