class LoginPage {

    //All selectors and methods related to the login page will be defined here
    private usernameInput = '#user-name';
    private passwordInput = '#password'
    private loginButton = '#login-button';
    private errorMessage = '[data-test="error"]';

    visit() {
        cy.visit('/');
    }

    enterUsername(username: string) {
        cy.get(this.usernameInput).type(username);
    }

    enterPassword(password: string) {
        cy.get(this.passwordInput).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    login(username: string, password: string) {
        this.visit();
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }

    getErrorMessage() {
        return cy.get(this.errorMessage);
    }
}

export default new LoginPage();