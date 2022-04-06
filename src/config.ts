import fetch from "node-fetch";

interface Database {
    username: string
    password: string
    database: string
    host: string
    dialect: string
}

interface DatabaseFromEnvironment {
    use_env_variable: boolean
}

interface Configuration {
    embargoes: string[]
    database : Database | DatabaseFromEnvironment
}

export const HACK_DIFFERENT_SERVER_ID = "779134930265309195";

export default class DiscourseConfiguration {
    private readonly _embargoes: RegExp[]

    constructor(data: Configuration) {
        this._embargoes = []

        for (const embargo in data.embargoes) {
            this._embargoes.push(new RegExp(embargo))
        }
    }

    static async get(): Promise<DiscourseConfiguration> {
        if (typeof process.env.CONFIGURATION_URL === 'undefined') {
            throw "No configuration url, would be useless"
        }

        const result = await fetch(process.env.CONFIGURATION_URL)
        if (result.ok) {
            const data = await result.json() as Configuration
            return new DiscourseConfiguration(data)
        }
        return new DiscourseConfiguration({embargoes: []})
    }

    static refresh() {
        DiscourseConfiguration.get().finally()
    }

    static setRefresh(minutes: number) {
        setTimeout(DiscourseConfiguration.refresh, minutes * 60 * 1000)
        this.refresh()
    }

    isEmbargoed(message: string): boolean {
        for (const embargo in this._embargoes) {
            if (embargo.match(message)) {
                return true
            }
        }

        return false
    }
}
