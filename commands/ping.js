import { SlashCommandBuilder } from "discord.js";

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies pong");

// Execute function export
export async function execute(interaction) {
  await interaction.reply("pong");
}
