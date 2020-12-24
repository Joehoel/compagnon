declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            PREFIX: string;
            API_KEY: string;
        }
    }
}

export {};
