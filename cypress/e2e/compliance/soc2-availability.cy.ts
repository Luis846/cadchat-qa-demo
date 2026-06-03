/// <reference types="cypress" />
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import { assert } from 'console';

describe('SOC 2 - Availability (Availability Trust Services Criteria)', () => {

    it('AV-1: application loads ithin acceptable time threshold', () => {
        cy.visit('/')
        cy.get('#login-button').should('be.visible')
        cy.window().then((win) => {
            const perfData = win.performance.timing
            const loadTime = perfData.loadEventEnd - perfData.navigationStart
            cy.log(`Page load time: ${loadTime}ms`)
            cy.wrap({loadTime}).its('loadTime').should('be.lessThan', 5000) // Assert load time is under 5 seconds
        })

    it('AV-2: Core functionality is available after authentication', () => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        )
        InventoryPage.getInventoryList().should('be.visible')
    })

    it('AV-3: Application responds to user interactions without errors', () => {
        LoginPage.login(Cypress.env('USERNAME'),Cypress.env('PASSWORD'))
        InventoryPage.addItemToCart('sauce-labs-backpack')
        InventoryPage.getCartBadge().should('be.visible')
        cy.get('.error-message').should('not.exist') // Assert no error messages are shown  
    })

    it('AV-4: Application recovers correctly after a page refresh', () => {
        LoginPage.login(Cypress.env('USERNAME'),Cypress.env('PASSWORD'))
        InventoryPage.addItemToCart('sauce-labs-backpack')
        cy.reload()
        InventoryPage.getInventoryList().should('be.visible')
    })
    })
})