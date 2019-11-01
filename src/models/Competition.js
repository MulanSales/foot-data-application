import Model from "./Model";

export default class Competition extends Model {
    constructor(id) {
        super();
        this.id = id;
    }

    fetchCompetition() {
        return fetch(
            `${this.url}v1/competition?id=${this.id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'
            }
        })
        .then(fetchedResource => {
            return fetchedResource.json();
        })
        .then((data) => {
            if (data.competition) {
                this.area = data.competition.area;
                this.name = data.competition.name;
                this.code = data.competition.code;
                this.plan = data.competition.plan;
                this.currentSeason = data.competition.currentSeason;
                this.seasons = data.competition.seasons;
                this.matches = data.competition.matches.items;
                this.standings = data.competition.standings.items;
                this.statistics = data.competition.statistics;
                this.updatedAt = data.competition.lastUpdated;
            }

            return this;
        })
        .catch(err => {
            console.log(err);
        });
    }

    getMatches() {
        return this.matches;
    }

    getStandings() {
        return this.standings;
    }

    getStatistics() {
        return this.statistics;
    }

}