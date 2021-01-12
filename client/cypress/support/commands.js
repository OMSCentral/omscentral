// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { reviewMeta } from '../../src/constants/reviewMeta';

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

const WAIT_MS = 250;

Cypress.Commands.add('omsGoTo', (path) => {
  cy.visit(path);
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsGoToCreateReview', () => {
  cy.dataCy('actions').children('button').click();
  cy.dataCy('action_create-review').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsCreateReview', (review, options) => {
  if (options.authenticate == true) {
    cy.omsGoTo('/login').omsLogin(options.user.email, options.user.password);
  }

  cy.omsGoToCreateReview();
  cy.omsPopulateReviewAndSubmit(review);
});

Cypress.Commands.add('omsGoToUpdateReview', () => {
  cy.dataCy('review_card')
    .first()
    .within(() => cy.dataCy('review_card_edit_button').click());
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsPopulateReviewAndSubmit', (review) => {
  cy.dataCy('review_course_id').type(review.course_id);
  cy.dataCy('review_course_id').type('{enter}');
  cy.dataCy('review_semester_id').find('select').select(review.semester_id);
  cy.dataCy('review_difficulty')
    .find('select')
    .select(reviewMeta.translateDifficulty(review.difficulty));
  cy.dataCy('review_workload').type('{selectall}{backspace}');
  cy.dataCy('review_workload').type(review.workload.toString());
  cy.dataCy('review_rating')
    .find('select')
    .select(reviewMeta.translateRating(review.rating));
  cy.dataCy('review_body').type('{selectall}{backspace}');
  cy.dataCy('review_body').type(review.body);
  cy.dataCy('review_submit').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsCheckReviewCard', (review) => {
  cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
  cy.dataCy('review_card')
    .first()
    .within(() => {
      cy.dataCy('review_card_content').should('contain.text', review.body);
      cy.dataCy('review_card_difficulty').should(
        'contain.text',
        reviewMeta.translateDifficulty(review.difficulty),
      );
      cy.dataCy('review_card_semester').should(
        'contain.text',
        review.semester_id,
      );
      cy.dataCy('review_card_rating').should(
        'contain.text',
        reviewMeta.translateRating(review.rating),
      );
      cy.dataCy('review_card_workload').should(
        'contain.text',
        `${review.workload.toString()} hrs/wk`,
      );
    });
});

Cypress.Commands.add('omsGoToProfile', () => {
  cy.dataCy('user_menu_icon').click();
  cy.dataCy('user_menu_profile').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsLogin', (email, password) => {
  cy.dataCy('login_email').type(email);
  cy.dataCy('login_password').type(password);
  cy.dataCy('login_submit').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsRegister', (email, password) => {
  cy.dataCy('register_email').type(email);
  cy.dataCy('register_password').type(password);
  cy.dataCy('register_submit').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsLogout', () => {
  cy.dataCy('logout').click();
  return cy.wait(WAIT_MS);
});

const state = {
  localStorage: new Map(),
};

Cypress.Commands.add('omsCacheLS', () => {
  Object.keys(localStorage).forEach((key) => {
    state.localStorage.set(key, localStorage.getItem(key));
  });
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsPrimeLS', () => {
  for (const [key, value] of state.localStorage) {
    localStorage.setItem(key, value);
  }
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsClearLS', () => {
  cy.clearLocalStorage();
  localStorage.clear();
  state.localStorage.clear();
  return cy.wait(WAIT_MS);
});
