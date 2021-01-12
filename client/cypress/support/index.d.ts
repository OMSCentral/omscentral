/// <reference types="cypress" />

import { ReviewInputType } from '../../src/graphql';
import { CreateReviewOptions } from '../fixtures/review';

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
    omsCreateReview(
      review: ReviewInputType,
      options: CreateReviewOptions,
    ): Cypress.cy;
    omsGoToUpdateReview(review: ReviewInputType): Cypress.cy;
    omsPopulateReviewAndSubmit(review: ReviewInputType): Cypress.cy;
    omsCheckReviewCard(review: ReviewInputType): Cypress.cy;

    omsGoToProfile(): Cypress.cy;

    omsLogin(email: string, password: string): Cypress.cy;
    omsRegister(email: string, password: string): Cypress.cy;
    omsLogout(): Cypress.cy;

    omsCacheLS(): Cypress.cy;
    omsPrimeLS(): Cypress.cy;
    omsClearLS(): Cypress.cy;
  }
}
