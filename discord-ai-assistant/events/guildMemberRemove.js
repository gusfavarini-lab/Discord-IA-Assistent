const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildMemberRemove,

  async execute(member) {
    await sendLog(member.guild, {
      type: 'members',
      title: 'Membro saiu',
      description: `${member.user.tag} saiu do servidor.`,
      level: 'warning',
      footer: `ID: ${member.id}`
    });
  }
};
