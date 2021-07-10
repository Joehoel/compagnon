require("module-alias/register");

const rootDir = process.env.NODE_ENV === "development" ? "src" : "dist";

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  ssl: true,
  entities: [rootDir + "/entity/**/*.{ts,js}"],
  migrations: [rootDir + "/migration/**/*.{ts,js}"],
  subscribers: [rootDir + "/subscriber/**/*.{ts,js}"],
  seeds: [rootDir + "/seeds/**/*.{ts,js}"],
  cli: {
    entitiesDir: rootDir + "/entity",
    migrationsDir: rootDir + "/migration",
    subscribersDir: rootDir + "/subscriber",
  },
};
