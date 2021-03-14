import axios from "axios";

export class Reddit {
  constructor(private sub: string = "dankmemes") {}

  public async getHot() {
    const url = `https://www.reddit.com/r/${this.sub}/hot.json?`;

    const { data: response } = await axios.get(url);
    // const { title, url, created_utc, author, subreddit_name_prefixed: sub, permalink } = data[0].data.children[0].data;
    const data = response.data.children.map(({ data }: any) => {
      return {
        id: data.id,
        title: data.title,
        author: data.author,
        url: data.url_overridden_by_dest,
        created_utc: data.created_utc,
        permalink: data.permalink,
        sub: data.subreddit_name_prefixed,
      };
    });
    return data;
  }

  public async getRandomHotPost() {
    const hot = await this.getHot();
    const post = hot[Math.floor(Math.random() * hot.length)];
    const date = new Date(post.created_utc * 1000);
    const link = `https://reddit.com${post.permalink}`;
    return {
      title: post.title,
      url: link,
      date,
      author: post.author,
      sub: post.sub,
    };
  }
}
// (async () => {
//     const reddit = new Reddit();
//     console.log(await reddit.getRandomHotPost());
//     // console.log(await reddit.getHot());
// })();
