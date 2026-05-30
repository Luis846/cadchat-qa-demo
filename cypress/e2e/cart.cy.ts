describe('Shopping cart workflow', () =>{

    beforeEach(() => {
        cy.loginByUI('standard_user', 'secret_sauce')
    })

    it('allows a user to add an item to the cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    it('allows a user to remove an item from the cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('allows a user to complete a checkout', () =>{
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Luis')
        cy.get('[data-test="lastName"]').type('tester')
        cy.get('[data-test="postalCode"]').type('33990')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('contain.text', 'Thank you for your order')
        })
    
})