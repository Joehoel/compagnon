import ping from "../commands/ping";
import say from "../commands/admin/say";
import { MemeResponse } from "../typings";
import { formatCommand, meme } from "../utils/helpers";

describe("Helpers", () => {
  describe("Meme function", () => {
    const now = Date.now();
    it("Returns a formatted post from 'r/dankmemes'", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            data: {
              children: [
                {
                  data: {
                    title: "Test title",
                    url: "https://example.com",
                    created_utc: now,
                    author: "John Doe",
                    subreddit_name_prefixed: "r/dankmemes",
                    permalink: "/paihdoiwaphwad/alwhdoiwahd",
                  },
                },
              ],
            },
          },
        ]),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await meme();

      expect(data).toEqual<MemeResponse>({
        title: "Test title",
        url: "https://example.com",
        author: "John Doe",
        date: new Date(now * 1000),
        post: "https://reddit.com/paihdoiwaphwad/alwhdoiwahd",
        sub: "r/dankmemes",
      });

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual("https://reddit.com/r/dankmemes/random.json?limit=1");
    });
    it("Returns a formatted post from 'r/memes'", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([
          {
            data: {
              children: [
                {
                  data: {
                    title: "Test title",
                    url: "https://example.com",
                    created_utc: now,
                    author: "John Doe",
                    subreddit_name_prefixed: "r/memes",
                    permalink: "/paihdoiwaphwad/alwhdoiwahd",
                  },
                },
              ],
            },
          },
        ]),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await meme("memes");

      expect(data).toEqual<MemeResponse>({
        title: "Test title",
        url: "https://example.com",
        author: "John Doe",
        date: new Date(now * 1000),
        post: "https://reddit.com/paihdoiwaphwad/alwhdoiwahd",
        sub: "r/memes",
      });

      expect(fetchMock.mock.calls.length).toEqual(2);
      expect(fetchMock.mock.calls[1][0]).toEqual("https://reddit.com/r/memes/random.json?limit=1");
    });
  });

  describe("Format command function", () => {
    it("Returns a formatted command without usage", () => {
      const pingFormatted = formatCommand(ping);

      expect(pingFormatted).toEqual({ name: "!ping", value: "Pong!" });
    });
    it("Returns a formatted command with usage", () => {
      const sayFormatted = formatCommand(say);

      expect(sayFormatted).toEqual({
        name: "!say",
        value: "Outputs message from user ```<message>```",
      });
    });
  });
});
