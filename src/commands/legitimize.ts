import {Client, Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";

@Discord()
export default abstract class LegitimizeCommand {
    @Slash("legit")
    private async legit(@SlashOption("uid", {description: "person to elect or confirm"})
                            uid: string,
                        interaction: CommandInteraction,
                        client: Client) {

        await interaction.reply("Yeah, working on that, NotImplementedException")
    }
}