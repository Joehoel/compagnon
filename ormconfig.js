const rootDir = process.env.NODE_ENV === "development" ? "src" : "dist";

module.exports = {
    type: "postgres",
    url:
        "postgres://cilvstuuugjzya:0baf54bc161a9d61310bde388ec68d193ec03466d61dcf0316b8bd9beb6a0b55@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/d7d6oiilaief2d",
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
