/// <reference types="cypress" />

import { ReviewInputType } from '../../src/graphql';

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     *
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    omsGoTo(path: string): Cypress.cy;
    omsGoToCreateReview(): Cypress.cy;
    omsCreateReview(review: ReviewInputType): Cypress.cy;
    omsCheckReview(review: ReviewInputType): Cypress.cy;

    omsGoToProfile(): Cypress.cy;

    omsLogin(email: string, password: string): Cypress.cy;
    omsRegister(email: string, password: string): Cypress.cy;
    omsLogout(): Cypress.cy;

    omsCacheLS(): Cypress.cy;
    omsPrimeLS(): Cypress.cy;
    omsClearLS(): Cypress.cy;
  }
}
