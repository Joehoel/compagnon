import { RedditResponse } from "@/typings";
import axios from "axios";

interface RedditPost {
  id: string;
  title: string;
  author: string;
  url: string;
  date: number;
  link: string;
  sub: string;
}

export class Reddit {
  constructor(private sub: string = "dankmemes") {}

  public async getHot() {
    const url = `https://www.reddit.com/r/${this.sub}/hot.json?`;

    const { data: response } = await axios.get<RedditResponse>(url);

    const data = response.data.children.map(({ data }) => {
      return {
        id: data.id,
        title: data.title,
        author: data.author,
        url: data.url_overridden_by_dest,
        date: new Date(data.created_utc * 1000),
        link: `https://reddit.com${data.permalink}`,
        sub: data.subreddit_name_prefixed,
      };
    });
    return data;
  }

  public async getRandomHotPost() {
    const hot = await this.getHot();
    const post = hot[Math.floor(Math.random() * hot.length)];
    return post;
  }
}

export default Reddit;
