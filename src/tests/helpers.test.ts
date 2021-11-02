import { capitalize, embed } from "../lib/helpers";
import { MessageEmbed } from "discord.js";

describe("Helpers", () => {
    test("capitalize", () => {
        expect(capitalize("test")).toBe("Test");
    });

    test("embed", () => {
        const m = embed({
            title: "test",
        });
        expect(m).toBeInstanceOf(MessageEmbed);
        expect(m).toHaveProperty("title", "test");
        expect(m).toHaveProperty("color", 16762368); // #FFC600 -> 16762368
        expect(m).toHaveProperty("timestamp");
    });
});
