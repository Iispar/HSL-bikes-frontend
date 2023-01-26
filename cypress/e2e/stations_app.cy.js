describe('Stations', () => {
  it('stations render', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Kaivopuisto');
  });

  it('search works', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[id="StationInput"]').type('Otaranta{enter}');
    cy.wait(500);
    cy.contains('Otaranta');
  });

  it('pagination works', () => {
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

  it('single station view works', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Kaivopuisto').click();
    cy.wait(200);
    cy.get('.singleStation-container').should('have.css', 'display')
      .and('match', /flex/);
    cy.contains('capasity');
    cy.contains('top');
    cy.contains('avg');
  });

  it('close works', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Kaivopuisto').click();
    cy.wait(200);
    cy.contains('close').click();
    cy.contains('Viiskulma');
  });
});
