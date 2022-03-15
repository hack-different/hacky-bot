import {ArgsOf, Client, Discord, On} from "discordx";
import {GuildMember, PartialGuildMember, TextChannel} from "discord.js";

const MOD_LOG_CHANNEL = "928760909583749130"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Discord()
class ModerationFilter {
    @On("guildMemberUpdate")
    private async userUpdated([oldMember, newMember] : ArgsOf<"guildMemberUpdate">, client: Client) {
        if (newMember.isCommunicationDisabled()) {
            let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

            await delay(5000)

            const fetchedLogs = await newMember.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_UPDATE',
            });
            // Since there's only 1 audit log entry in this collection, grab the first one
            const memberUpdateLog = fetchedLogs.entries.first();

            // Perform a coherence check to make sure that there's *something*
            if (!memberUpdateLog) return console.log(`A message by ${newMember.user.tag} was deleted, but no relevant audit logs were found.`);

            // Now grab the user object of the person who deleted the message
            // Also grab the target of this action to double-check things
            const { executor, target } = memberUpdateLog;

            // Update the output with a bit more information
            // Also run a check to make sure that the log returned was for the same author's message
            if (target?.id === newMember.user.id) {
                await channel.send(`User ${newMember.user.tag} was timed out by <@!${executor?.id}> who said: '${memberUpdateLog.reason}'`);
            } else {
                await channel.send(`User ${newMember.user.tag} was timed out, but we don't know by who.`);
            }
        }
    }

    @On("guildMemberRemove")
    private async userRemoved([member] : ArgsOf<"guildMemberRemove">, client: Client) {
        let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

        await delay(5000)

        const fetchedUserLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            user: member.user,
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const moderationLog = fetchedUserLogs.entries.first();

        if (moderationLog) {
            await channel.send(`${moderationLog?.target} was ${moderationLog?.actionType} by ${moderationLog?.executor} for reason ${moderationLog.reason}`);
        }
        else {
            // Perform a coherence check to make sure that there's *something*
            if (!moderationLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
        }
    }
}
