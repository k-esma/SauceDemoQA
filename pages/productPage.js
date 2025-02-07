import { By, until, WebDriver } from "selenium-webdriver";

class ProductPage {
    // Definisati atribute:
    constructor(webDriver) {
        /** @type {WebDriver} */
        this.webDriver = webDriver;
        this.loginButton = By.id("login-button");
        this.usernameInput = By.id("user-name");
        this.passwordInput = By.id("password");
        this.pageHeader = By.css('span[data-test="title"]');
        this.backpackAddButton = By.id("add-to-cart-sauce-labs-backpack");
        this.bikeLightAddButton = By.id("add-to-cart-sauce-labs-bike-light");
        this.cartBadge = By.css(".shopping_cart_badge");
        this.cartLink = By.css(".shopping_cart_link");
    }

    // Unos korisničkog imena:
    async enterUsername(user) {
        let usernameInput = await this.webDriver.wait(until.elementLocated(this.usernameInput), 20000);
        await this.webDriver.wait(until.elementIsVisible(usernameInput));
        await usernameInput.clear();
        await usernameInput.sendKeys(user);
    }

    // Unos lozinke:
    async enterPassword(pass) {
        let passwordInput = await this.webDriver.findElement(this.passwordInput);
        await passwordInput.clear();
        await passwordInput.sendKeys(pass);
    }

    // Klik na login dugme:
    async pressLogin() {
        let loginButton = await this.webDriver.findElement(this.loginButton);
        await loginButton.click();
    }

    // Naziv naslovne stranice:
    async getPageHeader() {
        let pageHeader = await this.webDriver.findElement(this.pageHeader);
        return await pageHeader.getText();
    }

    // Dodati proizvode u shopping korpu:
    async addItems() {
        await (await this.webDriver.findElement(this.backpackAddButton)).click();
        await (await this.webDriver.findElement(this.bikeLightAddButton)).click();
    }

    // Provjeriti broj proizvoda u korpi:
    async getCartCount() {
        let cartBadge = await this.webDriver.findElement(this.cartBadge);
        return await cartBadge.getText();
    }

    // Klik na ikonu korpe:
    async openCart() {
        await (await this.webDriver.findElement(this.cartLink)).click();
    }
}

export { ProductPage };