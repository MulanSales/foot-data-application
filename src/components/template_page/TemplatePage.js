import { Component } from '../lib/Component';

import baseCss from './css/styles.css';
import queriesCss from './css/queries.css';
import { PARENTOF } from '../lib/RelationType';

/**
 * @param {Object} elements 
 * @returns {Promise<TemplateClass>}
 */
export const startComponent = elements => {
    const component = new TemplateClass(elements);
    return component.create();
};

const $ = document;

const TemplateClass = class extends Component {
    /**
     * TemplatePage constructor
     * @param {Elements} elements 
     */
    constructor(elements) {
        super(elements);
    }

    initialize() {
        // Render here all class functions
    }

};