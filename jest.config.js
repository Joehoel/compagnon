module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "ts"],
    rootDir: "src/",
    testEnvironment: "node",
    setupFiles: ["dotenv/config", "module-alias/register"],
    automock: false,
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/$1",
    },
};
