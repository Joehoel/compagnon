declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            PREFIX: string;
        }
    }
}

export {};
