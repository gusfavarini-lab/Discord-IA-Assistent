const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra a latencia atual do bot.'),

  async execute(interaction) {
    await interaction.reply({
      content: `Pong! Latencia: ${interaction.client.ws.ping}ms`,
      ephemeral: true
    });
  }
};
