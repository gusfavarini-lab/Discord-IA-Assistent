const { Events } = require('discord.js');
const { formatUser, sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildBanRemove,

  async execute(ban) {
    await sendLog(ban.guild, {
      type: 'bans',
      title: 'Ban removido',
      description: formatUser(ban.user),
      level: 'success',
      footer: `Usuario ID: ${ban.user.id}`
    });
  }
};
