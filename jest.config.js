module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "ts"],
    rootDir: "src/tests/",
    testEnvironment: "node",
    setupFiles: ["dotenv/config", "./setup.ts"],
    automock: false,
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
};
