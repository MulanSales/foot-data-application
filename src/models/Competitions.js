import Model from "./Model";

export default class Competitions extends Model {
    constructor(name) { 
        super();
        this.name = name;
        this.competitions = [];
    }

    fetchCompetitions() {

        return fetch(
            `${this.url}v1/competitions${this.name ? '?name=' + this.name : ''}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'
            }
        })
        .then(fetchedResource => {
            return fetchedResource.json();
        })
        .then(competitions => {
            Array.from(competitions).forEach(c => {
                const competition = {};
                competition.id = c.id;
                competition.area = c.area.name;
                competition.name = c.name;
                competition.plan = c.plan;
                competition.currentSeason = c.currentSeason;
                competition.numberOfSeasons = c.numberOfAvailableSeasons;

                this.competitions.push(competition);
            });
            return this;
        })
        .catch (err => {
            console.log(err);
        });
    }

    get() {
        return this.competitions;
    }
}