const { Events } = require('discord.js');
const { formatChannel, sendLog } = require('../services/logs');

module.exports = {
  name: Events.ChannelDelete,

  async execute(channel) {
    if (!channel.guild) return;

    await sendLog(channel.guild, {
      type: 'channels',
      title: 'Canal apagado',
      description: formatChannel(channel),
      level: 'danger',
      footer: `Canal ID: ${channel.id}`
    });
  }
};
