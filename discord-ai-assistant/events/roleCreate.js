const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildRoleCreate,

  async execute(role) {
    await sendLog(role.guild, {
      type: 'roles',
      title: 'Cargo criado',
      description: `${role.name} (${role.id})`,
      level: 'success',
      footer: `Cargo ID: ${role.id}`
    });
  }
};
