import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

/**
 * @param {Object} elements 
 * @returns {Promise<ErrorModalClass>}
 */
export const startComponent = elements => {
    const component = new ErrorModalClass(elements);
    return component.create();
};

const $ = document;

/**
 * @param {Element} body 
 */
export const modalCallTrigger = async (body) => {

    Array.from(body.children).forEach(bc => {
        if(!bc.classList.contains('error__modal__container')){
            bc.style.opacity = 0.3;
        }
    });

    $.querySelector('.error__modal__header i').addEventListener('click', () => {
        return closeModalTrigger(body);
    });
};

/**
 * @param {Element} body 
 */
const closeModalTrigger = async(body) => {

    Array.from(body.children).forEach(bc => {
        bc.style.opacity = 1;
        
        if (bc.classList.contains('error__modal__container')) {
            bc.remove();
        }
    })
};

const ErrorModalClass = class extends Component {
    /**
     * ErrorModalPage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements);
    }

    initialize() {
        // Render here all class functions
        this.createModal(this.elements.body, this.elements.external.error);
    }

    /**
     * 
     * @param {Element} parent 
     * @param {string} message 
     */
    createModal(parent, message) {

        const error_modal_container = `
            <div class='error__modal__container animated bounceIn'>
                <div class='error__modal__header'>
                    <i class='ion-ios-close-empty'></i>
                    <i class='ion-ios-close-outline'></i>
                </div>
                <div class='error__modal__body'>
                    <p>Ooops!</p>
                    <p>${message}</p>
                    <button class='common-btn'>Try Again</button>
                </div>
            </div>
        `;

        parent.insertAdjacentHTML('beforeend', error_modal_container);
    }

};