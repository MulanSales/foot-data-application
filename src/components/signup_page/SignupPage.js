import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

/**
 * @param {Object} elements 
 * @returns {Promise<SignupPageClass>}
 */
export const startComponent = elements => {
    const component = new SignupPageClass(elements);
    return component.create();
};

const $ = document;

const SignupPageClass = class extends Component {
    /**
     * SignupPage constructor
     */
    constructor(elements) {
        super(elements);
    }

    initialize() {
        // Render here all class functions
        const body = this.elements.body;

        const header = this.createHeader(body);
        this.createSignupContainer(header);

    }

    /**
     * Create Header for sections 
     * @param {Element} parent 
     */
    createHeader(parent) {
        const header = this.createElement('header');

        const main_nav = Component.getDOMObject('main_nav');

        Array.from(main_nav.children).forEach(cn => {
            cn.classList.remove('animated', 'fadeIn');
            
            if (cn.classList.contains('main__nav__items')) {
                Array.from(cn.children).forEach(cnc => {
                    if (cnc.children[0].classList.contains('nav_item_how-it-works') 
                        || cnc.children[0].classList.contains('nav_item_world-competitions')) {
                            cn.removeChild(cnc);
                    }
                });
            }

            cn.classList.replace('main__nav__items', 'signup__nav__items');
        });

        this.createRelationship(header, PARENTOF, [main_nav]);
        this.createRelationship(parent, PARENTOF, [header]);

        return header;
    }

    /**
     * Create Signup Container 
     * @param {Element} parent 
     */
    createSignupContainer(parent) {

        const signup_container = this.createElement('div', {
            class: 'signup__container'
        });

        // Signup container header elements
        const signup_container_header = this.createElement('div', {
            class: 'signup__container__header'
        });

        const signup_container_header_title = this.createElement('p', {
            innerHTML: 'sign up'
        });

        const signup_container_header_close_i = this.createElement('i', {
            class: 'ion-ios-close-empty'
        });

        this.createRelationship(signup_container_header, PARENTOF, [
            signup_container_header_title, signup_container_header_close_i
        ]);
    
        // Signup container body elements
        const signup_container_body = this.createElement('div', {
            class: 'signup__container__body'
        });
    
        const signup_container_body_text = this.createElement('p', {
            innerHTML: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed dapibus tortor et mi vulputate, non 
            `
        });

        const signup_container_body_form_div = this.createElement('div', {
            class: 'signup__container__body__form'
        });

        const formItems = ['User Name', 'Email', 'Password', 'Password Confirmation'];
        const formIcons = ['ion-ios-person', 'ion-email', 'ion-ios-unlocked', 'ion-ios-locked'];

        for (const [index, value] of formItems.entries()) {

            const signup_container_form_item = this.createElement('div', {
                class: `signup_container_form_item item--${index}`
            })

            const signup_container_form_item_i = this.createElement('i', {
                class: formIcons[index]
            });

            const signup_container_form_item_input = this.createElement('input', {
                placeholder: value
            });

            this.createRelationship(signup_container_form_item, PARENTOF, [
                signup_container_form_item_i, signup_container_form_item_input
            ]);

            this.createRelationship(signup_container_body_form_div, PARENTOF, [
                signup_container_form_item
            ]);
        }

        const signup_container_form_item_check = this.createElement('input', {
            type: 'checkbox'
        });

        this.createRelationship(signup_container_body_form_div, PARENTOF, [
            signup_container_form_item_check
        ]);

        this.createRelationship(signup_container_body, PARENTOF, [
            signup_container_body_text, signup_container_body_form_div
        ]);

        // Signup container footer
        const signup_container_body_footer = this.createElement('div', {
            class: 'signup__container__body__footer'
        });

        const signup_container_body_footer_p = this.createElement('p', {
            innerHTML: 'Signup with your Facebook or Gmail' 
        });

        const signup_container_footer_items = this.createElement('div', {
            class: 'signup__container__footer__items'
        });

        const footer_btn_items = ['ion-social-google', 'ion-social-facebook'];
        footer_btn_items.forEach(fbi => {

            const footer_item = this.createElement('div', {
                class: 'footer__item'
            });

            const footer_btn_i = this.createElement('i', {
                class: fbi
            });

            const footer_btn = this.createElement('button', {
                class: `footer__btn__${fbi.split('-')[2]}`,
                innerHTML: `${fbi.split('-')[2]}`
            });

            this.createRelationship(footer_item, PARENTOF, [
                footer_btn_i, footer_btn
            ]);

            this.createRelationship(signup_container_footer_items, PARENTOF,[
                footer_item
            ]);

        });

        this.createRelationship(signup_container_body_footer, PARENTOF, [
            signup_container_body_footer_p, signup_container_footer_items
        ]);

        this.createRelationship(signup_container, PARENTOF, [
            signup_container_header, signup_container_body, signup_container_body_footer
        ]);

        this.createRelationship(parent, PARENTOF, [signup_container]);

    }

};