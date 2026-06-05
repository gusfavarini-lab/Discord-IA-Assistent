const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { createTicket } = require('../services/tickets');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Abre um ticket privado com a equipe de suporte.')
    .addStringOption((option) =>
      option
        .setName('motivo')
        .setDescription('Explique rapidamente o motivo do contato.')
        .setRequired(false)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString('motivo') || 'Sem motivo informado';
    const channel = await createTicket(interaction, reason);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket:close')
        .setLabel('Fechar ticket')
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({
      content: `Ticket aberto por ${interaction.user}.\nMotivo: ${reason}`,
      components: [row]
    });

    await interaction.reply({
      content: `Ticket criado: ${channel}`,
      ephemeral: true
    });
  }
};
