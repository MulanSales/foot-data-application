import { Component } from '../lib/Component';
import { PARENTOF, SIBLINGOF, CHILDOF } from '../lib/RelationType';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';

import logoImage from '../../resources/img/logo.png';
import playerImage from '../../resources/img/player.png';
import worldMapImage from '../../resources/img/world-map.png';
import cr7Image from './img/player3.jpg';

import '../../vendors/js/noframework.waypoints';

/**
 * @param {Object} elements 
 * @returns {Promise<MainPage>}
 */
export const MainPage = elements => {
    const component = new MainPageClass(elements);
    return component.create();
};

const $ = document;

const MainPageClass = class extends Component {
    /**
     * MainPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
       super(
            elements,
            [baseCss, queriesCss]
        );
    }

    initialize() {
        try {
            this.init();
    
            const body = this.elements.body;
            const sectionsTitles = this.elements.external.info.sections.slice(1, 6);
            this.createHeader(body);
            this.createSection(body, sectionsTitles[0], 'works__section', this.createWorksContent);
            this.createSection(body, sectionsTitles[1], 'world__comps__section', this.createWorldCompetitionsContent);
            this.createSection(body, sectionsTitles[2], 'players__details__section', this.createPlayerDetailsContent);
            this.createSection(body, sectionsTitles[4], 'customers__reviews', this.createCustomerReviewsSection);
            this.createSection(body, sectionsTitles[3], 'about__section', (param) => {return;});
            this.createFooter(body);
            
            this.animate();
            return this;
        } catch (err) {
            console.log(err);
            return err;
        }
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

        const nav_items_names = this.elements.external.info.sections;

        nav_items_names.push('sign up', 'sign in');
        nav_items_names[3] = nav_items_names[6];
        nav_items_names[4] = nav_items_names[7];

        nav_items_names.slice(0, 5).forEach(item => {
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
        main_page_div_h1.innerHTML = this.elements.external.info.description;

        const main_page_div_form = $.createElement('form');
        main_page_div_form.setAttribute('class', 'main__page__form');
        main_page_div_form.setAttribute('method', 'POST');
        main_page_div_form.setAttribute('action', '#');

        const main_page_div_form_input = $.createElement('input');
        main_page_div_form_input.setAttribute('type', 'search');
        main_page_div_form_input.setAttribute('name', 'search');
        main_page_div_form_input.setAttribute('placeholder', 'Insert a competition to search');

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

        main_page_div.insertAdjacentElement('beforeend', main_page_div_h1);
        main_page_div.insertAdjacentElement('beforeend', main_page_div_form);

        headerElement.insertAdjacentElement('beforeend', nav);
        headerElement.insertAdjacentElement('beforeend', main_page_div);


        // Create dropdown menu for search categories
        const dropdown_items = ['CMP', 'PLR', 'TM'];

        const main_page_div_form_dropdown = this.createElement('div', {
            class: 'dropdown'
        });

        const form_dropdown_btn = this.createElement('button', {
            class: 'dropbtn'
        });

        const form_dropdown_i = this.createElement('i', {
            class: 'ion-android-arrow-dropdown',
            innerHTML: dropdown_items[0]
        });

        const form_dropdown_content = this.createElement('div', {
            class: 'dropdown-content'
        });

        dropdown_items.forEach(di => {
            const dropdown_item_a = this.createElement('a', {
                href: '/',
                innerHTML: di
            });
            
            this.createRelationship(form_dropdown_content, PARENTOF, [dropdown_item_a]);

        });

        this.createRelationship(form_dropdown_btn, PARENTOF, [form_dropdown_i]);

        this.createRelationship(
           main_page_div_form_dropdown, 
           PARENTOF, 
           [form_dropdown_btn, form_dropdown_content]
        );

        this.createRelationship(main_page_div_form,
            PARENTOF, 
            [main_page_div_form_dropdown, main_page_div_form_label]
        );

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
            PARENTOF, [
                div_section_title_i,
                div_section_title_h2
            ]
        );

        this.createRelationship(
            section, 
            PARENTOF, 
            [div_section_title]
        );

        this.createRelationship(
            parent,
            PARENTOF,
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
            class: 'works__content__img',
            src: `${playerImage}`,
            alt: 'Football Player Art'
        });

        const works_content_texts = this.elements.external.info.functionalities;

        const works_contents_divs = ['ion-ios-personadd', 'ion-android-walk', 'ion-android-calendar'];
        for (let i = 0; i < works_contents_divs.length; i++) {
            const works_content_div = this.createElement('div', {
                class: `works__content--${i+1}`
            });

            const works_content_div_i = this.createElement('i', {
                class: works_contents_divs[i]
            });

            const works_content_div_p = this.createElement('p', {
                innerHTML: works_content_texts[i] 
            })

            this.createRelationship(
                works_content_div,
                PARENTOF,
                [works_content_div_i, works_content_div_p]
            );

            this.createRelationship(
                div_works_content_div,
                PARENTOF,
                [works_content_div]
            );
        }

        this.createRelationship(
            div_works_content,
            PARENTOF,
            [div_works_content_div, div_works_content_img]
        );

        this.createRelationship(
            parent,
            PARENTOF,
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

        const worlds_comps_content_text = this.createElement('div', {
            class: 'world__comps__content__text'
        });

        const worlds_comps_content_text_p = this.createElement('p', {
            innerHTML: this.elements.external.info.about[0]
        });

        this.createRelationship(
            worlds_comps_content_text,
            PARENTOF,
            [worlds_comps_content_text_p]
        );

        this.createRelationship(
            worlds_comps_content,
            PARENTOF,
            [worlds_comps_content_img]
        );

        const trophiesCount = 6;
        const competitions = this.elements.external.info.comps; 
        for (let i = 0; i < trophiesCount; i++) {
            const worlds_comps_content_i = this.createElement('i', {
                class: `ion-trophy trophy--${i} tooltip`,
                innerHTML: `<span class="tooltiptext">${competitions[i]}</span>`
            });

            this.createRelationship(
                worlds_comps_content,
                PARENTOF,
                [worlds_comps_content_i]
            );
        };

        this.createRelationship(
            world_comps_main_div,
            PARENTOF,
            [worlds_comps_content, worlds_comps_content_text]
        );

        this.createRelationship(
            parent,
            PARENTOF,
            [world_comps_main_div]
        );
    }

    createPlayerDetailsContent(parent) {

        const players = this.elements.external.info.players;

        const players_details_main = this.createElement('div', {
            class: 'players__details__main'
        })

        for (const [index, playerInfo] of players.entries()) {

            const players_details_main_div = this.createElement('div', {
                class: `players__details__main__div player__details--${index}`,
                style: `${index !== 0 ? 'display: none' : 'display: flex'}`
            });
    
            const players_details_carousel_div = this.createElement('div', {
                class: `players__details__main__div__carousel_el player__details--${index}l`
            });
    
            const players_details_main_div_img = this.createElement('img', {
                class: `player__details__img player__details--${index}`,
                src: `${cr7Image}`,
                alt: 'Cristiano Ronaldo Image'
            });

            const players__div = this.createElement('div', {
                class: `players__div player__details--${index}`
            });

            for (let [key, value] of Object.entries(playerInfo)){

                if (!value || key === 'id') {
                    continue;
                }
    
                key = key.toString();
                key = key.charAt(0).toUpperCase().concat(key.slice(1, key.length));
    
                const player_ = this.createElement('p', {
                    class: `player__info__${key}`,
                    innerHTML: `<strong>${key}</strong>: ${value}`
                });
    
                const player__icon = this.createElement('i', {
                    class: 'ion-android-radio-button-on'
                });
    
                const player__internal_div = this.createElement('div', {
                    class: 'player__info__internal'
                });
                this.createRelationship(
                    player__internal_div,
                    PARENTOF,
                    [player__icon]
                );
    
                this.createRelationship(
                    player__icon,
                    SIBLINGOF,
                    [player_]
                );
    
                this.createRelationship(
                    players__div,
                    PARENTOF,
                    [player__internal_div]
                );
            };

            this.createRelationship(
                players_details_main_div,
                PARENTOF,
                [players_details_carousel_div, players__div]
            );
    
            this.createRelationship(
                players_details_carousel_div,
                PARENTOF,
                [players_details_main_div_img]
            );

            this.createRelationship(
                players_details_main,
                PARENTOF,
                [players_details_main_div]
            );

            this.createRelationship(
                parent,
                PARENTOF,
                [players_details_main]
            );

            this.createPlayersCarousel(players_details_main_div, index, players.length);
        };

        const players_details_main_text = this.createElement('p', {
            class: 'players__details__main__text',
            innerHTML: this.elements.external.info.about[1]
        });

        this.createRelationship(
            parent,
            PARENTOF,
            [players_details_main_text]
        );
    }

    createPlayersCarousel(element, index, length) {

        if (index === 0) {
            const arrowLeft = this.createElement('i', {
                class: `ion-chevron-left carousel__arrow`,
                style: 'visibility: hidden'
            });
    
            this.createRelationship(arrowLeft, CHILDOF, [element.parentNode]);
        }
        else if (index === (length - 1)) {
            const arrowRight = this.createElement('i', {
                class: `ion-chevron-right carousel__arrow`
            });          
    
            this.createRelationship(element.parentNode,PARENTOF, [arrowRight]);

            const arrowElements = Array.from($.querySelectorAll('.carousel__arrow'));

            for (const [index, arrowEl] of arrowElements.entries()) {
                arrowEl.addEventListener('click', e => {
                    const players_details_divs = Array.from($.querySelectorAll('.players__details__main__div'));

                    for (const [index, pdd] of players_details_divs.entries()) {
                        if (pdd.style.display === 'flex') {
                            let playerIndex = parseInt(pdd.classList[1].split('--')[1]);

                            if (arrowEl.classList[0] === 'ion-chevron-right' 
                                && playerIndex < players_details_divs.length) {
                                playerIndex += 1;                            
                                players_details_divs[playerIndex-1].style.display = 'none';      
                                players_details_divs[playerIndex].style.display = 'flex';   

                                arrowElements[0].style.visibility = 'visible';

                                if (playerIndex === players_details_divs.length - 1) {
                                    arrowElements[1].style.visibility = 'hidden';
                                }
                            } else if (playerIndex > 0) {
                                playerIndex -= 1;
                                players_details_divs[playerIndex+1].style.display = 'none';      
                                players_details_divs[playerIndex].style.display = 'flex';

                                arrowElements[1].style.visibility = 'visible';

                                if (playerIndex === 0) {
                                    arrowElements[0].style.visibility = 'hidden';
                                }
                            }
                            break;
                        }
                    };
                });   
            };
        }
    }

    createCustomerReviewsSection(parent) {
        const customers_main_div = this.createElement('div', {
            class: 'customers__main__div'
        });

        const custRevs = this.elements.external.info.customerReviews;

        for (const [index, cust] of custRevs.entries()) {
            const customer_review_container = this.createElement('div', {
                class: `customer__review__container customer--${index+1}`
            });

            const customer_review_text = this.createElement('blockquote', {
                innerHTML: cust.message
            });

            const customer_review_ref = this.createElement('div', {
                class: 'customer__review__ref'
            });

            const customer_review_image = this.createElement('img', {
                alt: `Customer ${index} Photo`,
                src: cust.imageUrl
            });

            const customer_review_name = this.createElement('cite', {
                innerHTML: cust.name
            })

            this.createRelationship(customer_review_ref, 
                PARENTOF, 
                [customer_review_image, customer_review_name]
            );

            this.createRelationship(customer_review_container, 
                PARENTOF,
                [customer_review_text, customer_review_ref]
            );

            this.createRelationship(customers_main_div, PARENTOF, [customer_review_container]);
        };

        this.createRelationship(
            parent,
            PARENTOF,
            [customers_main_div]
        );
    }

    createAboutContent() {

    }

    createFooter(parent) {
        const footer = this.createElement('footer');
        this.createRelationship(parent, PARENTOF, [footer]);
    }

    animate() {
        const elements = {
            logoElement: $.querySelector('.main__nav__logo'),
            mainPageText: $.querySelector('.main__page__text'),
            mainPageForm: $.querySelector('.main__page__form'),
            navItems: $.querySelector('.main__nav__items'),
            worksSection: $.querySelector('.works__section'),
            worksContent: $.querySelector('.works__content__div'),
            worksContentTrophies: $.querySelectorAll('.ion-trophy'),
            worldCompsSection: $.querySelector('.world__comps__section')
        }

        elements.logoElement.classList.add('animated', 'fadeIn');
        elements.mainPageText.classList.add('animated', 'fadeInUp');
        elements.mainPageForm.classList.add('animated', 'fadeIn');
        elements.navItems.classList.add('animated', 'fadeIn');

        new Waypoint({
            element: elements.worksSection,
            handler: (direction) => {
                elements.worksContent.classList.add('animated', 'bounceIn');
            },
            offset: '45%'
        });

        elements.worksContentTrophies.forEach(trophy => {
            new Waypoint({
                element: elements.worldCompsSection,
                handler: (direction) => {
                    trophy.classList.add('animated', 'bounceIn');
                },
                offset: '45%'
            });
        });
    }
}

