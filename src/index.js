import * as MainPage from './components/main_page/MainPage';
import * as SignupPage from './components/signup_page/SignupPage';
import * as MobileNav from './components/mobile_nav/Mobile_Nav';
import baseCss from './resources/css/style.css';
import ionicCss from './vendors/css/ionicons.css'
import animateCss from './vendors/css/animate.css';

import Info from './models/Info';
import { Component } from './components/lib/Component';

/**** Global state of the app
 * @var {Object} state
 * @var {Array} loadedComponent
 */
const state = {
    loadedComponent: ''
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
    })
    .catch(err => {
        console.log(err);
    });
};

const SignupPageEvent = async () => {
    SignupPage.startComponent(elements);
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
        default: 
            return MainPageEvent();
    };

};