import {Client, Discord, Slash, SlashGroup, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";

@Discord()
abstract class LegitimizeCommand {
    @Slash("legit")
    private legit(@SlashOption("uid", { description: "person to elect or confirm" })
                              uid: string,
                      interaction: CommandInteraction,
                      client: Client) {

    }
}