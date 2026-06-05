const { Events } = require('discord.js');
const { sendLog, truncate } = require('../services/logs');

module.exports = {
  name: Events.MessageDelete,

  async execute(message) {
    if (!message.guild || message.author?.bot) return;

    await sendLog(message.guild, {
      type: 'messages',
      title: 'Mensagem apagada',
      description: `Autor: ${message.author?.tag || 'Desconhecido'}\nCanal: ${message.channel}\nConteudo: ${truncate(message.content || 'Sem conteudo em cache')}`,
      level: 'danger',
      footer: `Canal ID: ${message.channel.id}`
    });
  }
};
