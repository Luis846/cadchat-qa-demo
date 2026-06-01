class InventoryPage {

    private inventoryList = '.inventory_list';
    private cartBadge = '.shopping_cart_badge';
    private cartLink = '.shopping_cart_link';

    getInventoryList() {
        return cy.get(this.inventoryList);
    }

    getCartBadge() {
        return cy.get(this.cartBadge);
    }

    addItemToCart(itemName: string) {
        cy.get(`[data-test="add-to-cart-${itemName}"]`).click();
    }

    removeItemFromCart(itemName: string) {
        cy.get(`[data-test="remove-${itemName}"]`).click();
    }

    goToCart() {
        cy.get(this.cartLink).click();
    }

}

export default new InventoryPage();