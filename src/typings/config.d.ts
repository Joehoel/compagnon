// type EnvironmentVariables = "TOKEN" | "PREFIX";
// export interface ProcessEnv {
// 	[key: string]: string | undefined;
// }

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			PREFIX: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
