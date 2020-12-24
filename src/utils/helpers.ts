const { API_KEY } = process.env;

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

export async function meme(sub: string): Promise<string> {
    const url = `https://reddit.com/r/${sub}/random.json?`;
    const params = new URLSearchParams({
        limit: "1",
    });
    const res = await fetch(`${url}${params}`);
    const data = await res.json();

    return `https://reddit.com${data[0].data.children[0].data.permalink}`;
}
