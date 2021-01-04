/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { testReview1, testReview2 } from '../../fixtures/review';

describe('given user submits a review', () => {
  before(() => {
    cy.omsClearLS();
  });

  beforeEach(() => {
    const body_initial = `foo bar: ${+new Date()}`;

    cy.omsGoTo('/login');
    cy.omsLogin(user.email, user.password);
    cy.omsCreateReview(
      testReview1.course_id,
      testReview1.semester_id,
      testReview1.difficulty,
      testReview1.workload,
      testReview1.rating,
      body_initial,
    );
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
    const body_updated = `foo bar: ${+new Date()}`;

    beforeEach(() => {
      cy.dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card_edit_button').click());
      cy.dataCy('review_course_id').type(testReview2.course_id + '\n');
      cy.dataCy('review_semester_id')
        .find('select')
        .select(testReview2.semester_id);
      cy.dataCy('review_difficulty')
        .find('select')
        .select(testReview2.difficulty);
      cy.dataCy('review_workload').type('{selectall}{backspace}');
      cy.dataCy('review_workload').type(testReview2.workload);
      cy.dataCy('review_rating').find('select').select(testReview2.rating);
      cy.dataCy('review_body').type('{selectall}{backspace}');
      cy.dataCy('review_body').type(body_updated);
      cy.dataCy('review_submit').click();
    });

    it(`then course reviews page is opened`, () => {
      cy.url().should(
        'match',
        new RegExp('/course/' + testReview2.course_id + '$'),
      );
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review updated.');
    });

    it('then display updated review', () => {
      cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
      cy.dataCy('review_card')
        .first()
        .within(() => {
          cy.dataCy('review_card_content').should('contain.text', body_updated);
          cy.dataCy('review_card_difficulty').should(
            'contain.text',
            testReview2.difficulty,
          );
          cy.dataCy('review_card_semester').should(
            'contain.text',
            testReview2.semester_id,
          );
          cy.dataCy('review_card_rating').should(
            'contain.text',
            testReview2.rating,
          );
          cy.dataCy('review_card_workload').should(
            'contain.text',
            testReview2.workload + ' hrs/wk',
          );
        });
    });
  });
});
