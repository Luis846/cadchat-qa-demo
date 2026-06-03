import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('FedRAMP - Account management (NIST 800-53 AC-2)', () => {

    it('AM-1: Standard user account authenticates successfully', () => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        )
        InventoryPage.getInventoryList().should('be.visible')
        cy.url().should('include', '/inventory')
    })

    it('AM-2: Locked out accounts are denied access with appropriate error message', () => {
        LoginPage.login('locked_out_user', Cypress.env('PASSWORD'))
        LoginPage.getErrorMessage().should('be.visible')
        .and('contain.text', 'locked out')
    })

    it('AM-3: System enforces authentication before granting access' , () => {
        cy.visit('/')
        cy.get('#login-button').should('be.visible')
        cy.get('.inventory_list').should('not.exist') // Assert inventory list is not visible to unauthenticated users  
    })

    it('AM-4: Invalid username is rejected', () => {
        LoginPage.login('nonexistent_user', Cypress.env('PASSWORD'))
        LoginPage.getErrorMessage().should('be.visible')
        cy.url().should('not.include', '/inventory')
    })

    it('AM-5: Invalid password is rejected', () => {
        LoginPage.login(Cypress.env('USERNAME'), 'wrong_password')
        LoginPage.getErrorMessage().should('be.visible')
        cy.url().should('not.include', '/inventory')
    })

    it('AM-6: Error messages do not reveal sensitive information', () => {
        LoginPage.login('invalid_user', 'invalid_password')
        LoginPage.getErrorMessage().should('be.visible')
        .and('not.contain.text', 'database')
        .and('not.contain.text', 'server error')
        .and('not.contain.text', 'stack')
    })

    it('AM-7: Authenticated user can log out and session is terminated', () => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        )
        InventoryPage.getInventoryList().should('be.visible')
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('#login-button').should('be.visible')
    })
})