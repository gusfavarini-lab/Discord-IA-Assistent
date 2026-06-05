const { EmbedBuilder } = require('discord.js');
const config = require('../config/config.json');

const COLORS = {
  success: 0x57f287,
  warning: 0xfee75c,
  danger: 0xed4245,
  info: 0x5865f2,
  neutral: 0x99aab5
};

function isLogEnabled(type) {
  if (config.logs?.enabled === false) return false;
  if (!type) return true;
  return config.logs?.events?.[type] !== false;
}

function formatUser(user) {
  if (!user) return 'Desconhecido';
  return `${user.tag || user.username} (${user.id})`;
}

function formatChannel(channel) {
  if (!channel) return 'Desconhecido';
  return `${channel.name || channel.id} (${channel.id})`;
}

function truncate(value, maxLength = 900) {
  if (!value) return 'Sem conteudo';
  return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;
}

async function sendLog(guild, payload) {
  if (!isLogEnabled(payload.type)) return;

  const channelId = config.channels.logs;
  if (!channelId || channelId.startsWith('ID_')) return;

  const channel = await guild.channels.fetch(channelId).catch(() => null);
  if (!channel?.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle(payload.title)
    .setDescription(truncate(payload.description, 3500))
    .setColor(payload.color || COLORS[payload.level] || config.embedColor)
    .setTimestamp();

  if (payload.fields?.length) {
    embed.addFields(payload.fields.map((field) => ({
      name: field.name,
      value: truncate(String(field.value), 1000),
      inline: Boolean(field.inline)
    })));
  }

  if (payload.footer) {
    embed.setFooter({ text: payload.footer });
  }

  await channel.send({ embeds: [embed] }).catch(() => {});
}

module.exports = {
  COLORS,
  formatChannel,
  formatUser,
  sendLog,
  truncate
};
