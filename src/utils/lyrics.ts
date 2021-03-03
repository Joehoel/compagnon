import axios from "axios";
import cheerio from "cheerio";
import { LyricsAPI } from "../typings";

const { COOKIE, GENIUS_TOKEN } = process.env;
const base = "https://api.genius.com";

export async function getSongId(artistId: number) {
    let currentPage = 1;
    let nextPage = true;
    let songs = [];

    while (nextPage) {
        const path = `artists/${artistId}/songs`;
        const params = { page: currentPage };
        const data = await getJson(path, params);

        const pageSongs = data.response.songs;

        if (pageSongs) {
            songs.push(pageSongs);

            currentPage++;
            console.info(`Page ${currentPage} finished scraping`);
        } else {
            nextPage = false;
        }
    }

    console.info(`Song id were scraped from ${currentPage} pages`);

    songs = songs.map((song) => {
        if (song["primary_artist"].id === artistId) {
            return song.id;
        }
    });

    return songs;
}

export async function getLyrics(songName: string): Promise<LyricsAPI> {
    // const path = await getLyricPath(songId);

    // const url = `http://genius.com${path}`;
    // const { data: page } = await axios.get(url);

    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();
    // await page.goto(url);
    // await page.waitForSelector(".lyrics");
    // const lyrics = await page.evaluate(() => {
    //     return document.querySelector(".lyrics")!.innerHTML;
    // });

    // await browser.close();
    // const $ = cheerio.load(page, { ignoreWhitespace: true });
    // const lyrics = $(".lyrics").text().trim();
    // return lyrics as string;
    const { data } = await axios.get(`https://api.ksoft.si/lyrics/search?q=${encodeURI(songName)}&limit=1`, {
        headers: { cookie: COOKIE },
    });
    return data.data[0];
}

export async function getLyricPath(songId: number) {
    const url = `songs/${songId}`;
    const data = await getJson(url);
    const path = data.response.song.path;
    return path;
}

export async function getJson(path: string, params: Record<string, any> = {}, headers: Record<string, any> = {}) {
    const url = [base, path].join("/");
    const bearer = `Bearer ${GENIUS_TOKEN}`;
    if (headers) {
        headers["Authorization"] = bearer;
    } else {
        headers = { Authorization: bearer };
    }
    try {
        const { data } = await axios.get(url, { params, headers });
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

interface Song {
    id: number;
    title: string;
    url: string;
}

// export async function search(term: string): Promise<Song> {
//     const q = encodeURI(term);
//     const url = `https://genius.com/api/search/multi?per_page=1&q=${q}`;

//     const { data: raw } = await axios.get(url, {
//         headers: {
//             "User-Agent":
//                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
//         },
//     });

//     const data = raw.response.sections[1].hits.map((hit: any) => {
//         return {
//             id: hit.result.id,
//             title: hit.result.title,
//             url: hit.result.url,
//         };
//     })[0];

//     return data;
// }

// (async () => {
//     const { id } = await search("Wellerman");
//     console.log(await getLyrics(id));
// })();
