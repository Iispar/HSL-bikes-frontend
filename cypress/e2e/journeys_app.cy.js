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
            .filter((index, elt) => { return elt.innerText.match('Hanasaari')})
            .should('have.length.gte', 10)
    })
})