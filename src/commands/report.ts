import {Client, Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction, TextChannel} from "discord.js";

const MOD_LOG_CHANNEL = "928760909583749130"

@Discord()
export default abstract class ReportCommand {
    @Slash("report")
    private async legit(@SlashOption("uid", {description: "person to report"}) uid: string,
                        interaction: CommandInteraction,
                        client: Client) {

        const channel = await client.channels.fetch(MOD_LOG_CHANNEL) as TextChannel;

        await channel.send(`User <@!${interaction.user.id}> reported content by user ${uid} in channel ${interaction.channel}`)

        await interaction.reply({content: "Awesome, I've passed that along to the mod squad.", ephemeral: true})
    }
}