import * as registry from "@/lib/registry";
import * as index_d from "../../node_modules/discord.js/typings/index.d";
// @ponicode
describe("registry.registerCommands", () => {
    test("0", async () => {
        let object: any = [
            { name: "Jean-Philippe", url: "https://croplands.org/app/a/confirm?t=", type: -5.48, shardId: 12 },
            {
                name: "Jean-Philippe",
                url: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg",
                type: 100,
                shardId: 12345,
            },
            {
                name: "Edmond",
                url: "http://www.croplands.org/account/confirm?t=",
                type: -100,
                shardId: "bc23a9d531064583ace8f67dad60f6bb",
            },
            { name: "Michael", url: "https://accounts.google.com/o/oauth2/revoke?token=%s", type: 1, shardId: 12 },
        ];
        let param1: any = new index_d.Client({
            shards: "auto",
            shardCount: 10,
            makeCache: () => undefined,
            messageCacheLifetime: "bc23a9d531064583ace8f67dad60f6bb",
            messageSweepInterval: -100,
            allowedMentions: {
                parse: ["everyone", "everyone", "users", "users"],
                roles: ["user_name", 123, "user_name"],
                users: [123],
                repliedUser: true,
            },
            invalidRequestWarningInterval: 128,
            partials: ["GUILD_MEMBER", "USER"],
            restWsBridgeTimeout: -1.0,
            restTimeOffset: 1,
            restRequestTimeout: 1.0,
            restGlobalRateLimit: -29.45,
            restSweepInterval: 550,
            retryLimit: 10,
            failIfNotExists: false,
            userAgentSuffix: ["Edmond", "Pierre Edouard"],
            presence: { status: "dnd", afk: false, activities: object, shardId: "a1969970175" },
            intents: undefined,
            ws: {
                large_threshold: 1,
                compress: true,
                properties: { $os: "Edmond", $browser: "https://twitter.com/path?abc", $device: "Michael" },
            },
            http: {
                api: "https://accounts.google.com/o/oauth2/revoke?token=%s",
                version: 10.0,
                host: "smtp.gmail.com",
                cdn: "http://placeimg.com/640/480",
                invite: 123,
                template: "Www.GooGle.com",
                headers: "POST",
            },
            rejectOnRateLimit: () => false,
        });
        await registry.registerCommands(param1, "/lustre/storeB/users/lisesg/harmonie/AM2p5_MIST2_c38h12/archive/");
    });

    test("1", async () => {
        let object: any = [
            {
                name: "Jean-Philippe",
                url: "https://twitter.com/path?abc",
                type: 0,
                shardId: "bc23a9d531064583ace8f67dad60f6bb",
            },
            { name: "Pierre Edouard", url: "http://www.example.com/route/123?foo=bar", type: 0, shardId: 12345 },
            { name: "Pierre Edouard", url: "https://croplands.org/app/a/reset?token=", type: 100, shardId: 987650 },
            { name: "Anas", url: "Www.GooGle.com", type: -5.48, shardId: 12345 },
        ];
        let param1: any = new index_d.Client({
            shards: "auto",
            shardCount: 80,
            makeCache: () => undefined,
            messageCacheLifetime: "a1969970175",
            messageSweepInterval: 100,
            allowedMentions: {
                parse: ["everyone", "everyone", "users", "users"],
                roles: [123, "user123", "user_name"],
                users: ["user123"],
                repliedUser: true,
            },
            invalidRequestWarningInterval: 1,
            partials: ["GUILD_MEMBER", "USER"],
            restWsBridgeTimeout: -0.5,
            restTimeOffset: 0,
            restRequestTimeout: 0.0,
            restGlobalRateLimit: 1.0,
            restSweepInterval: 520,
            retryLimit: 50,
            failIfNotExists: false,
            userAgentSuffix: ["Jean-Philippe", "Anas"],
            presence: { status: "dnd", afk: true, activities: object, shardId: 12345 },
            intents: undefined,
            ws: {
                large_threshold: 100,
                compress: false,
                properties: {
                    $os: "Jean-Philippe",
                    $browser: "https://api.telegram.org/bot",
                    $device: "Jean-Philippe",
                },
            },
            http: {
                api: "https://twitter.com/path?abc",
                version: -29.45,
                host: "smtp-relay.sendinblue.com",
                cdn: "http://placeimg.com/640/480",
                invite: "user123",
                template: "ponicode.com",
                headers: "POST",
            },
            rejectOnRateLimit: () => false,
        });
        await registry.registerCommands(param1, "/lustre/storeB/immutable/short-term-archive/DNMI_AROME_METCOOP/");
    });

    test("2", async () => {
        let object: any = [
            { name: "Edmond", url: "http://www.croplands.org/account/confirm?t=", type: -100, shardId: 56784 },
            {
                name: "Pierre Edouard",
                url: "https://croplands.org/app/a/reset?token=",
                type: 100,
                shardId: "a1969970175",
            },
            { name: "Edmond", url: "https://", type: -100, shardId: 12 },
            { name: "Jean-Philippe", url: "https://twitter.com/path?abc", type: -5.48, shardId: 12345 },
        ];
        let param1: any = new index_d.Client({
            shards: "auto",
            shardCount: 10,
            makeCache: () => undefined,
            messageCacheLifetime: "a1969970175",
            messageSweepInterval: 1,
            allowedMentions: {
                parse: ["everyone", "everyone", "users", "users"],
                roles: ["user-name", "user_name", "user123"],
                users: ["user-name"],
                repliedUser: false,
            },
            invalidRequestWarningInterval: 256,
            partials: ["GUILD_MEMBER", "USER"],
            restWsBridgeTimeout: 10.23,
            restTimeOffset: 32,
            restRequestTimeout: 10.0,
            restGlobalRateLimit: 0.5,
            restSweepInterval: 400,
            retryLimit: 2,
            failIfNotExists: false,
            userAgentSuffix: ["Michael", "Michael"],
            presence: { status: "dnd", afk: false, activities: object, shardId: "bc23a9d531064583ace8f67dad60f6bb" },
            intents: undefined,
            ws: {
                large_threshold: -100,
                compress: true,
                properties: { $os: "Michael", $browser: "ponicode.com", $device: "Jean-Philippe" },
            },
            http: {
                api: "https://croplands.org/app/a/reset?token=",
                version: 10.0,
                host: "smtp-relay.sendinblue.com",
                cdn: "http://placeimg.com/640/480",
                invite: "username",
                template: "https://accounts.google.com/o/oauth2/revoke?token=%s",
                headers: "POST",
            },
            rejectOnRateLimit: () => false,
        });
        await registry.registerCommands(param1, "/synergys");
    });

    test("3", async () => {
        let object: any = [
            { name: "Jean-Philippe", url: "https://api.telegram.org/bot", type: 100, shardId: 12345 },
            { name: "Michael", url: "www.google.com", type: -5.48, shardId: 56784 },
            { name: "Edmond", url: "www.google.com", type: 0, shardId: 12345 },
            {
                name: "Michael",
                url: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg",
                type: 1,
                shardId: "bc23a9d531064583ace8f67dad60f6bb",
            },
        ];
        let param1: any = new index_d.Client({
            shards: "auto",
            shardCount: 32,
            makeCache: () => undefined,
            messageCacheLifetime: 987650,
            messageSweepInterval: 100,
            allowedMentions: {
                parse: ["everyone", "everyone", "users", "users"],
                roles: ["user123", "user123", "user123"],
                users: ["user-name"],
                repliedUser: true,
            },
            invalidRequestWarningInterval: 256,
            partials: ["GUILD_MEMBER", "USER"],
            restWsBridgeTimeout: 0.0,
            restTimeOffset: 32,
            restRequestTimeout: 10.0,
            restGlobalRateLimit: -1.0,
            restSweepInterval: 90,
            retryLimit: 3,
            failIfNotExists: true,
            userAgentSuffix: ["Anas", "Edmond"],
            presence: { status: "dnd", afk: true, activities: object, shardId: 56784 },
            intents: undefined,
            ws: {
                large_threshold: -100,
                compress: true,
                properties: { $os: "George", $browser: "https://", $device: "Pierre Edouard" },
            },
            http: {
                api: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg",
                version: 1.0,
                host: "smtp.gmail.com",
                cdn: "http://placeimg.com/640/480",
                invite: "user123",
                template: "https://twitter.com/path?abc",
                headers: "POST",
            },
            rejectOnRateLimit: () => false,
        });
        await registry.registerCommands(param1, "/synergyc");
    });

    test("4", async () => {
        let object: any = [
            { name: "George", url: "http://www.croplands.org/account/confirm?t=", type: 1, shardId: "a1969970175" },
            { name: "Anas", url: "https://", type: 1, shardId: 12 },
            { name: "Edmond", url: "http://www.example.com/route/123?foo=bar", type: 1, shardId: "a1969970175" },
            { name: "Jean-Philippe", url: "http://base.com", type: 1, shardId: "bc23a9d531064583ace8f67dad60f6bb" },
        ];
        let param1: any = new index_d.Client({
            shards: "auto",
            shardCount: 4,
            makeCache: () => undefined,
            messageCacheLifetime: 987650,
            messageSweepInterval: 100,
            allowedMentions: {
                parse: ["everyone", "everyone", "users", "users"],
                roles: [123, "user-name", "user123"],
                users: ["username"],
                repliedUser: false,
            },
            invalidRequestWarningInterval: 5,
            partials: ["GUILD_MEMBER", "USER"],
            restWsBridgeTimeout: 10.0,
            restTimeOffset: 0,
            restRequestTimeout: 10.0,
            restGlobalRateLimit: 10.23,
            restSweepInterval: 410,
            retryLimit: 4,
            failIfNotExists: false,
            userAgentSuffix: ["Michael", "George"],
            presence: { status: "dnd", afk: false, activities: object, shardId: 56784 },
            intents: undefined,
            ws: {
                large_threshold: 100,
                compress: true,
                properties: { $os: "George", $browser: "https://", $device: "Michael" },
            },
            http: {
                api: "https://twitter.com/path?abc",
                version: 10.0,
                host: "smtp.gmail.com",
                cdn: "http://placeimg.com/640/480",
                invite: 123,
                template: "https://api.telegram.org/bot",
                headers: "DELETE",
            },
            rejectOnRateLimit: () => false,
        });
        await registry.registerCommands(param1, "relocate/builddir/Default/");
    });

    test("5", async () => {
        let param1: any = new index_d.Client({
            shards: Infinity,
            shardCount: Infinity,
            makeCache: () => undefined,
            messageCacheLifetime: Infinity,
            messageSweepInterval: Infinity,
            allowedMentions: { parse: [], roles: [], users: [], repliedUser: true },
            invalidRequestWarningInterval: Infinity,
            partials: [],
            restWsBridgeTimeout: Infinity,
            restTimeOffset: Infinity,
            restRequestTimeout: Infinity,
            restGlobalRateLimit: Infinity,
            restSweepInterval: Infinity,
            retryLimit: Infinity,
            failIfNotExists: true,
            userAgentSuffix: [],
            presence: { status: "dnd", afk: false, activities: [], shardId: Infinity },
            intents: undefined,
            ws: { large_threshold: Infinity, compress: false, properties: { $os: "", $browser: "", $device: "" } },
            http: { api: "", version: Infinity, host: "", cdn: "", invite: "", template: "", headers: "" },
            rejectOnRateLimit: [],
        });
        await registry.registerCommands(param1, "");
    });
});
