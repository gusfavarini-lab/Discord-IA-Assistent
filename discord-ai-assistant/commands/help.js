const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../config/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Mostra os comandos e recursos disponiveis.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(config.embedColor)
      .setTitle('Discord AI Assistant')
      .setDescription('Assistente para IA, moderacao, tickets, logs e administracao.')
      .addFields(
        { name: '/ai', value: 'Pergunte algo, peca resumo, ideias ou explicacao de codigo.' },
        { name: '/ticket', value: 'Abra um ticket privado com a equipe de suporte.' },
        { name: '/ping', value: 'Verifique a latencia do bot.' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
