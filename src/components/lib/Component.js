import { PARENTOF, SIBLINGOF, CHILDOF } from './RelationType';

const $ = document;

export const Component = class {

    /**
     * Constructor 
     * @param {Object} elements 
     * @param {Array} path 
     */
    constructor(elements, paths) {
        this.elements = elements;
        this.paths = paths;
    }

    /**
     * @param {Element} parent 
     * @param {String} path
     * @returns
     */
    init() {
        const parent = this.elements.head;

        this.paths.forEach(path => {
            const stylesheetLink = document.createElement('link'); 
            stylesheetLink.setAttribute('href', `${path}`);
            stylesheetLink.setAttribute('rel', 'stylesheet');
            stylesheetLink.setAttribute('type', 'css');
            
            parent.insertAdjacentElement('beforeend', stylesheetLink);
        })
        
        return;
    }

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

    clear() {
        // TO-DO
    }
}