import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('SOC 2 - Processing Integrity (Processing Integrity Trust Services Criteria)', () => {

    beforeEach(() => {
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        );
    })

    it('PI-1: Cart accurately reflects user selections', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.getCartBadge().should('have.text', '1');
        InventoryPage.goToCart();
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
    })

    it('PI-2: Cart count updates accurately when multiple items are added or removed', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.addItemToCart('sauce-labs-bike-light');
        InventoryPage.getCartBadge().should('have.text', '2');
        InventoryPage.removeItemFromCart('sauce-labs-backpack');
        InventoryPage.getCartBadge().should('have.text', '1');
    })

    it('PI-3: Removing an item accurately updates the cart and item count', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.addItemToCart('sauce-labs-bike-light');
        InventoryPage.getCartBadge().should('have.text', '2');
        InventoryPage.removeItemFromCart('sauce-labs-backpack');
        InventoryPage.getCartBadge().should('have.text', '1');
        InventoryPage.goToCart();
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Bike Light')
    })

    it('PI-4: Checkout form processes and displays user input correctly', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.goToCart();
        CheckoutPage.clickCheckout();
        CheckoutPage.fillShippingInfo('John', 'Doe', '12345');
        cy.get('#first-name').should('have.value', 'John');
        cy.get('#last-name').should('have.value', 'Doe');
        cy.get('#postal-code').should('have.value', '12345');
    })

    it('PI-5: Order completion confirms transaction was processed', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.goToCart();
        CheckoutPage.clickCheckout();
        CheckoutPage.fillShippingInfo('John', 'Doe', '12345');
        CheckoutPage.clickContinue();
        CheckoutPage.clickFinish();
        CheckoutPage.getSuccessHeader().should('contain.text', 'Thank you for your order');
        cy.get('.complete-text').should('be.visible')
    })
})