import Discord from "discord.js";

import Command from "./Command";

const { API_KEY, PREFIX } = process.env;

export async function gif(tag: string): Promise<string> {
    const url = "https://api.giphy.com/v1/gifs/random?";
    const params = new URLSearchParams({
        api_key: API_KEY,
        tag,
    });
    const res = await fetch(`${url}${params}`);
    const { data } = (await res.json()) as { data: { url: string } };

    return data.url;
}

export function formatCommand(command: Command): Discord.EmbedFieldData {
    const hasUsage = command.usage ? true : false;

    if (hasUsage) {
        return {
            name: `${PREFIX}${command.name}`,
            value: `${command.description}\n\`\`\`${command.usage}\`\`\``,
        };
    } else {
        return {
            name: `${PREFIX}${command.name}`,
            value: `${command.description}`,
        };
    }
}
