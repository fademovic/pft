/// <reference types="cypress" />

describe('PFT Excersise Feed', () => {
  it('loads successfully', () => {
    cy.visit('https://pft-finance-app.vercel.app/');

    // ASSERT
    // Navbar
    cy.get('h1').should('contain.text', 'CSV IMPORT');

    // Button as a span - cover for input
    cy.get('span').should('contain.text', 'Upload');

    // Input - should be hidden
    cy.get('input').should('not.be.visible');
  });
});
