import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { commandList } from '../../commandlist';

export const HelpCommand: ICommand = {
  name: 'Help',
  helpDescription: '!help',
  showInHelp: false,
  trigger: (msg: Message) => msg.content.startsWith('!help'),
  command: async (message: Message) => {
    const fields = commandList.filter((value) => value.showInHelp).map((command) => ({
      name: command.name,
      value: command.helpDescription,
    }));

    message.channel.send({
      embeds: [{
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL(),
        },
        color: 3447003,
        title: 'StockBot BFC Edition',
        url: 'https://github.com/UpsidePotential/discord-stock-bot/blob/master/README.md',
        description: 'Click above to get a detailed help for what this bot can do',
        fields,
      },
      ],
    }).catch((error) => {
  		//Temp fix for !help
      message.channel.send("1-800-GAMBLER is the phone number for the National Problem Gambling Helpline. \n\
        It serves as a resource for individuals who lack alpha and the spirit of a true investor.");
	  });
    return Promise.resolve();
  },
};
