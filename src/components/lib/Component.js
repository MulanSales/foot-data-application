import { PARENTOF, SIBLINGOF, CHILDOF } from './RelationType';
import baseCss from '../../resources/css/style.css';
import ionicCss from '../../vendors/css/ionicons.css'
import animateCss from '../../vendors/css/animate.css';

const $ = document;

const DOMElements = {

};

export const Component = class {

    /**
     * Constructor 
     * @param {Object} elements 
     * @param {Array} path 
     * @param {Function} initialize
     */
    constructor(elements, paths) {
        this.elements = elements;
        this.paths = paths;
    }

    /**
     * @returns
    */
    initialize() {}

    /**
     * @param {String} elementName
     * @param {Object} elementsAttributes
     * @returns {Element} 
     */
    createElement(elementName, elementsAttributes) {
        const element = $.createElement(elementName);

        if (elementsAttributes) {
            for (let [key, value ] of Object.entries(elementsAttributes)) {

                const attr = key.toString();

                if (attr === 'innerHTML') {
                    element.innerHTML = value;
                }
                else {
                    element.setAttribute(key.toString(), value);
                }
            };
        };

        return element;
    }

    /**
     * @param {Element} element
     * @param {RelationType} relation
     * @param {[Element]} relatedElements
     * @returns {void} 
     */
    createRelationship(element, relation, relatedElements) {

        try {
            if (relation === PARENTOF) {
                relatedElements.forEach(relElement => {
                    element.insertAdjacentElement('beforeend', relElement);
                });
            }
            else if (relation === SIBLINGOF) {
                relatedElements.forEach(relElement => {
                    element.parentNode.appendChild(relElement);
                });
            }
            else if (relation === CHILDOF) {
                relatedElements.forEach(relElement => {
                    relElement.insertAdjacentElement('afterbegin', element);
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * @param {string} key 
     * @param {Element} value 
    */
    static addToDOMObject(key, value) {
        DOMElements[key] = value;
    };

    /**
     * @param {string} key 
    */
    static getDOMObject(key) {
        return DOMElements[key];
    }

    /**
     * @returns {Promise<Component>}
     */
    create() {
        return new Promise((resolve, reject) => {
            resolve(this.initialize());
        });
    }

    static clear(elements) {
        // Clear component-scope stylesheets
        const head = elements.head;
        const body = elements.body;

        if (body) {
            body.innerHTML = '';
        }

        if (head) {
            Array.from(head).forEach(hc => {
                console.log(hc);
                if (hc.classList.contains('component-score')) {
                    head.removeChild(hc);
                }
            });
        }
    }
}