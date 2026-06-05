# Discord AI Assistant

Assistente inteligente para Discord com recursos de IA, moderacao automatica, tickets de suporte, sistema de logs e comandos personalizados.

## Funcionalidades

### Inteligencia Artificial

- Responde perguntas dos usuarios.
- Explica codigos.
- Resume textos.
- Gera ideias e conteudos.

### Moderacao

- Anti-spam.
- Anti-flood.
- Filtro de palavras proibidas.
- Logs automaticos.

### Sistema de Tickets

- Criacao automatica de tickets.
- Fechamento de tickets.
- Historico salvo em `transcripts/`.

### Logs

- Entrada e saida de membros.
- Mensagens apagadas.
- Mensagens editadas.
- Canais criados, apagados e atualizados.
- Cargos criados, apagados e atualizados.
- Alteracoes em cargos.
- Bans adicionados e removidos.
- Entrada, saida e movimentacao em canais de voz.

### Administracao

- Configuracao por arquivo JSON.
- Permissoes por cargo.
- Comandos slash.

## Estrutura

```text
discord-ai-assistant/
├── commands/
│   ├── ping.js
│   ├── help.js
│   ├── ai.js
│   └── ticket.js
├── events/
│   ├── ready.js
│   ├── interactionCreate.js
│   ├── guildMemberAdd.js
│   ├── guildMemberRemove.js
│   ├── guildMemberUpdate.js
│   ├── messageCreate.js
│   └── messageDelete.js
├── services/
│   ├── openai.js
│   ├── moderation.js
│   ├── logs.js
│   └── tickets.js
├── config/
│   └── config.json
├── assets/
│   ├── banner.png
│   └── logo.png
├── .env.example
├── package.json
├── README.md
├── deploy-commands.js
└── index.js
```

## Como usar

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env` e preencha:

```env
DISCORD_TOKEN=seu_token_do_bot
DISCORD_CLIENT_ID=id_da_aplicacao
DISCORD_GUILD_ID=id_do_servidor_para_deploy_local
OPENAI_API_KEY=sua_chave_openai
```

3. Ajuste os IDs em `config/config.json`.

O bloco `logs.events` permite ligar ou desligar categorias especificas:

```json
{
  "logs": {
    "enabled": true,
    "events": {
      "members": true,
      "messages": true,
      "roles": true,
      "channels": true,
      "bans": true,
      "voice": true,
      "moderation": true,
      "tickets": true
    }
  }
}
```

4. Registre os comandos slash:

```bash
npm run deploy
```

5. Inicie o bot:

```bash
npm start
```

## Permissoes recomendadas

- `View Channels`
- `Send Messages`
- `Manage Messages`
- `Manage Channels`
- `Read Message History`
- `Ban Members`, se quiser registrar bans.

Para eventos de mensagens, moderacao, membros e voz, habilite tambem os intents necessarios no painel do Discord Developer Portal, incluindo `Message Content` e `Server Members`.
