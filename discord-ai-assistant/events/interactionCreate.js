const { Events } = require('discord.js');
const { closeTicket } = require('../services/tickets');

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        const message = 'Ocorreu um erro ao executar este comando.';

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(message);
        } else {
          await interaction.reply({ content: message, ephemeral: true });
        }
      }
    }

    if (interaction.isButton() && interaction.customId === 'ticket:close') {
      await closeTicket(interaction);
    }
  }
};
