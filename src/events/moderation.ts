import {ArgsOf, Client, Discord, On} from "discordx";
import {GuildMember, PartialGuildMember, TextChannel} from "discord.js";

const MOD_LOG_CHANNEL = "928760909583749130"

@Discord()
class ModerationFilter {
    @On("guildMemberUpdate")
    private async userUpdated([oldMember, newMember] : ArgsOf<"guildMemberUpdate">, client: Client) {
        if (newMember.isCommunicationDisabled()) {
            let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

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
                await channel.send(`User ${newMember.user.tag} was timed out by ${executor?.tag} for reasons: ${memberUpdateLog.reason}`);
            } else {
                await channel.send(`User ${newMember.user.tag} was timed out, but we don't know by who.`);
            }
        }
    }

    @On("guildMemberRemove")
    private async userRemoved([member] : ArgsOf<"guildMemberRemove">, client: Client) {
        let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const kickLog = fetchedLogs.entries.first();

        // Perform a coherence check to make sure that there's *something*
        if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

        // Now grab the user object of the person who kicked the member
        // Also grab the target of this action to double-check things
        const { executor, target } = kickLog;

        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same kicked member
        if (target?.id === member.id) {
            await channel.send(`${member.user.tag} kicked by ${executor?.tag}?`);
        } else {
            await channel.send(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
        }
    }

    @On("guildBanAdd")
    private async banAdd([ban]: ArgsOf<"guildBanAdd">, client: Client) {
        let channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const banLog = fetchedLogs.entries.first();

        // Perform a coherence check to make sure that there's *something*
        if (!banLog) {
            await channel.send(`${ban.user.tag} was banned but no audit log could be found. Reason: ${ban.reason}`);
            return
        }

        // Now grab the user object of the person who banned the member
        // Also grab the target of this action to double-check things
        const { executor, target } = banLog;

        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same banned member
        if (target?.id === ban.user.id) {
            await channel.send(`${ban.user.tag} got hit with the swift hammer of justice, wielded by the mighty ${executor?.tag} who said: ${ban.reason}`);
        } else {
            await channel.send(`${ban.user.tag} got hit with the swift hammer of justice, audit log fetch was inconclusive.`);
        }
    }
}