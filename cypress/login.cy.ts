/// <reference types="cypress" />

import { CommonModule } from '@angular/common';
import { Login } from '../../ai-video-editor/src/app/components/login/login';
import { LoginService } from '../../ai-video-editor/src/app/services/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

describe('Login Component', () => {

  beforeEach(() => {
    cy.mount(Login, {
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [LoginService, provideHttpClient()]
    });
  });

  it('should render login form by default', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[placeholder="Email"]').should('exist');
    cy.get('input[placeholder="Email"]').type('bbbb');
    cy.get('input[placeholder="Password"]').should('exist');
  });

  it('should open registration page', () => {
    cy.contains('Create Account').should('be.visible').click();
    cy.get('input[formControlName="name"]').should('exist');
    cy.get('input[formControlName="email"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist');
    cy.get('input[formControlName="confirmPassword"]').should('exist');

    cy.get('input[formControlName="name"]').click().blur();
    cy.contains('Name is required.')
      .should('be.visible');
    cy.get('input[formControlName="name"]').clear().type('abcd').blur();
    cy.contains('Name is required.')
      .should('not.exist');

    cy.get('input[formControlName="email"]').type('abcd@').blur();
    cy.contains('Please enter a valid email.')
      .should('be.visible');
    cy.get('input[formControlName="email"]').clear().type('abcd@gmail.com').blur();
    cy.contains('Please enter a valid email.')
      .should('not.exist');


    cy.get('input[formControlName="password"]').click().blur();
    cy.contains('Password is required.')
      .should('be.visible');
    cy.get('input[formControlName="password"]').clear().type('abcd').blur();
    cy.contains('Password is required.')
      .should('not.exist');


    cy.get('input[formControlName="confirmPassword"]').type('abc').blur();
    cy.contains('Passwords do not match')
      .should('be.visible');
    cy.get('input[formControlName="confirmPassword"]').clear().type('abcd').blur();
    cy.contains('Passwords do not match')
      .should('not.exist');

    cy.contains('Register').should('be.visible').click();



    cy.get('input[name="email"]').should('be.visible').type('aaa');
    cy.get('input[name="password"]').should('be.visible').type('1');
    cy.contains('button', 'Login')
      .should('be.visible')
      .click();
    cy.contains('Invalid email or password').should('be.visible');
     cy.get('input[name="email"]').should('be.visible').clear().type('abcd@gmail.com');
    cy.get('input[name="password"]').should('be.visible').clear().type('abcd');
    cy.contains('button', 'Login')
      .should('be.visible')
      .click();

    cy.contains('Login Successful').should('be.visible');  

     // cy.visit('http://localhost:4200/dashbord');  this not work here this is component test not e2e test so we can not navigate to other page here but we can check the login successful message and if it is visible then we can assume that the user is navigated to dashboard page.
  });



});
