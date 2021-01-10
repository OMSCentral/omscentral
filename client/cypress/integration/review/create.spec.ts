/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { ReviewInputType } from '../../../src/graphql';

describe('given user is at Create Review page', () => {
  before(() => {
    cy.omsClearLS();
  });

  beforeEach(() => {
    cy.omsGoTo('/login')
      .omsLogin(user.email, user.password)
      .omsGoToCreateReview();
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when page is rendered', () => {
    it('then has a title of Create Review', () => {
      cy.dataCy('title').should('have.text', 'Create Review');
    });

    it('then does not display the id field', () => {
      cy.dataCy('review_id').should('not.exist');
    });
  });

  describe('when valid information is submitted', () => {
    let review: ReviewInputType = {
      id: null,
      author_id: null,
      course_id: 'CS-6400',
      semester_id: 'Fall 2019',
      difficulty: 3,
      workload: 10,
      rating: 4,
      body: '',
    };

    beforeEach(() => {
      review.body = `foo bar: ${+new Date()}`;
      cy.omsCreateReview(review);
    });

    it(`then navigates to the Reviews page for the review's course`, () => {
      cy.url().should('match', new RegExp('/course/' + review.course_id + '$'));
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review published.');
    });

    it('then displays the created review', () => {
      cy.omsCheckReview(review);
    });
  });
});
