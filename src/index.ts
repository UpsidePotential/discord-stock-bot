import { Client, GatewayIntentBits } from 'discord.js';
import NodeCache from 'node-cache';
import { commandList } from './commandlist';

require('dotenv').config();

const client = new Client({ intents: 
  [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});
client.on('ready', () => {
  console.log('I am ready!');
});

const cache = new NodeCache();

client.on('messageCreate', (msg) => {
  const commands = commandList.filter((command) => command.trigger(msg));
  Promise.all(commands.map(async (command) => {
    command.command(msg, { cache });
  })).then();
});

client.login(process.env.TOKEN);
