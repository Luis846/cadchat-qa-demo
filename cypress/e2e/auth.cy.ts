describe('Authentication', () => {

    it('allows a user to sign in successfully', () => {
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory')
        cy.get('.inventory_list').should('be.visible')
    })

    it('shows an error for invalid credentials', () => {
        cy.visit('/')
        cy.get('#user-name').type('wrong_user')
        cy.get('#password').type('wrong_password')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('be.visible')
    })
})