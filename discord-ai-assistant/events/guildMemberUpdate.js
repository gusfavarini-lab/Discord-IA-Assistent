const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.GuildMemberUpdate,

  async execute(oldMember, newMember) {
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const added = newRoles.filter((role) => !oldRoles.has(role.id));
    const removed = oldRoles.filter((role) => !newRoles.has(role.id));

    if (!added.size && !removed.size) return;

    await sendLog(newMember.guild, {
      type: 'roles',
      title: 'Cargos alterados',
      description: [
        `Membro: ${newMember.user.tag}`,
        added.size ? `Adicionados: ${added.map((role) => role.name).join(', ')}` : null,
        removed.size ? `Removidos: ${removed.map((role) => role.name).join(', ')}` : null
      ].filter(Boolean).join('\n'),
      level: 'info',
      footer: `ID: ${newMember.id}`
    });
  }
};
