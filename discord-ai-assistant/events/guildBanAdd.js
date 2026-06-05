const { Events } = require('discord.js');
const { formatUser, sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildBanAdd,

  async execute(ban) {
    await sendLog(ban.guild, {
      type: 'bans',
      title: 'Usuario banido',
      description: formatUser(ban.user),
      level: 'danger',
      footer: `Usuario ID: ${ban.user.id}`
    });
  }
};
