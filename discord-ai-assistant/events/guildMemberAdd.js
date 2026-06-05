const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildMemberAdd,

  async execute(member) {
    await sendLog(member.guild, {
      type: 'members',
      title: 'Membro entrou',
      description: `${member.user.tag} entrou no servidor.`,
      level: 'success',
      footer: `ID: ${member.id}`
    });
  }
};
