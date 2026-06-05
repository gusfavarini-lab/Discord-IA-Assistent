const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY nao encontrada. Copie .env.example para .env e preencha a chave da OpenAI.');
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function askAI(prompt, context = {}) {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: [
          'Voce e um assistente util para um servidor Discord.',
          'Responda em portugues do Brasil, com clareza e objetividade.',
          'Ajude com perguntas, explicacao de codigo, resumos e ideias criativas.'
        ].join(' ')
      },
      {
        role: 'user',
        content: `Usuario: ${context.username || 'desconhecido'}\nServidor: ${context.serverName || 'desconhecido'}\n\n${prompt}`
      }
    ],
    temperature: 0.7,
    max_tokens: 700
  });

  return response.choices[0]?.message?.content || 'Nao consegui gerar uma resposta.';
}

module.exports = { askAI };
