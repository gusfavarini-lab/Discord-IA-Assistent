const { Events } = require('discord.js');
const { sendLog } = require('../services/logs');

module.exports = {
  name: Events.VoiceStateUpdate,

  async execute(oldState, newState) {
    if (oldState.channelId === newState.channelId) return;

    const member = newState.member || oldState.member;
    const description = oldState.channel && newState.channel
      ? `${member.user.tag} moveu de ${oldState.channel.name} para ${newState.channel.name}.`
      : oldState.channel
        ? `${member.user.tag} saiu de ${oldState.channel.name}.`
        : `${member.user.tag} entrou em ${newState.channel.name}.`;

    await sendLog(newState.guild || oldState.guild, {
      type: 'voice',
      title: 'Canal de voz',
      description,
      level: 'neutral',
      footer: `Usuario ID: ${member.id}`
    });
  }
};
