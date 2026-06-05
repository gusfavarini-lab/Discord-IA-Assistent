const { Events } = require('discord.js');
const { formatChannel, sendLog } = require('../services/logs');

module.exports = {
  name: Events.ChannelCreate,

  async execute(channel) {
    if (!channel.guild) return;

    await sendLog(channel.guild, {
      type: 'channels',
      title: 'Canal criado',
      description: formatChannel(channel),
      level: 'success',
      footer: `Canal ID: ${channel.id}`
    });
  }
};
