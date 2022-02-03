import {ArgsOf, Client, Discord, On} from "discordx";
import {GuildMember, PartialGuildMember, TextChannel} from "discord.js";

const MOD_LOG_CHANNEL = "928760909583749130"

@Discord()
class ModerationFilter {
    @On("guildMemberUpdate")
    private async userUpdated([oldMember, newMember] : ArgsOf<"guildMemberUpdate">, client: Client) {
        if (newMember.isCommunicationDisabled()) {
            let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

            await channel.send(`User <@!${newMember.user.id}> was timed out`)
        }
    }

    @On("guildBanAdd")
    private async banAdd([ban]: ArgsOf<"guildBanAdd">, client: Client) {
        let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

        await channel.send(`User <@!${ban.user.id}> was banned for ${ban.reason}`)
    }
}