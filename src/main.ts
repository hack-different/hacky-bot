import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import { Koa } from "@discordx/koa";

import DiscourseConfiguration from './config.js';
import Store from "./store";
import Config from './config'

DiscourseConfiguration.setRefresh(60);

export const client = new Client({
    simpleCommand: {
        prefix: "!",
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    // If you only want to use global commands only, comment this line
    botGuilds: [ Config.HACK_DIFFERENT_SERVER_ID ],
});

client.once("ready", async () => {
    let store = new Store()

    await store.migrate()

    // make sure all guilds are in cache
    await client.guilds.fetch();

    // init all application commands
    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });

    // init permissions; enabled log to see changes
    await client.initApplicationPermissions(true);

    // uncomment this line to clear all guild commands,
    // useful when moving to global commands from guild commands
    //  await client.clearApplicationCommands(
    //    ...client.guilds.cache.map((g) => g.id)
    //  );

    console.log("Bot started");
});

client.on("interactionCreate", (interaction: Interaction) => {
    client.executeInteraction(interaction);
});

client.on("messageCreate", async (message: Message) => {
    await client.executeCommand(message);
});

async function run() {
    await importx(
        dirname(__filename) + "/{events,commands,api}/**/*.{ts,js}"
    );

    // let's start the bot
    if (!process.env.DISCORD_BOT_TOKEN) {
        throw Error("Could not find DISCORD_BOT_TOKEN in your environment");
    }
    await client.login(process.env.DISCORD_BOT_TOKEN); // provide your bot token

    // ************* rest api section: start **********

    // api: prepare server
    const server = new Koa();

    // api: need to build the api server first
    await server.build();

    // api: let's start the server now
    const port = process.env.PORT ?? 3000;
    server.listen(port, () => {
        console.log(`discord api server started on ${port}`);
        console.log(`visit localhost:${port}/guilds`);
    });

    // ************* rest api section: end **********
}

run().then(() => console.log('Running'));