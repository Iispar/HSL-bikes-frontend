describe('Journeys', () => {
  it('front page opens', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.contains('Journeys');
    cy.contains('Pohjolankatu');
    cy.contains('Kaivopuisto');
  });

  it('search form works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.get('input[id=journeys__header__search__departure__input]').type('Hanasaari{enter}');
    cy.get('input[id=journeys__header__search__return__input]').type('Otaranta{enter}');
    cy.wait(1000);
    cy.contains('Otaranta');
    cy.get('*[name=station-text]')
      .filter((index, elt) => elt.textContent.match('Hanasaari'))
      .should('have.length.gte', 7);
  });

  it('popup and sort buttons works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.wait(1000);

    cy.get('button[id=journeys__header__all__button]').click();
    cy.wait(500);
    cy.get('.journeys__header__filters__buttons__dropdown__button').realHover();
    cy.wait(1000);

    cy.contains('Longest');
    cy.contains('Fastest');
    cy.get('button[id=DistanceDecreasing-button]').click();
    cy.wait(1000);
    cy.contains('3680.77');
  });

  it('reset button works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.get('input[id=journeys__header__search__departure__input]').type('Hakalehto{enter}');
    cy.contains('Hakalehto');
    cy.wait(1000);
    cy.get('button[id=journeys__header__all__button]').click();
    cy.wait(500);
    cy.get('button[id=reset-button]').click();
    cy.wait(500);
    cy.contains('Pohjolankatu');
  });

  it('pagination works', () => {
    cy.viewport(1920, 1080);
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.wait(500);
    cy.get('button[id=forwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Niittymaa');
    cy.get('button[id=forwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Niittymaa').should('not.exist');
    cy.get('button[id=backwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Niittymaa');
  });
});
