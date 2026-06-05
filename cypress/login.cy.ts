/// <reference types="cypress" />

import { Login } from '../../ai-video-editor/src/app/components/login/login';

describe('Login Component', () => {

  beforeEach(() => {
    cy.mount(Login);
  });

  it('should render login form by default', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[placeholder="Email"]').should('exist');
    cy.get('input[placeholder="Email"]').type('bbbb');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.contains('Login').should('be.visible');
  });

});