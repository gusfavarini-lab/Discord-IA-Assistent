const { SlashCommandBuilder } = require('discord.js');
const { askAI } = require('../services/openai');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Converse com a IA do servidor.')
    .addStringOption((option) =>
      option
        .setName('mensagem')
        .setDescription('Pergunta, texto, codigo ou pedido criativo.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString('mensagem', true);

    await interaction.deferReply();

    try {
      const answer = await askAI(prompt, {
        username: interaction.user.username,
        serverName: interaction.guild?.name
      });

      await interaction.editReply(answer.slice(0, 2000));
    } catch (error) {
      console.error(error);
      await interaction.editReply('Nao consegui responder agora. Verifique a chave da OpenAI e tente novamente.');
    }
  }
};
