declare namespace Cypress {
    interface Chainable {
        loginByUI(username: string, password: string): Chainable<void>
    }
}