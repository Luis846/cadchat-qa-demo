import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('SOC 2 - Access control (Security Trust Services Criteria)', () => {

    it('AC-1: Unauthenticated users cannot access protected pages', () => {
        cy.visit('/')
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('#login-button').should('be.visible')
        cy.get('.inventory_list').should('not.exist') // Assert inventory list is not visible to unauthenticated users  
    })

    it('AC-2: Locked out accounts cannot authenticate', () => {
        LoginPage.login('locked_out_user', Cypress.env('PASSWORD'))
        LoginPage.getErrorMessage().should('be.visible')
        .and('contain.text', 'locked out')
    })

    it('AC-3: Invalid credentials are rejected with an error message', () => {
        LoginPage.login('invalid_user', 'invalid_password')
        LoginPage.getErrorMessage().should('be.visible')
    })

    it('AC-4: Valid credentials grant access to application', () => {
        LoginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
        InventoryPage.getInventoryList().should('be.visible')
        cy.url().should('include', '/inventory')
    })

    it('AC-5: Error messages do not reveal system information', () => {
        LoginPage.login('invalid_user', 'invalid_password')
        LoginPage.getErrorMessage().should('be.visible')
        .and('not.contain.text', 'database')
        .and('not.contain.text', 'server')
        .and('not.contain.text', 'stack trace')
    })
})