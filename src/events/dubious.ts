// Scan references and links to dubious sources of information


import {ArgsOf, Client, Discord, On} from "discordx";

@Discord()
class DubiousFilter {
    @On("messageCreate")
    private async onMessage([message]: ArgsOf<"messageCreate">, client: Client) {
        if (message.content.match(/jonathandata1/)) {
            console.log(`deleting message from ${message.author.username} in channel ${message.channel}`)
            await message.delete()
            await message.author.send(`Yo, had to delete that message from ${message.channel}`)
        }
    }
}