describe('Single-station-view', () => {
  it('station renders', () => {
    cy.visit('https://bikes-frontend.vercel.app/10');
    cy.wait(500);
    cy.contains('Kasarmitori');
    cy.contains('Fabianinkatu 13');
    cy.contains('stats');
    cy.contains('5058 trips');
    cy.contains('top return:');
    cy.contains('top departure:');
    cy.contains('Kaivopuisto');
  });
  it('map renders', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=map-return-btn]').contains('return');
    cy.get('button[id=map-departure-btn]').contains('departure');
    cy.get('button[id=map-clear-btn]').should('have.length', 1);
    cy.get('div[id="stationMarker"]').should('have.length', 1);
  });
  it('map return/departure stations renders', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=map-return-btn]').click();
    cy.get('div[id=topMarker').should('have.length', 5);
    cy.get('button[id=map-departure-btn]').click();
    cy.get('div[id=topMarker').should('have.length', 5);
  });
  it('map clear works', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=map-return-btn]').click();
    cy.get('div[id=topMarker]').should('have.length', 5);
    cy.get('button[id=map-clear-btn]').click();
    cy.get('div[id=topMarker]').should('have.length', 0);
  });
  it('map departure journeys works', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=station-information__selection__container__departure-btn]').click();
    cy.contains('TO Viiskulma');
  });
  it('map return journeys works', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=station-information__selection__container__return-btn]').click();
    cy.contains('FROM Hietalahdentori');
  });
  it('map one journey display works', () => {
    cy.visit('http://localhost:3000/10');
    cy.wait(1000);
    cy.get('button[id=station-information__selection__container__return-btn]').click();
    cy.contains('FROM Hietalahdentori').click();
    cy.get('div[id=singleJourneyMarker]').should('have.length', 1);
  });
});
