import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

import '../../vendors/js/noframework.waypoints';

/**
 * @param {Object} elements 
 * @returns {Promise<SigninPageClass>}
 */
export const startComponent = elements => {
    const component = new SigninPageClass(elements);
    return component.create();
};

const $ = document;

const SigninPageClass = class extends Component {
    /**
     * SigninPage constructor
     */
    constructor(elements) {
        super(elements);
    }

    initialize() {
        // Render here all class functions
        const body = this.elements.body;

        const header = this.createHeader(body);
        this.createSigninContainer(header);
        this.animate();

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

        });

        this.createRelationship(header, PARENTOF, [main_nav]);
        this.createRelationship(parent, PARENTOF, [header]);

        return header;
    }

    /**
     * Create Signin Container 
     * @param {Element} parent 
     */
    createSigninContainer(parent) {

        const signup_container = this.createElement('div', {
            class: 'signup__container'
        });

        // Signin container header elements
        const signup_container_header = this.createElement('div', {
            class: 'signup__container__header'
        });

        const signup_container_header_title = this.createElement('p', {
            innerHTML: 'login'
        });

        const signup_container_header_close_i = this.createElement('i', {
            class: 'ion-ios-close-empty'
        });

        this.createRelationship(signup_container_header, PARENTOF, [
            signup_container_header_title, signup_container_header_close_i
        ]);
    
        // Signin container body elements
        const signup_container_body = this.createElement('div', {
            class: 'signup__container__body'
        });
    
        const signup_container_body_text = this.createElement('p', {
            innerHTML: `
               Welcome to FootData. Please enter your <span style='color: #8e44ad;'>Login</span> details to login here. Or register
               an account <a href='/sign-in' style='color: #8e44ad;'><span>here</span></a>
            `
        });

        const signup_container_body_form_div = this.createElement('div', {
            class: 'signup__container__body__form'
        });

        const formItems = ['User Name', 'Password'];
        const formIcons = ['ion-ios-person', 'ion-ios-unlocked'];

        for (const [index, value] of formItems.entries()) {

            const signup_container_form_item = this.createElement('div', {
                class: `signup_container_form_item item--${index}`
            })

            const signup_container_form_item_i = this.createElement('i', {
                style: 'font-size: 160%',
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

        const signup_container_form_terms = this.createElement('div', {
            class: 'signup__container__body__form__terms'
        });

        const signup_container_form_terms_check = this.createElement('input', {
            type: 'checkbox'
        });


        const signup_container_form_terms_text = this.createElement('p', {
            innerHTML: 'Remember me'
        });

        this.createRelationship(signup_container_form_terms, PARENTOF, [
            signup_container_form_terms_check, signup_container_form_terms_text
        ]);

        const signup_container_submit_btn = this.createElement('buttom', {
            class: 'signup__container__submit__btn',
            innerHTML: 'Sign in'
        })

        this.createRelationship(signup_container_body_form_div, PARENTOF, [
            signup_container_form_terms, signup_container_submit_btn
        ]);

        this.createRelationship(signup_container_body, PARENTOF, [
            signup_container_body_text, signup_container_body_form_div
        ]);

        // Signin container footer
        const signup_container_body_footer = this.createElement('div', {
            class: 'signup__container__body__footer'
        });

        const signup_container_body_footer_p = this.createElement('p', {
            innerHTML: 'Login with your Facebook or Gmail' 
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

        const signin_container_footer_forgot_pass = this.createElement('a', {
            class: 'signin__container__footer__forgot__pass',
            innerHTML: 'Forgot Password'
        });

        this.createRelationship(signup_container_body_footer, PARENTOF, [
            signup_container_body_footer_p, signup_container_footer_items, signin_container_footer_forgot_pass
        ]);

        this.createRelationship(signup_container, PARENTOF, [
            signup_container_header, signup_container_body, signup_container_body_footer
        ]);

        this.createRelationship(parent, PARENTOF, [signup_container]);

    }

    animate() {
        const elements = {
            signupContainer: $.querySelector('.signup__container')
        };

        elements.signupContainer.classList.add('animated', 'bounce');
    }

};