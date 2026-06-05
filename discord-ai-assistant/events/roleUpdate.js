const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildRoleUpdate,

  async execute(oldRole, newRole) {
    const changes = [];
    if (oldRole.name !== newRole.name) {
      changes.push(`Nome: ${oldRole.name} -> ${newRole.name}`);
    }
    if (oldRole.color !== newRole.color) {
      changes.push(`Cor: ${oldRole.hexColor} -> ${newRole.hexColor}`);
    }
    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
      changes.push('Permissoes alteradas');
    }
    if (!changes.length) return;

    await sendLog(newRole.guild, {
      type: 'roles',
      title: 'Cargo atualizado',
      description: changes.join('\n'),
      level: 'info',
      footer: `Cargo ID: ${newRole.id}`
    });
  }
};
