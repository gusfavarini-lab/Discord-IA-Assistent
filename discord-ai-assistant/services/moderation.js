const config = require('../config/config.json');
const { sendLog } = require('./logs');

const messageHistory = new Map();

async function checkMessage(message) {
  if (!config.moderation.enabled) return;

  const content = message.content.toLowerCase();
  const blockedWord = config.moderation.blockedWords.find((word) => content.includes(word.toLowerCase()));

  if (blockedWord) {
    await message.delete().catch(() => {});
    await sendLog(message.guild, {
      type: 'moderation',
      title: 'Filtro de palavras',
      description: `${message.author.tag} usou uma palavra bloqueada em ${message.channel}.`,
      level: 'danger',
      footer: `Usuario ID: ${message.author.id}`
    });
    return;
  }

  const key = `${message.guild.id}:${message.author.id}`;
  const now = Date.now();
  const userMessages = (messageHistory.get(key) || []).filter(
    (entry) => now - entry.createdAt <= config.moderation.floodWindowMs
  );

  userMessages.push({ content: message.content, createdAt: now });
  messageHistory.set(key, userMessages);

  const repeatedCount = userMessages.filter((entry) => entry.content === message.content).length;
  if (repeatedCount >= config.moderation.maxRepeatedMessages) {
    await message.delete().catch(() => {});
    await sendLog(message.guild, {
      type: 'moderation',
      title: 'Anti-spam',
      description: `${message.author.tag} enviou mensagens repetidas em ${message.channel}.`,
      level: 'danger',
      footer: `Usuario ID: ${message.author.id}`
    });
  }
}

module.exports = { checkMessage };
