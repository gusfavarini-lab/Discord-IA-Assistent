const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.ChannelUpdate,

  async execute(oldChannel, newChannel) {
    if (!newChannel.guild) return;

    const changes = [];
    if (oldChannel.name !== newChannel.name) {
      changes.push(`Nome: ${oldChannel.name} -> ${newChannel.name}`);
    }
    if (oldChannel.parentId !== newChannel.parentId) {
      changes.push(`Categoria: ${oldChannel.parentId || 'nenhuma'} -> ${newChannel.parentId || 'nenhuma'}`);
    }
    if (!changes.length) return;

    await sendLog(newChannel.guild, {
      type: 'channels',
      title: 'Canal atualizado',
      description: changes.join('\n'),
      level: 'info',
      footer: `Canal ID: ${newChannel.id}`
    });
  }
};
