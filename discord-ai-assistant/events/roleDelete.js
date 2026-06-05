const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildRoleDelete,

  async execute(role) {
    await sendLog(role.guild, {
      type: 'roles',
      title: 'Cargo apagado',
      description: `${role.name} (${role.id})`,
      level: 'danger',
      footer: `Cargo ID: ${role.id}`
    });
  }
};
