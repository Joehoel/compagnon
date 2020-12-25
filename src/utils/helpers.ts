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
