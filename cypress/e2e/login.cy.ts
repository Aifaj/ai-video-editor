describe('login registration testing', () =>{

it('should open login page', ()=>{

cy.visit('http://localhost:4200/login');
cy.get('input[name="email"]').should('exist').type('aaa');
cy.get('input[name="password"]').should('exist').type('1');
cy.contains('button', 'Login').should('be.visible').click();
cy.contains('Invalid email or password').should('be.visible');
cy.contains('Create Account').should('exist').click();
cy.Register();
cy.login();
cy.url().should('include', '/dashbord');
cy.url().should('eq', 'http://localhost:4200/dashbord');

})



});