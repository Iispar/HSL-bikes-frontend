describe('Journeys', () => {
  it('front page opens', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Bikes')
    cy.contains('Departure station: Laajalahden aukio')
    cy.contains('Name: Hanasaari')
  })

  it('search form works', () => {
    cy.visit('http://localhost:3000')
    cy.get('input[id="DepartureStationsInput"]').type('Hanasaari{enter}')
    cy.wait(500)

    cy.get('*[name=singleJourney]')
      .filter((index, elt) => { return elt.innerText.match('Hanasaari') })
      .should('have.length.gte', 10)
  })

  it('popup and sort buttons works', () => {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
    cy.get('.dropdown-content').should('have.css', 'display')
      .and('match', /none/)

    cy.get('.dropdown-button').realHover()

    cy.get('.dropdown-content').should('have.css', 'display')
      .and('match', /block/)
    cy.get('button[id=DistanceDecreasing-button]').click()
    cy.wait(1000)
    cy.contains('Distance: 3680771')
  })

  it('reset button works', () => {
    cy.visit('http://localhost:3000')
    cy.get('input[id=DepartureStationsInput]').type('Hakalehto{enter}')
    cy.contains('Hakalehto')
    cy.wait(1000)
    cy.get('button[id=reset-button]').click()
    cy.wait(500)
    cy.contains('Departure station: Laajalahden aukio')
  })

  it('pagination works', () => {
    cy.visit('http://localhost:3000')
    cy.wait(500)
    cy.get('button[id=forwardsJourney-button]').click()
    cy.wait(200)
    cy.contains('Departure station: Kalevankatu')
    cy.get('button[id=forwardsJourney-button]').click()
    cy.wait(200)
    cy.contains('Departure station: Kalevankatu').should('not.exist')
    cy.get('button[id=backwardsJourney-button]').click()
    cy.wait(200)
    cy.contains('Departure station: Kalevankatu')
  })
})
