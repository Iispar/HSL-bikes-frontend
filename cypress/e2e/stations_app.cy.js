describe('Stations', () => {
  it('stations render', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.contains('Kaivopuisto');
  });

  it('search works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.get('input[id="stations__search__input"]').type('Otaranta{enter}');
    cy.wait(500);
    cy.contains('Otaranta');
  });

  it('pagination works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.wait(500);
    cy.get('button[id=forwardsStation-button]').click();
    cy.wait(200);
    cy.contains('Unioninkatu');
    cy.get('button[id=forwardsStation-button]').click();
    cy.wait(200);
    cy.contains('Unioninkatu').should('not.exist');
    cy.get('button[id=backwardsStation-button]').click();
    cy.wait(200);
    cy.contains('Unioninkatu');
  });
});
