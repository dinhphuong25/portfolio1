import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config: any = defineCloudflareConfig();
config.buildCommand = "npm run build:next";

export default config;
