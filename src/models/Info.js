
export default class Info {
    constructor() {}

    fetchResources() {
        return fetch('https://foot-data-api.herokuapp.com/v1/info', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.json();
        })
        .then(obj => {
            this.players = obj.players;
            this.appName = obj.applicationName;
            this.description = obj.description;
            return this;
        })
        .catch(err => {
            console.log(err);
        });
    }
}