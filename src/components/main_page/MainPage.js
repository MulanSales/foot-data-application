import { Component } from '../lib/Component';
import { RelationType } from '../lib/RelationType';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';

import logoImage from '../../resources/img/logo.png';
import playerImage from '../../resources/img/player.png';
import worldMapImage from '../../resources/img/world-map.png'

const $ = document;

export const MainPage = class extends Component {

    /**
     * MainPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements, [baseCss, queriesCss]);

        this.init();

        const body = this.elements.body;
        this.createHeader(body);
        this.createSection(body, 'How it Works', 'works__section', this.createWorksContent);
        this.createSection(body, 'World Competitions', 'world__comps__section', this.createWorldCompetitionsContent);
        this.createSection(body, 'Player Details', 'players__details__section', (param) => {return;});
        this.createSection(body, 'About', 'about__section', (param) => {return;});
        this.createFooter(body);
    }

    /**
     * Create Header for the main page 
     * @param {Element} parent 
     */
    createHeader(parent) {
        const headerElement = $.createElement('header');
        parent.insertAdjacentElement('afterbegin', headerElement);

        const nav = $.createElement('nav');
        nav.setAttribute('class', 'main__nav');
        
        const nav_div = $.createElement('div');
        nav_div.setAttribute('class', 'main__nav__logo');

        const nav_div_img = $.createElement('img');
        nav_div_img.setAttribute('alt', "Image Logo");
        nav_div_img.setAttribute('src', `${logoImage}`);

        nav_div.insertAdjacentElement('beforeend', nav_div_img);
        nav.insertAdjacentElement('beforeend', nav_div);

        // Nav bar items
        const nav_items = $.createElement('ul');
        nav_items.setAttribute('class', 'main__nav__items');
        const items = ['Home', 'How It Works', 'World Competitions', 'About'];

        items.forEach(item => {
            const li_element = $.createElement('li');
            const li_element_a = $.createElement('a');

            li_element_a.setAttribute('href', '#');
            li_element_a.innerHTML = item;

            li_element.insertAdjacentElement('beforeend', li_element_a);
            nav_items.insertAdjacentElement('beforeend', li_element);
        });

        nav.insertAdjacentElement('beforeend', nav_items);
        
        // Creating main div element
        const main_page_div = $.createElement('div');
        main_page_div.setAttribute('class', 'main__page');

        const main_page_div_h1 = $.createElement('h1');
        main_page_div_h1.setAttribute('class', 'main__page__text');
        main_page_div_h1.innerHTML = `Track the world's most popular football competitions, matches, teams and players.`;

        const main_page_div_form = $.createElement('form');
        main_page_div_form.setAttribute('class', 'main__page__form');
        main_page_div_form.setAttribute('method', 'POST');
        main_page_div_form.setAttribute('action', '#');

        const main_page_div_form_input = $.createElement('input');
        main_page_div_form_input.setAttribute('type', 'search');
        main_page_div_form_input.setAttribute('name', 'search');
        main_page_div_form_input.setAttribute('placeholder', 'Insert a competition or match');

        const main_page_div_form_label = $.createElement('label');
        main_page_div_form_label.setAttribute('for', 'search');

        const main_page_div_form_label_button = $.createElement('button');
        main_page_div_form_label_button.setAttribute('class', 'search__btn');
        main_page_div_form_label_button.setAttribute('type', 'submit');

        const main_page_div_form_label_button_i = $.createElement('i');
        main_page_div_form_label_button_i.setAttribute('class', 'ion-android-search');

        main_page_div_form_label_button.insertAdjacentElement('beforeend', main_page_div_form_label_button_i);

        main_page_div_form_label.insertAdjacentElement('beforeend', main_page_div_form_label_button);

        main_page_div_form.insertAdjacentElement('beforeend', main_page_div_form_input);
        main_page_div_form.insertAdjacentElement('beforeend', main_page_div_form_label);

        main_page_div.insertAdjacentElement('beforeend', main_page_div_h1);
        main_page_div.insertAdjacentElement('beforeend', main_page_div_form);

        headerElement.insertAdjacentElement('beforeend', nav);
        headerElement.insertAdjacentElement('beforeend', main_page_div);

        return;
    }

    /**
     * Create Header for sections 
     * @param {Element} parent 
     * @param {String} title
     * @param {Function} cb
     */
    createSection(parent, title, sectionClass, cb) {
        const section = this.createElement('section', {
            class: sectionClass
        });

        const div_section_title = this.createElement('div', {
            class: 'section__title'
        });

        const div_section_title_i = this.createElement('i', {
            class: 'ion-ios-football'
        });

        const div_section_title_h2 = this.createElement('h2', {
            innerHTML: title
        });

        this.createRelationship(
            div_section_title, 
            RelationType.PARENTOF, [
                div_section_title_i,
                div_section_title_h2
            ]
        );

        this.createRelationship(
            section, 
            RelationType.PARENTOF, 
            [div_section_title]
        );

        this.createRelationship(
            parent,
            RelationType.PARENTOF,
            [section]
        );

        return cb.bind(this)(section);
    }

    createWorksContent(parent) {
        const div_works_content = this.createElement('div', {
            class: 'works__content'
        });

        const div_works_content_div = this.createElement('div', {
            class: 'works__content__div'
        });

        const div_works_content_img = this.createElement('img', {
            src: `${playerImage}`,
            alt: 'Football Player Art'
        });

        const works_contents_divs = ['ion-ios-personadd', 'ion-android-walk', 'ion-android-calendar'];
        for (let i = 0; i < works_contents_divs.length; i++) {
            const works_content_div = this.createElement('div', {
                class: `works__content--${i+1}`
            });

            const works_content_div_i = this.createElement('i', {
                class: works_contents_divs[i]
            });

            const works_content_div_p = this.createElement('p', {
                innerHTML: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
            })

            this.createRelationship(
                works_content_div,
                RelationType.PARENTOF,
                [works_content_div_i, works_content_div_p]
            );

            this.createRelationship(
                div_works_content_div,
                RelationType.PARENTOF,
                [works_content_div]
            );
        }

        this.createRelationship(
            div_works_content,
            RelationType.PARENTOF,
            [div_works_content_div, div_works_content_img]
        );

        this.createRelationship(
            parent,
            RelationType.PARENTOF,
            [div_works_content]
        );
    }

    createWorldCompetitionsContent(parent) {
        const world_comps_main_div = this.createElement('div', {
            class: 'world__comps__main__div'
        });

        const worlds_comps_content = this.createElement('div', {
            class: 'world__comps__content'
        });

        const worlds_comps_content_img = this.createElement('img', {
            src: `${worldMapImage}`,
            alt: 'World Map Figure'
        });


        this.createRelationship(
            worlds_comps_content,
            RelationType.PARENTOF,
            [worlds_comps_content_img]
        );

        const trophiesCount = 2;
        for (let i = 0; i < trophiesCount; i++) {
            const worlds_comps_content_i = this.createElement('i', {
                class: 'ion-trophy'
            });

            this.createRelationship(
                worlds_comps_content,
                RelationType.PARENTOF,
                [worlds_comps_content_i]
            );
        };

        this.createRelationship(
            world_comps_main_div,
            RelationType.PARENTOF,
            [worlds_comps_content]
        );

        this.createRelationship(
            parent,
            RelationType.PARENTOF,
            [world_comps_main_div]
        );
    }

    createFooter(parent) {
        const footer = this.createElement('footer');

        this.createRelationship(parent, RelationType.PARENTOF, [footer]);
    }
}
