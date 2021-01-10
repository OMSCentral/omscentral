/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { test } from 'mocha';
import { ReviewInputType } from '../../../src/graphql';
import { reviewMeta } from '../../../src/constants/reviewMeta';

describe('given user submits a review', () => {
  before(() => {
    cy.omsClearLS();
  });

  const review_initial: ReviewInputType = {
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
    review_initial.body = `foo bar: ${+new Date()}`;

    cy.omsGoTo('/login');
    cy.omsLogin(user.email, user.password);
    cy.omsGoToCreateReview();
    cy.omsCreateReview(review_initial);
    cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when the course reviews page is displayed', () => {
    it(`then review card has edit button`, () => {
      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').should('exist'));
    });

    it(`then edit button opens review page`, () => {
      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').click());
      cy.url().should('match', /\/review\/-\w+$/);
    });
  });

  describe('when review page is opened', () => {
    beforeEach(() => {
      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').click());
    });

    it(`then review page opens in update mode`, () => {
      cy.dataCy('title').should('have.text', 'Update Review');
      cy.dataCy('review_submit').should('exist');
      cy.dataCy('review_submit').should('have.text', 'Update');
      cy.dataCy('review_delete').should('exist');
      cy.dataCy('review_delete').should('have.text', 'Delete');
    });
  });

  describe('when review is updated', () => {
    const review_updated: ReviewInputType = {
      id: null,
      author_id: null,
      course_id: 'CS-6440',
      semester_id: 'Spring 2020',
      difficulty: 4,
      workload: 20,
      rating: 5,
      body: '',
    };

    const difficulty_updated = reviewMeta.translateDifficulty(
      review_updated.difficulty,
    );
    const workload_updated = review_updated.workload.toString();
    const rating_updated = reviewMeta.translateRating(review_updated.rating);

    beforeEach(() => {
      review_updated.body = `foo bar: ${+new Date()}`;

      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').click());
      cy.dataCy('review_course_id').type(review_updated.course_id);
      cy.dataCy('review_course_id').type('{enter}');
      cy.dataCy('review_semester_id')
        .find('select')
        .select(review_updated.semester_id);
      cy.dataCy('review_difficulty').find('select').select(difficulty_updated);
      cy.dataCy('review_workload').type('{selectall}{backspace}');
      cy.dataCy('review_workload').type(workload_updated);
      cy.dataCy('review_rating').find('select').select(rating_updated);
      cy.dataCy('review_body').type('{selectall}{backspace}');
      cy.dataCy('review_body').type(review_updated.body);
      cy.dataCy('review_submit').click();
    });

    it(`then course reviews page is opened`, () => {
      cy.url().should(
        'match',
        new RegExp('/course/' + review_updated.course_id + '$'),
      );
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review updated.');
    });

    it('then displays updated review', () => {
      cy.omsCheckReview(review_updated);
    });
  });
});
