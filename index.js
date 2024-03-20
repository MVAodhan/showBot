import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import { getLatestVideos } from "./utils.js";
import { Client, Events, GatewayIntentBits, EmbedBuilder } from "discord.js";

import * as ping from "./commands/ping.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.InteractionCreate, handleInteraction);

async function handleInteraction(interaction) {
  // if (!interaction.isCommand()) return;
  if (interaction.commandName === "ping") {
    await ping.execute(interaction);
  }
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

const app = new Hono();

app.get("/", (c) => c.text("Hello Node.js from Hono!"));
app.post("/new", async (c) => {
  const body = await c.req.json();
  const channel = client.channels.cache.get("1219167062203826186");
  channel.send("<@&1219174984421736520> New Video");
  const showEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(body.title)
    .setURL(body.link)
    .setImage(body.image);

  channel.send({
    embeds: [showEmbed],
  });

  return c.json({
    message: "new video data sent",
  });
});

// serve(app);
serve({
  fetch: app.fetch,
  port: process.env.PORT || 8787,
});
