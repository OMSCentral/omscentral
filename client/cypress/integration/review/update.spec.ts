/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { CreateReviewOptions } from '../../fixtures/review';
import { ReviewInputType } from '../../../src/graphql';

describe('given user is at Update Review page', () => {
  before(() => {
    cy.omsClearLS();
  });

  let review_initial: ReviewInputType;
  let createReviewOptions: CreateReviewOptions;

  beforeEach(() => {
    review_initial = {
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

    cy.omsCreateReview(review_initial, createReviewOptions);
    cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
    cy.omsGoToUpdateReview();
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when user updates the review', () => {
    let review_updated: ReviewInputType;

    beforeEach(() => {
      review_updated = {
        id: null,
        author_id: null,
        course_id: 'CS-6440',
        semester_id: 'Spring 2020',
        difficulty: 4,
        workload: 20,
        rating: 5,
        body: `foo bar: ${+new Date()}`,
      };

      cy.omsPopulateReviewAndSubmit(review_updated);
    });

    it(`then navigates to Course page`, () => {
      cy.url().should(
        'match',
        // eslint-disable-next-line security/detect-non-literal-regexp
        new RegExp(`/course/${review_updated.course_id}$`),
      );
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review updated.');
    });

    it('then displays updated review', () => {
      cy.omsCheckReviewCard(review_updated);
    });
  });
});
