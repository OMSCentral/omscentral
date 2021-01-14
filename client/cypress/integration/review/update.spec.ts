/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { ReviewInputType } from '../../../src/graphql';

describe('given user is at Update Review page', () => {
  before(() => {
    cy.omsClearLS();
  });

  let reviewInitial: ReviewInputType;

  beforeEach(() => {
    reviewInitial = {
      id: null,
      author_id: null,
      course_id: 'CS-6400',
      semester_id: 'Fall 2019',
      difficulty: 3,
      workload: 10,
      rating: 4,
      body: `foo bar: ${+new Date()}`,
    };

    cy.omsCreateReview(reviewInitial, { authenticate: true, user: user });
    cy.omsGoToUpdateReview();
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when user updates the review', () => {
    let reviewUpdated: ReviewInputType;

    beforeEach(() => {
      reviewUpdated = {
        id: null,
        author_id: null,
        course_id: 'CS-6440',
        semester_id: 'Spring 2020',
        difficulty: 4,
        workload: 20,
        rating: 5,
        body: `foo bar: ${+new Date()}`,
      };

      cy.omsPopulateReview(reviewUpdated);
      cy.omsSubmitReview();
    });

    it(`then navigates to Course page`, () => {
      cy.url().should(
        'match',
        new RegExp(`/course/${reviewUpdated.course_id}$`),
      );
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review updated.');
    });

    it('then displays updated review', () => {
      cy.omsCheckReviewCard(reviewUpdated);
    });
  });
});
