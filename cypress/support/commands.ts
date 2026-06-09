/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// cy.visit();
// cy.get();
// cy.click(); this all is built-in commands we can use directly 

// now we are creating our custome command for login
// Cypress.Commands.add('login', (email, password) => {}) this is the syntax for creating custom command
// to use this cy.login(email, password)
// 1st we need to write this in chanable interface in the declare global block to get intellisense and avoid typescript error


Cypress.Commands.add('Register', () =>{
    cy.get('input[formControlName="name"]').should('exist').click().blur();
    cy.contains('Name is required').should('exist');
    cy.get('input[formControlName="name"]').click().clear().type('a');
    cy.contains('Name is required').should('not.exist');


     cy.get('input[formControlName="email"]').should('exist').type('abcd@').blur();
    cy.contains('Please enter a valid email.')
      .should('exist');
    cy.get('input[formControlName="email"]').clear().type('abcd@gmail.com').blur();
    cy.contains('Please enter a valid email.')
      .should('not.exist');

         cy.get('input[formControlName="password"]').click().blur();
    cy.contains('Password is required.')
      .should('exist');
    cy.get('input[formControlName="password"]').clear().type('abcd').blur();
    cy.contains('Password is required.')
      .should('not.exist');


    cy.get('input[formControlName="confirmPassword"]').type('abcd@gmail.com').blur();
    cy.contains('Passwords do not match')
      .should('exist');
    cy.get('input[formControlName="confirmPassword"]').clear().type('abcd').blur();
    cy.contains('Passwords do not match')
      .should('not.exist');

    cy.contains('Register').should('exist').click();


})

Cypress.Commands.add('login', () => {
    cy.get('input[name="email"]').should('exist').clear().type('abcd@gmail.com');
    cy.get('input[name="password"]').should('exist').clear().type('abcd');
    cy.contains('button', 'Login').should('exist').click();
    
});


declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      Register():Chainable<void>;
    }
  }
}

export {};