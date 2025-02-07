import { By, until, WebDriver } from "selenium-webdriver";

class LoginPage {
    //Definisati atribute:
    constructor(driver) {
        /** @type {WebDriver} */
        this.driver = driver;
        this.signInButton = By.id("login-button");
        this.userField = By.id("user-name");
        this.passField = By.id("password");
        this.alertMessageElement = By.css('h3[data-test="error"]');
        this.dismissButton = By.css(".error-button");
        this.productItem1 = By.xpath("//*[ @class='inventory_item_name' and text()='Sauce Labs Backpack']");
        this.productItem2 = By.xpath("//*[ @class='inventory_item_name' and text()='Sauce Labs Bike Light']");
    }
    
    // Unos korisničkog imena:
    async enterUsername(username) {
        let userField = await this.driver.wait(until.elementLocated(this.userField));
        await this.driver.wait(until.elementIsVisible(userField));
        await userField.click();
        await userField.clear();
        await userField.sendKeys(username);
    } 

    // Unos lozinke:
    async enterPassword(password) {
        let passField = await this.driver.findElement(this.passField);
        await passField.click();
        await passField.clear();
        await passField.sendKeys(password);
    }

    // Klik na login dugme:
    async pressSignIn() {
        let signInButton = await this.driver.findElement(this.signInButton);
        await signInButton.click();
    }

    // Polje korisničkog imena:
    async getUserFieldClass() {
        let userField = await this.driver.findElement(this.userField);
        return await userField.getAttribute("class");
    }
    
    // Polje lozinke:
    async getPassFieldClass() {
        let passField = await this.driver.findElement(this.passField);
        return await passField.getAttribute("class");
    }

    // Traženje error poruke:
    async getAlertMessage() {
        let alertMessageElement = await this.driver.findElement(this.alertMessageElement);
        return await alertMessageElement.getText();
    }

    // Uklanjanje error poruke klikom na dugme X, te provjera da je ista nestala:
    async dismissAlert() {
        let alertMessageElement = await this.driver.findElement(this.alertMessageElement);
        let dismissButton = await this.driver.findElement(this.dismissButton);
        await dismissButton.click();
        return await this.driver.wait(until.stalenessOf(alertMessageElement));
    }
}

export { LoginPage };
