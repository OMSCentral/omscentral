/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { CreateReviewOptions } from '../../fixtures/review';
import { ReviewInputType } from '../../../src/graphql';

describe('given user submits a review', () => {
  before(() => {
    cy.omsClearLS();
  });

  let review: ReviewInputType;
  let createReviewOptions: CreateReviewOptions;

  beforeEach(() => {
    review = {
      id: null,
      author_id: null,
      course_id: 'CS-6400',
      semester_id: 'Fall 2019',
      difficulty: 3,
      workload: 10,
      rating: 4,
      body: `foo bar: ${+new Date()}`,
    };

    createReviewOptions = {
      authenticate: true,
      user: user,
    };

    cy.omsCreateReview(review, createReviewOptions);
    cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when submitted review is displayed', () => {
    it(`then has edit button`, () => {
      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').should('exist'));
    });
  });

  describe('when edit button is clicked', () => {
    beforeEach(() => {
      cy.omsGoToUpdateReview();
    });

    it(`then navigates to Review page`, () => {
      cy.url().should('match', /\/review\/-\w+$/);
    });

    it(`then Review page is displayed in update mode`, () => {
      cy.dataCy('title').should('have.text', 'Update Review');
      cy.dataCy('review_submit').should('exist');
      cy.dataCy('review_submit').should('have.text', 'Update');
      cy.dataCy('review_delete').should('exist');
      cy.dataCy('review_delete').should('have.text', 'Delete');
    });
  });
});
