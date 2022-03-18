import Command from "../structures/Command";
import fetch from "isomorphic-fetch";

export interface Bible {
    _readme: Readme;
    in_app_use: InAppUse;
    translations: { [key: string]: string };
    copyrights: { [key: string]: string };
    data: Datum[];
    debug_info: DebugInfo;
}

export interface Readme {
    how_to_use: string;
    donatie: string;
    "use in an app": string;
    link: string;
}

export interface Datum {
    ts: string;
    source: string;
    fulltext: string;
    wpId: string;
    text: { [key: string]: string };
}

export interface DebugInfo {
    worker: string;
    generated: string;
}

export interface InAppUse {
    app_text: string;
    app_link: string;
}

export default new Command({
    name: "bible",
    description: "Bible command to satisfy al your christian needs",
    async execute(_, message) {
        const res = await fetch("https://feed.dagelijkswoord.nl/api/json/1.0/", {
            method: "GET",
            headers: {
                Authorization: `Basic ${process.env.VOTD_API_KEY}`,
            },
        });

        const { data } = (await res.json()) as Bible;

        const verse = data.at(0)?.source;
        const text = data.at(0)?.text["bgt"];

        if (!text || !verse) {
            throw Error("Could'nt fetch verse of the day!");
        }

        return message.channel.send(`**${verse}**\n${text}`);
    },
});
