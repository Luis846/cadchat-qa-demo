import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Smoke tests - critical path', () => {
    
    it('application loads and user can log in', () => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        )
        InventoryPage.getInventoryList().should('be.visible')
    })
})