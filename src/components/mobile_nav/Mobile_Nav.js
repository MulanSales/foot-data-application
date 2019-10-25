import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

/**
 * @param {Object} elements 
 * @returns {Promise<MobileNav>}
 */
export const MobileNav = elements => {
    const component = new MobileNavClass(elements);
    return component.create();
};

const $ = document;

const MobileNavClass = class extends Component {
    /**
     * MainPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements, [baseCss, queriesCss]);
    }

    initialize() {
        this.renderMobileNav();
    }

    renderMobileNav() {

        const main_nav = $.querySelector('.main__nav');

        const mobile_nav = this.createElement('a', {
            class: 'mobile__nav__icon'
        });

        const mobile_nav_i = this.createElement('i', {
            class: 'ion-navicon-round'
        });

        this.createRelationship(mobile_nav, PARENTOF, [mobile_nav_i]);

        this.createRelationship(main_nav, PARENTOF, [mobile_nav]);

        this.toggleNavMenu(mobile_nav_i);
    }
    /**
     * MainPage constructor
     * @param {Element} mobile_nav
     * @param {Element} mobile_nav_icon
     */
    toggleNavMenu(mobile_nav_icon) {
        mobile_nav_icon.addEventListener('click', e => {
            var nav_menu = $.querySelector('.main__nav__items');

            const isMenuVisible = nav_menu.style.visibility === 'hidden' || !nav_menu.style.visibility;

            nav_menu.style.visibility = isMenuVisible ? 'visible' : 'hidden';

            if (mobile_nav_icon.classList.contains('ion-navicon-round')) {
                mobile_nav_icon.classList.replace('ion-navicon-round', 'ion-close-round');
                mobile_nav_icon.classList.add('animated', 'bounceIn');
                nav_menu.classList.add('animated', 'fadeInDown');
            }
            else {
                mobile_nav_icon.classList.replace('ion-close-round', 'ion-navicon-round');
                mobile_nav_icon.classList.remove('animated', 'bounceIn');
                nav_menu.classList.remove('animated', 'fadeInDown');
            };

        });
    }

};