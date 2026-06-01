class CheckoutPage {

    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private finishButton = '[data-test="finish"]';
    private checkoutButton = '[data-test="checkout"]';
    private successHeader = '.complete-header';

    clickCheckout() {
        cy.get(this.checkoutButton).click();
    }

    fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
        cy.get(this.firstNameInput).type(firstName);
        cy.get(this.lastNameInput).type(lastName);
        cy.get(this.postalCodeInput).type(postalCode);
    }

    clickContinue() {
        cy.get(this.continueButton).click();
    }

    clickFinish() {
        cy.get(this.finishButton).click();
    }

    getSuccessHeader() {
        return cy.get(this.successHeader);
    }
}

export default new CheckoutPage();