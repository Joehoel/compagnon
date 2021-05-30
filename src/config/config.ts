import { existsSync, readFileSync } from "fs";
import { parse } from "toml";

export class Config {
  public readonly prefix: string;
  public readonly "mod-logging": boolean;

  private static LOCATION = "./config.toml";

  public static getConfig() {
    if (!existsSync(Config.LOCATION)) {
      throw new Error("Please create a config.toml");
    }

    const fileContents = readFileSync(Config.LOCATION, "utf-8");
    const casted = parse(fileContents) as Config;

    return casted;
  }
}
