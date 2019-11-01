import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

/**
 * @param {Object} elements 
 * @returns {Promise<CompetitionsBoardClass>}
 */
export const startComponent = elements => {
    const component = new CompetitionsBoardClass(elements);
    return component.create();
};

const $ = document;

const CompetitionsBoardClass = class extends Component {
    /**
     * CompetitionsBoardPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements);
    }

    initialize() {
        // Render here all class functions
        const competition = this.elements.external.competition;
        const competition_container_cols = this.createCompetitionsContainer(this.elements.body, competition.matches);

        this.createMatchesContainer(competition_container_cols[0], competition.getMatches());
    }

    createCompetitionsContainer(parent) {
        const competition_container = this.CE('div', {class: 'competition__container'});
        const competition_container_c1 = this.CE('div', {class: 'competition__container--c1'});
        const competition_container_c2 = this.CE('div', {class: 'competition__container--c2'});

        this.CR(competition_container, PARENTOF, [competition_container_c1, competition_container_c2]);

        this.CR(parent, PARENTOF, [competition_container]);

        return [competition_container_c1, competition_container_c2];
    }

    /**
     * 
     * @param {Element} parent 
     * @param {[]} matchesItems 
     */
    createMatchesContainer(parent, matchesItems) {
        let competition_matches_items = '';

        let competitionIndex = 1;
        matchesItems.forEach(mi => {

            let statusColor;
            switch(mi.status) {
                case 'FINISHED':
                    statusColor = '#2ecc71'
                    break;
            }

            competition_matches_items = competition_matches_items.concat(`
                <div class='competitions__match__item' ${competitionIndex > 6 ? `style='display:none'`: ''}>
                    <p class='match__status' ${statusColor? `style='color:${statusColor}'`: ''}>${mi.status}</p>
                    <p class='home__team'>${mi.homeTeam.name}</p>
                    <p class='score__home__team'>${mi.score.fullTime.homeTeam}</p>
                    <i class='ion-android-cancel'></i>
                    <p class='score__away__team'>${mi.score.fullTime.awayTeam}</p>
                    <p class='away__team'>${mi.awayTeam.name}</p>
                    <i class='ion-ios-plus-outline'></i>
                    <i class='ion-ios-copy-outline'></i>
                </div>
            `);
            competitionIndex++;
        });

        const competitions_matches_container = `
            <div class='competitions__matches__container'>
                <h1>Matches</h1>
                <div class='competitions__matches_items'>
                    ${competition_matches_items}            
                </div>
            </div>
        `;

        parent.insertAdjacentHTML('beforeend', competitions_matches_container);
    }

    createGeneralInfoContainer() {
        const competition_info_container = `

        `;
    }

    createStandingsContainer() {

    }

    createStatisticsContainer() {

    }

};