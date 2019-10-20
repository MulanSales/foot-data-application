import { MainPage } from './components/main_page/MainPage';
import baseCss from './resources/css/style.css';
import ionicCss from './vendors/css/ionicons.css'
import animateCss from './vendors/css/animate.css';

/**** Global state of the app
 * @var {Object} state
 * @var {Array} loadedComponents
 */
const state = {
    loadedComponents: {

    }
};

/*** Elements of the initial page
 * @param {Object} elements 
 */
const elements = {
    head: document.querySelector('head'),
    body: document.querySelector('body')
}

/****
 * @global App call on load
 */
window.addEventListener('load', () => {

    insertStyleSheets([
        `${baseCss}`,
        `${ionicCss}`,
        `${animateCss}`
    ], elements.head);

    insertTitle("FootData", elements.head);

    const mainPage = new MainPage(elements);
    state.loadedComponents[MainPage.name] = mainPage;

});

/*****
 * @param {[String]} paths
 * @param {Element} parent
 */
const insertStyleSheets = (paths, parent) => {

    paths.forEach(path => {
        const stylesheetLink = document.createElement('link'); 
        stylesheetLink.setAttribute('href', `${path}`);
        stylesheetLink.setAttribute('rel', 'stylesheet');
        stylesheetLink.setAttribute('type', 'css');
        
        parent.insertAdjacentElement('beforeend', stylesheetLink);
    });

    return;

};
/*****
 * @param {String} title
 * @param {Element} parent
 * 
 */
const insertTitle = (title, parent) => {
    const titleElement = document.createElement('title');
    titleElement.innerHTML = title;
    
    return parent.insertAdjacentElement('beforeend', titleElement);
}
