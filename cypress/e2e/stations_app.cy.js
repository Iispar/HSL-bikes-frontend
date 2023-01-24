describe('Stations', () => {
  it('stations render', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hanasaari')
  })

  it('search works', () => {
    cy.visit('http://localhost:3000')
    cy.get('input[id="StationInput"]').type('Otaranta{enter}')
    cy.wait(500)
    cy.contains('Otaranta')
  })

  it('pagination works', () => {
    cy.visit('http://localhost:3000')
    cy.wait(500)
    cy.get('button[id=forwardsStation-button]').click()
    cy.wait(200)
    cy.contains('Tapionaukio')
    cy.get('button[id=forwardsStation-button]').click()
    cy.wait(200)
    cy.contains('Tapionaukio').should('not.exist')
    cy.get('button[id=backwardsStation-button]').click()
    cy.wait(200)
    cy.contains('Tapionaukio')
  })

  it('single station view works', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hanasaari').click()
    cy.wait(200)
    cy.get('.singleStation-container').should('have.css', 'display')
      .and('match', /flex/)
    cy.contains('capasity')
    cy.contains('top')
    cy.contains('avg')
  })

  it('close works', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hanasaari').click()
    cy.wait(200)
    cy.contains('close').click()
    cy.contains('Golfpolku')
  })
})
