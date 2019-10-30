import { Component } from '../lib/Component';
import { PARENTOF } from '../lib/RelationType';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';

import logoImage from '../../resources/img/logo.png';

/**
 * @param {Object} elements 
 * @returns {Promise<DashBoardClass>}
 */
export const startComponent = elements => {
    const component = new DashBoardClass(elements);
    return component.create();
};

const $ = document;

export const homeLogoTrigger = async (state, cb) => {
    const dashLogoImage = $.querySelector('.dash__logo__img');

    dashLogoImage.addEventListener('click', e => {
        e.preventDefault();
        state.loadedComponent = 'MainPage';
        cb();
    })
}

export const createCarousel = async (parent, query) => {

    let query_container_item = '';

    if (query.searchQuery.inputCategory === 'CMP') {
        query.res.competitions.forEach(c => {
            query_container_item = query_container_item.concat(`
                <div class='query__container__item'>
                    <span style='background: linear-gradient(to left, ${getRandomColor()}, ${getRandomColor()})'>${parseIconText(c.name)}</span>
                    <div class='query__container__item__content'>
                        <p>${c.name}</p>
                        <p>Season ${c.numberOfSeasons}</p>
                    </div>
                </div>
            `);
        });
    };

    let carouselTitle;

    if (query.searchQuery.inputCategory === 'CMP') { carouselTitle = 'Competitions'}
    else if (query.searchQuery.inputCategory === 'PLR') { carouselTitle = 'Player'}
    else { carouselTitle = 'Team'}

    const dash_carousel_container = `
        <div class='dash__carousel__container'>
            <h1>${carouselTitle}</h1>
            <div class='query__container'>${query_container_item}
                <i class='ion-android-arrow-dropright-circle'></i>
            </div>
        </div>
    `;

    parent.insertAdjacentHTML('beforeend', dash_carousel_container);

}

const parseIconText = (name) => {
    const namesArray = name.split(' ');

    let resName = '';
    const limit = namesArray.length > 3 ? 3 : namesArray.length;
    if (namesArray.length > 0) {
        for (let i = 0; i < limit; i++){
            resName = resName.concat(namesArray[i].charAt(0));
        };
    } else {
        return name.charAt(0);
    }
   
    return resName;
}

const getRandomColor = () => {

    const hexaCharacters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i ++) {
        color = color.concat(hexaCharacters.charAt(Math.floor(Math.random() * 16)));   
    }

    return color;
}

const DashBoardClass = class extends Component {
    /**
     * DashBoardPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements, [baseCss, queriesCss]);
    }

    initialize() {
        // Render here all class functions
        const body = this.elements.body;

        body.classList.add('dashboard-page');
        this.createNavBar(body);
        this.createSearchContainer(body);
    }

    createNavBar(parent) {

        const dash_nav = this.CE('nav', {
            class: 'dash__nav'
        })

        // Logo Div
        const dash_nav_logo_div = this.CE('div', {
            class: 'dash__nav__logo'
        });

        const dash_nav_logo_img = this.CE('img', {
            class: 'dash__logo__img',
            src: logoImage.toString()
        });

        this.CR(dash_nav_logo_div, PARENTOF, [dash_nav_logo_img]);
        this.CR(dash_nav, PARENTOF, [dash_nav_logo_div]);
        // Items div
        const nav_icons = ['ion-ios-home', 'ion-ios-gear', 'ion-ios-star', 'ion-ios-bell'];

        const dash_nav_items_ul = this.CE('ul', {
            class: 'dash__nav__items'
        });

        const dash_nav_items_li = nav_icons.map(ni => {
            const li = this.CE('li');
            const a = this.CE('a');
            const i = this.CE('i', {class: ni});

            this.CR(a, PARENTOF, [i]);
            this.CR(li, PARENTOF, [a]);
            return li;
        });

        this.CR(dash_nav_items_ul, PARENTOF, dash_nav_items_li);
        this.CR(dash_nav, PARENTOF, [dash_nav_items_ul]);

        // User Menu div
        const dash_nav_user_div = this.CE('div', {
            class: 'dash__nav__user'
        });
        
        const dash_nav_user_i = this.CE('i', {
            class: 'ion-person'
        });

        const dash_nav_user_info_div = this.CE('div', {
            class: 'dash__nav__user--info__div'
        });

        const dash_nav_user_info_name = this.CE('p', {
            innerHTML: 'Alex Wolson'
        });

        const dash_nav_user_info_category = this.CE('p', {
            innerHTML: 'Normal'
        });

        this.CR(dash_nav_user_info_div, PARENTOF, [
            dash_nav_user_info_name, dash_nav_user_info_category
        ]);

        const dash_nav_user_i_config = this.CE('i', {
            class: 'ion-arrow-down-b'
        });

        this.CR(dash_nav_user_div, PARENTOF, [
            dash_nav_user_i, dash_nav_user_info_div, dash_nav_user_i_config
        ]);
        this.CR(dash_nav, PARENTOF, [dash_nav_user_div]);
        this.CR(parent, PARENTOF, [dash_nav]);
    }

    createSearchContainer(parent) {

        const search_container_div = this.CE('div', {
            class: 'search__container'
        });

        const search_container_main = this.CE('div', {
            class: 'search__container__main'
        });

        const search_input = this.CE('input', {
            class: 'search__input'
        });

        const search_btn = this.CE('button', {
            class: 'search__btn dash__btn'
        });

        const search_btn_i = this.CE('i', {class: 'ion-android-search'});

        this.CR(search_btn, PARENTOF, [search_btn_i]);

        this.CR(search_container_main, PARENTOF, [
            search_input, search_btn
        ]);

        const search_menu_div = this.CE('div', {
            class: 'search__menu dropdown'
        });

        const search_menu_ul = this.CE('ul', {class: 'seach__menu__ul dropdown-content'});

        const search_menu_li = ['Competitions', 'Teams', 'Players'].map(smi => {
            const li = this.CE('li');
            const p = this.CE('p', {innerHTML: smi});

            this.CR(li, PARENTOF, [p]);
            return li
        });

        const search_menu_select_div = this.CE('div', {class: 'search__select__div'});

        const search_menu_select_i = this.CE('i', {class: 'ion-android-arrow-dropdown search__select__icon dropbtn'});

        const search_menu_select_p = this.CE('p', {innerHTML: 'Seacrh By'});

        this.CR(search_menu_select_div, PARENTOF, [search_menu_select_p, search_menu_select_i]);

        this.CR(search_menu_ul, PARENTOF, search_menu_li);

        this.CR(search_menu_div, PARENTOF, [search_menu_ul]);

        this.CR(search_container_div, PARENTOF, [
            search_container_main, search_menu_select_div, search_menu_div
        ]);

        this.CR(parent, PARENTOF, [search_container_div]);
    }
};