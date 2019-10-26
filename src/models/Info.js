
export default class Info {
    constructor() {}

    fetchResources() {
        const url = 'https://foot-data-api.herokuapp.com/';
        return fetch(`${url}v1/info`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.json();
        })
        .then(obj => {
            this.appName = obj.applicationName;
            this.description = obj.description;
            this.sections = obj.sections;
            this.cusRev = obj.customerReviews;

            this.cusRev.forEach(cr => {
                cr.imageUrl = url.concat(cr.imageUrl);
            });

            this.functionalities = obj.functionalities;
            this.comps = obj.competitions;
            this.about = obj.about;
            this.players = obj.players;

            return this;
        })
        .catch(err => {
            console.log(err);
        });
    }
}