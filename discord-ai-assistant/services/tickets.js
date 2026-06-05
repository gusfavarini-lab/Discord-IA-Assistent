const fs = require('fs');
const path = require('path');
const { ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('../config/config.json');
const { sendLog } = require('./logs');

async function createTicket(interaction, reason) {
  const safeName = interaction.user.username.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 20);

  const channel = await interaction.guild.channels.create({
    name: `ticket-${safeName}`,
    type: ChannelType.GuildText,
    parent: config.channels.ticketsCategory.startsWith('ID_') ? null : config.channels.ticketsCategory,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
      },
      ...(config.roles.support.startsWith('ID_') ? [] : [{
        id: config.roles.support,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
      }])
    ],
    topic: `Ticket de ${interaction.user.tag} | Motivo: ${reason}`
  });

  await sendLog(interaction.guild, {
    type: 'tickets',
    title: 'Ticket criado',
    description: `${interaction.user.tag} abriu ${channel}.\nMotivo: ${reason}`,
    level: 'info',
    footer: `Usuario ID: ${interaction.user.id}`
  });

  return channel;
}

async function closeTicket(interaction) {
  const transcriptDir = path.join(__dirname, '..', 'transcripts');
  fs.mkdirSync(transcriptDir, { recursive: true });

  const messages = await interaction.channel.messages.fetch({ limit: 100 });
  const transcript = messages
    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
    .map((message) => `[${message.createdAt.toISOString()}] ${message.author.tag}: ${message.content}`)
    .join('\n');

  const fileName = `${interaction.channel.id}.txt`;
  fs.writeFileSync(path.join(transcriptDir, fileName), transcript || 'Ticket sem mensagens em cache.');

  await sendLog(interaction.guild, {
    type: 'tickets',
    title: 'Ticket fechado',
    description: `${interaction.user.tag} fechou ${interaction.channel.name}.\nHistorico salvo em transcripts/${fileName}.`,
    level: 'warning',
    footer: `Canal ID: ${interaction.channel.id}`
  });

  await interaction.reply({ content: 'Ticket fechado. Historico salvo localmente.', ephemeral: true });
  await interaction.channel.delete('Ticket fechado').catch(() => {});
}

module.exports = { createTicket, closeTicket };
