describe('smallview', () => {
  it('only stations render', () => {
    cy.visit('http://localhost:3000');
    cy.get('*[id=right-container]').should('have.css', 'display', 'none');
    cy.get('*[id=left-container]').should('have.css', 'display', 'flex');
  });
  it('switch works', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[id=switch-journeys-btn]').click();
    cy.get('*[id=right-container]').should('have.css', 'display', 'flex');
    cy.get('*[id=left-container]').should('have.css', 'display', 'none');
  });
});
