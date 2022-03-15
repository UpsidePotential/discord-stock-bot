import { Message } from "discord.js";
import { ICommand } from "../../icommand";
import puppeteer from 'puppeteer';

export const VixCommand: ICommand = {
    name: 'VIX futures',
    helpDescription: '!vix',
    showInHelp: true,
    trigger: (msg: Message) => msg.content.startsWith('!vix'),
    command: async (msg: Message) => {
        const browser = await puppeteer.launch({args: ["--proxy-server='direct://'", '--proxy-bypass-list=*']})
        const page = await browser.newPage();

        await page.goto('http://vixcentral.com');

        await page.waitForSelector('div#container1');
        const element = await page.$('div#container1');
        await element.screenshot({ path: 'vix.png' });

        await browser.close();

        msg.channel.send({
            files: [{
                attachment: 'vix.png',
                name: 'vix.png',
                description: 'vix futures structure'
            }]
        })
        .then(console.log)
        .catch(console.error);
    },
};