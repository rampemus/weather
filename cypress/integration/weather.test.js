describe('Weather view opens', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('Today panel is shows', function() {
        cy.contains('Today')
    })

    const weekdays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const tomorrow = weekdays[new Date().getDay()+1]
    const dayAfterTomorrow = weekdays[new Date().getDay()+2]

    it('Tomorrow day forecast shows', function() {
        cy.contains(tomorrow)
    })

    it('The day after tomorrow forecast shows', function() {
        cy.contains(dayAfterTomorrow)
    })
})

describe('Data is displayed', function(){
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('Humidity is not 0 % today (physically impossible)', function() {
        cy.wait(100).get('#humidityText').contains('0').should('not.exist')
    })
})
