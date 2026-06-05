const { Events } = require('discord.js');
const { sendLog, truncate } = require('../services/logs');

module.exports = {
  name: Events.MessageUpdate,

  async execute(oldMessage, newMessage) {
    if (!newMessage.guild || newMessage.author?.bot) return;
    if (oldMessage.content === newMessage.content) return;

    await sendLog(newMessage.guild, {
      type: 'messages',
      title: 'Mensagem editada',
      description: `Autor: ${newMessage.author.tag}\nCanal: ${newMessage.channel}`,
      fields: [
        { name: 'Antes', value: truncate(oldMessage.content || 'Sem conteudo em cache') },
        { name: 'Depois', value: truncate(newMessage.content || 'Sem conteudo em cache') }
      ],
      level: 'warning',
      footer: `Mensagem ID: ${newMessage.id}`
    });
  }
};
