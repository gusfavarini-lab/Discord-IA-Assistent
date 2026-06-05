const { Events } = require('discord.js');
const { checkMessage } = require('../services/moderation');

module.exports = {
  name: Events.MessageCreate,

  async execute(message) {
    if (message.author.bot || !message.guild) return;
    await checkMessage(message);
  }
};
