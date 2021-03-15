import redis, { Callback, RedisClient } from "redis";
const { REDIS_PATH } = process.env;

export default async (): Promise<RedisClient> => {
  return await new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: REDIS_PATH,
    });
    client.on("error", (err) => {
      console.error(err);
      client.quit();
      reject(err);
    });

    client.on("ready", () => {
      resolve(client);
    });
  });
};

export const expire = (callback: any) => {
  const expired = () => {
    const sub = redis.createClient({ url: REDIS_PATH });
    sub.subscribe("__keyevent@0__:expired", () => {
      sub.on("message", (channel, message) => {
        callback(message);
      });
    });
  };

  const pub = redis.createClient({ url: REDIS_PATH });
  //@ts-ignore
  pub.send_command("config", ["set", "notify-keyspace-events", "Ex"], expired());
};
