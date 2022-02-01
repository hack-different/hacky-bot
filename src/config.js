export default class DiscourseConfiguration {
    _embargoes;
    constructor(data) {
        this._embargoes = [];
        for (const embargo in data.embargoes) {
            this._embargoes.push(new RegExp(embargo));
        }
    }
    static async get() {
        if (typeof process.env.CONFIGURATION_URL !== 'string') {
            throw "No configuration url, would be useless";
        }
        const result = await fetch(new Request(process.env.CONFIGURATION_URL));
        if (result.ok) {
            const data = await result.json();
            return new DiscourseConfiguration(data);
        }
        return new DiscourseConfiguration({ embargoes: [] });
    }
    static refresh() {
        this.get().finally();
    }
    static setRefresh(minutes) {
        setTimeout(DiscourseConfiguration.refresh, minutes * 60 * 1000);
        this.refresh();
    }
    isEmbargoed(message) {
        for (const embargo in this._embargoes) {
            if (embargo.match(message)) {
                return true;
            }
        }
        return false;
    }
}
