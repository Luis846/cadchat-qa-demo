import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Authentication - Regression', () => {

    it('allows a user to sign in successfully', () => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        )
        InventoryPage.getInventoryList().should('be.visible')
    })

    it('shows an error for invalid credentials', () => {
        LoginPage.login('wrong_user', 'wrong_password')
        LoginPage.getErrorMessage().should('be.visible')
    })

    //negative test case for locked out user - edge case scenario
    it('locked out user cannot log in', () => {
        LoginPage.login('locked_out_user', Cypress.env('PASSWORD'))
        LoginPage.getErrorMessage().should('be.visible')
        .and('contain.text', 'locked out')
    })
})