import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Shopping Cart - Regression', () => {

    beforeEach(() => {
        // Log in before each test
        LoginPage.login(
            Cypress.env('USERNAME'),
            Cypress.env('PASSWORD')
        );
    })

    it('allows a user to add an item to the cart', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.getCartBadge().should('have.text', '1');
    });

    it('allows a user to add multiple items to the cart', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.addItemToCart('sauce-labs-bike-light');
        InventoryPage.getCartBadge().should('have.text', '2');
    });

    it('allows a user to remove an item from the cart', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.removeItemFromCart('sauce-labs-backpack');
        InventoryPage.getCartBadge().should('not.exist');
    })

    it('allows a user to complete the checkout process', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.goToCart();
        CheckoutPage.clickCheckout();
        CheckoutPage.fillShippingInfo('John', 'Doe', '12345');
        CheckoutPage.clickContinue();
        CheckoutPage.clickFinish();
        CheckoutPage.getSuccessHeader().should('contain.text', 'Thank you for your order');
    })  
})