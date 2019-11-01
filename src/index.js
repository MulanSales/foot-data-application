import { Component } from './components/lib/Component';
import * as MainPage from './components/main_page/MainPage';
import * as SignupPage from './components/signup_page/SignupPage';
import * as SigninPage from './components/signin_page/SigninPage';
import * as MobileNav from './components/mobile_nav/Mobile_Nav';
import * as DashBoardPage from './components/dashboard_page/DashBoardPage';
import * as CompetitionBoard from './components/competitions_board/CompetitonsBoard';
import * as ErrorModal from './components/error_modal/ErrorModal';

import Info from './models/Info';
import Competitions from './models/Competitions';
import Competition from './models/Competition';

/**** Global state of the app
 * @var {Object} state
 * @var {Array} loadedComponent
 */
const state = {
    loadedComponent: '',
    searchQuery: {
        inputValue: '',
        inputCategory: ''
    },
    error: ''
};

/*** Elements of the initial page
 * @param {Object} elements 
 */
const elements = {
    html: document.querySelector('html'),
    head: document.querySelector('head'),
    body: document.querySelector('body'),
    internal: {},
    external: {}
}

const MainPageEvent = async () => {

    // Loading info object from API
    if (!elements.external.info) {
        elements.external.info = await new Info().fetchResources();
        elements.internal.animate = true;
    } else {
        elements.internal.animate = false;
    }

    // Initializing component of main page
    MainPage.startComponent(elements)
    .then(() => {
        // Initializing component dependencies of main page
        MobileNav.startComponent(elements);
    })
    .then(() => {
        MainPage.homeTrigger(state, loadSinglePage);
        MainPage.signupTrigger(state, loadSinglePage);
        MainPage.signinTrigger(state, loadSinglePage);
        MainPage.searchTrigger(state, loadSinglePage);
        MainPage.dropDownTrigger();
        MainPage.howItWorksTrigger();
        MainPage.competitionsTrigger();
    })
    .catch(err => {
        console.log(err);
    });
};

const SignupPageEvent = async () => {
    SignupPage.startComponent(elements);
}

const SigninPageEvent = async () => {
    SigninPage.startComponent(elements);
}

const DashBoardEvent = async () => {
    DashBoardPage.startComponent(elements)
    .then(() => {
        if (state.searchQuery.inputCategory === 'CMP') {
            const competitions = new Competitions(state.searchQuery.inputValue);
            return competitions.fetchCompetitions();
        }
    })
    .then(result => {
        const queryObject = {
            searchQuery: state.searchQuery,
            res: result
        };

        DashBoardPage.createCarousel(elements.body, queryObject);
        DashBoardPage.homeLogoTrigger(state, loadSinglePage);
        DashBoardPage.carouselNavigationTrigger(queryObject);

        if (result.get().length > 0) {
            if (state.searchQuery.inputCategory === 'CMP') {
                const competition = new Competition(result.get()[0].id);

                return competition.fetchCompetition()
                .then(result => {

                    if (result.name) {
                        elements.external.competition = result;
                        CompetitionBoard.startComponent(elements);
                    } else {
                        // Display modal of error
                        elements.external.error = `Can't found requested resource`;
                        ErrorModal.startComponent(elements);
                        ErrorModal.modalCallTrigger(elements.body);
                    }
                }); 
            }
        }
    });
}

/****
 * @global App call on load
 */
window.addEventListener('load', () => {
   
    const titleElement = document.createElement('title');
    titleElement.innerHTML = 'FootData';
    
    elements.head.insertAdjacentElement('beforeend', titleElement);
    
    return loadSinglePage();
});

const loadSinglePage = () => {

    Component.clear(elements);

    switch(state.loadedComponent) {
        case 'SignupPage':
            return SignupPageEvent();
        case 'SigninPage':
            return SigninPageEvent();
        case 'DashBoardPage':
            return DashBoardEvent();
        default: 
            return MainPageEvent();
    };

};