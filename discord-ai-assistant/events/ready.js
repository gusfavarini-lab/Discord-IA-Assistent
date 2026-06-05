const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    console.log(`Bot online como ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: '/help | IA e suporte' }],
      status: 'online'
    });
  }
};
