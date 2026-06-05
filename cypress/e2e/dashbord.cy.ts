describe('Gemini AI Image Analyzer Flow', () => {

  it('should open Gemini AI and upload image', () => {

    cy.visit('http://localhost:4200/dashbord');

    // Find Gemini AI card and click its Open button
    cy.contains('.feature-card', 'Gemini AI')
      .within(() => {
        cy.contains('Open').click();
    });

    cy.url().should('include', '/giminiAiphoto');

    // Click on the "Upload Image" button
    cy.contains('AI Image Analyzer').click();

     // Upload image directly
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/sharukhMid.avif', {
        force: true
      });

    // Verify file attached
    cy.get('input[type="file"]')
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;
        expect(input.files?.[0].name).to.equal('sharukhMid.avif');
      });

    

   
  });

});