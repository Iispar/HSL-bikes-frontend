describe('Journeys', () => {
  it('front page opens', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Journeys');
    cy.contains('aajalahden aukio');
    cy.contains('Teljäntie');
  });

  it('search form works', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[id=journeys__header__search__departure__input]').type('Hanasaari{enter}');
    cy.get('input[id=journeys__header__search__return__input]').type('Otaranta{enter}');
    cy.wait(1000);
    cy.contains('Otaranta');
    cy.get('*[name=station-text]')
      .filter((index, elt) => elt.textContent.match('Hanasaari'))
      .should('have.length.gte', 9);
  });

  it('popup and sort buttons works', () => {
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
    cy.visit('http://localhost:3000');
    cy.get('input[id=journeys__header__search__departure__input]').type('Hakalehto{enter}');
    cy.contains('Hakalehto');
    cy.wait(1000);
    cy.get('button[id=journeys__header__all__button]').click();
    cy.wait(500);
    cy.get('button[id=reset-button]').click();
    cy.wait(500);
    cy.contains('Laajalahden aukio');
  });

  it('pagination works', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.wait(500);
    cy.get('button[id=forwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Kalevankatu');
    cy.get('button[id=forwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Kalevankatu').should('not.exist');
    cy.get('button[id=backwards-journey-button]').click();
    cy.wait(200);
    cy.contains('Kalevankatu');
  });
});
